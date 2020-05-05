const ipc = require('electron').ipcMain;
const { globalShortcut, shell } = require('electron');
const keybindsService = require('./services/keybinds-service');
const uuid = require('uuid').v4;
const extensionsProvider = require('./providers/extensions-provider');
const macrosProvider = require('./providers/macros-provider');
const actionsService = require('./services/actions-service');
const path = require('path');
const debug = require('debug')('hyperkeys-ipc');

function registerShortcuts(macros) {
    debug(macros);
    for (const macro of macros) {
        for (const action of Object.keys(macro.shortcuts)) {
            const shortcut = macro.shortcuts[action];
            if (shortcut !== null) {
                keybindsService.registerKey({key: shortcut, action: {id_macro: macro.id, name: action, config: macro.config}});
            }
        }
    }
}
//----------------------------------------------------------------------------------------------------------------------

function updateShortcuts(macros) {
    //TODO diff previous and next macros and only update that
    globalShortcut.unregisterAll();
    registerShortcuts(macros);
}
//----------------------------------------------------------------------------------------------------------------------

function normalizeMacro(macro, metadata) {
    function callMeta(meta, config) {
        if (typeof meta === 'function') {
            return meta(config);
        }
        else {
            return meta;
        }
    }
    
    const out = JSON.parse(JSON.stringify(macro));
    out.title = callMeta(metadata.title, macro.config);
    
    return out;
}
//----------------------------------------------------------------------------------------------------------------------

function normalizeMetadata(metadata) {
    function callMeta(meta) {
        if (typeof meta === 'function') {
            return meta(null);
        }
        else {
            return meta;
        }
    }
    
    const out = JSON.parse(JSON.stringify(metadata));
    out.title = callMeta(metadata.title);
    
    return out;
}
//----------------------------------------------------------------------------------------------------------------------

module.exports = {
    start: function(app) {
        const extensions = extensionsProvider.loadExtensions();
        const extensionsMetadata = {};
        //Extract metadata
        for (const iextension in extensions) {
            if (Object.prototype.hasOwnProperty.call(extensions, iextension)) {
                const extension = extensions[iextension];
                for (const action of extension.actions) {
                    actionsService.registerActionFactory(action.name, action.factory);
                }
                extensionsMetadata[extension.metadata.name] = extension.metadata;
                extensionsMetadata[extension.metadata.name].directory = path.join(__dirname, 'hyperkeys-extensions', iextension);
            }
        }
		
        macrosProvider.loadMacros()
        .then(_macros => {
            const mainWindow = require('./main-window');
            let macros = _macros;
            registerShortcuts(macros);
			
            function sendMacros() {
                mainWindow.webContents.send('macros', macros.map((macro) => {
                    const metadata = extensionsMetadata[macro.name];
                    if (!metadata) {
                        return null;
                    }
                    else {
                        return normalizeMacro(macro, metadata);
                    }
                }).filter(macro => !!macro));
            }
            function sendMetadatas() {
                const meta = {};
                for (const key in extensionsMetadata) {
                    meta[key] = normalizeMetadata(extensionsMetadata[key]);
                }
                debug(meta);
                mainWindow.webContents.send('metadatas', meta);
            }
    
            ipc.on('open_external', function(event, arg) {
                shell.openExternal(arg);
            });
    
            ipc.on('request_macros', function(/*event, arg*/) {
                sendMacros();
            });
			
            ipc.on('request_metadatas', function(/*event, arg*/) {
                sendMetadatas();
            });
			
            ipc.on('add_macro', function(event, arg) {
                const macro = Object.assign({}, arg);
                macro.id = uuid();
                macros.push(macro);
                macrosProvider.saveMacros(macros);
                sendMacros();
            });
			
            ipc.on('remove_macro', function(event, id_macro) {
                macros = macros.filter((macro) => macro.id !== id_macro);
				
                updateShortcuts(macros);
                macrosProvider.saveMacros(macros);
                sendMacros();
            });
			
            ipc.on('set_config', function(event, newConfig) {
                debug('newConfig', newConfig);
				
                macros.forEach((macro, index) => {
                    if (macro.id === newConfig.id) {
                        debug('found matching macro');
                        macros[index].config = newConfig.config;
                    }
                });
				
                updateShortcuts(macros);
                macrosProvider.saveMacros(macros);
                sendMacros();
            });
			
            ipc.on('set_shortcut', function(event, data) {
                const macro = macros.filter((macro) => macro.id === data.id_macro)[0];
                macro.shortcuts[data.action] = data.shortcut;
				
                updateShortcuts(macros);
                macrosProvider.saveMacros(macros);
                sendMacros();
            });
			
            ipc.on('close', function(/*event, arg*/) {
                mainWindow.hide();
            });
			
            ipc.on('devtools', function(/*event, arg*/) {
                mainWindow.toggleDevTools();
            });
            
            return;
        })
        .catch(e => {
            console.error(e);
            app.quit();
            app.exit(1);
        });
    },
};
