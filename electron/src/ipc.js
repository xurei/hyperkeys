const ipc = require("electron").ipcMain;
const {globalShortcut} = require('electron');
const keybindsService = require('./services/keybinds-service');
const uuid = require('uuid');
const extensionsProvider = require('./providers/extensions-provider');
const macrosProvider = require('./providers/macros-provider');
const actionsService = require('./services/actions-service');
const path = require('path');
const debug = require('debug')('ipc');
const ConfigWindow = require('./config-window');

let configWindow = null;

function registerShortcuts(macros) {
	debug(macros);
	for (let macro of macros) {
		for (let action of Object.keys(macro.shortcuts)) {
			let shortcut = macro.shortcuts[action];
			if (shortcut != null) {
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
		if (typeof meta === "function") {
			return meta(config);
		}
		else {
			return meta;
		}
	}
	
	let out = JSON.parse(JSON.stringify(macro));
	out.title = callMeta(metadata.title, macro.config);
	
	return out;
}
//----------------------------------------------------------------------------------------------------------------------

function normalizeMetadata(metadata) {
	function callMeta(meta) {
		if (typeof meta === "function") {
			return meta(null);
		}
		else {
			return meta;
		}
	}
	
	let out = JSON.parse(JSON.stringify(metadata));
	out.title = callMeta(metadata.title);
	
	return out;
}
//----------------------------------------------------------------------------------------------------------------------

module.exports = {
	start: function (app) {
		const extensions = extensionsProvider.loadExtensions();
		const extensionsMetadata = {};
		//Extract metadata
		for (let iextension in extensions) {
			if (extensions.hasOwnProperty(iextension)) {
				let extension = extensions[iextension];
				for (let action of extension.actions) {
					actionsService.registerActionFactory(action.name, action.factory);
				}
				extensionsMetadata[extension.metadata.name] = extension.metadata;
				extensionsMetadata[extension.metadata.name].directory = path.join(__dirname, 'extensions', iextension);
			}
		}
		
		macrosProvider.loadMacros()
		.then(_macros => {
			let macros = _macros;
			const mainWindow = require('./main-window');
			registerShortcuts(macros);
			
			function sendMacros() {
				mainWindow.webContents.send('macros', macros.map((macro) => {
					let metadata = extensionsMetadata[macro.name];
					return normalizeMacro(macro, metadata);
				}));
			}
			function sendMetadatas() {
				let meta = {};
				for (let key in extensionsMetadata) {
					meta[key] = normalizeMetadata(extensionsMetadata[key]);
				}
				mainWindow.webContents.send('metadatas', meta);
			}
			
			ipc.on('request_macros', function (/*event, arg*/) {
				sendMacros();
			});
			
			ipc.on('request_metadatas', function (/*event, arg*/) {
				sendMetadatas();
			});
			
			ipc.on('add_macro', function (event, arg) {
				let macro = Object.assign({}, arg);
				macro.id = uuid();
				macros.push(macro);
				macrosProvider.saveMacros(macros);
				sendMacros();
			});
			
			ipc.on('remove_macro', function (event, id_macro) {
				macros = macros.filter((macro) => macro.id !== id_macro);
				
				updateShortcuts(macros);
				macrosProvider.saveMacros(macros);
				sendMacros();
			});
			
			ipc.on('macro_configscreen', function (event, id_macro) {
				let macro = macros.filter((macro) => macro.id === id_macro)[0];
				let metadata = extensionsMetadata[macro.name];
				
				configWindow = ConfigWindow(mainWindow, metadata.configScreen);
				
				let config = { id: macro.id, config: Object.assign({}, macro.config) };
				configWindow.loadURL('file://' + metadata.directory + '/configscreen.html#' + encodeURIComponent(JSON.stringify(config)));
				
				//Toggle Debug
				//configWindow.toggleDevTools();
			});
			
			ipc.on('set_config', function (event, newConfig) {
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
				configWindow.close();
			});
			
			ipc.on('set_shortcut', function (event, data) {
				let macro = macros.filter((macro) => macro.id === data.id_macro)[0];
				macro.shortcuts[data.action] = data.shortcut;
				
				updateShortcuts(macros);
				macrosProvider.saveMacros(macros);
				sendMacros();
			});
			
			ipc.on('close', function (/*event, arg*/) {
				mainWindow.hide();
				window_open = false;
			});
			
			ipc.on('devtools', function (/*event, arg*/) {
				mainWindow.toggleDevTools();
			});
		})
		.catch(e => {
			console.error(e);
			app.quit();
			app.exit(1);
		});
	}
};
