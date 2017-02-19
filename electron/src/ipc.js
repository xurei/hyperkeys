const ipc = require("electron").ipcMain;
const {globalShortcut} = require('electron');
const macrosProvider = require('./providers/macros-provider');
const keybindsService = require('./services/keybinds-service');
const uuid = require('uuid');
const ConfigWindow = require('./config-window');

let configWindow = null;

function registerShortcuts(macros) {
	console.log(macros);
	for (let macro of macros) {
		for (let action of Object.keys(macro.shortcuts)) {
			let shortcut = macro.shortcuts[action];
			if (shortcut != null) {
				keybindsService.registerKey({key: shortcut, action: {id_macro: macro.id, name: action, options: macro.options}});
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

module.exports = {
	start: function (macros, extensionsMetadata) {
		const mainWindow = require('./main-window');
		registerShortcuts(macros);
		
		ipc.on('request_macros', function (/*event, arg*/) {
			mainWindow.webContents.send('macros', macros);
		});
		
		ipc.on('request_metadatas', function (/*event, arg*/) {
			mainWindow.webContents.send('metadatas', extensionsMetadata);
		});
		
		ipc.on('add_macro', function (event, arg) {
			let macro = Object.assign({}, arg);
			let metadata = extensionsMetadata[macro.name];
			macro.id = uuid();
			macros.push(macro);
			macrosProvider.saveMacros(macros);
			mainWindow.webContents.send('macros', macros);
		});
		
		ipc.on('remove_macro', function (event, id_macro) {
			macros = macros.filter((macro) => macro.id !== id_macro);
			
			updateShortcuts(macros);
			macrosProvider.saveMacros(macros);
			mainWindow.webContents.send('macros', macros);
		});
		
		ipc.on('macro_configscreen', function (event, id_macro) {
			let macro = macros.filter((macro) => macro.id === id_macro)[0];
			let metadata = extensionsMetadata[macro.name];
			
			configWindow = ConfigWindow(mainWindow, metadata.configOptions);
			
			let config = { id: macro.id, config: Object.assign({}, macro.config) };
			configWindow.loadURL('file://' + metadata.directory + '/configscreen.html#' + encodeURIComponent(JSON.stringify(config)));
			configWindow.toggleDevTools();
		});
		
		ipc.on('set_config', function (event, newConfig) {
			console.log('newConfig', newConfig);
			
			macros.forEach((macro, index) => {
				if (macro.id === newConfig.id) {
					console.log('found matching macro');
					macros[index].config = newConfig.config;
				}
			});
			
			console.log('macros', macros);
			macrosProvider.saveMacros(macros);
			mainWindow.webContents.send('macros', macros);
			configWindow.close();
			
			/*let macro = macros.filter((macro) => macro.id == data.id_macro)[0];
			macro.shortcuts[data.action] = data.shortcut;
			
			configWindow.close();
			macrosProvider.saveMacros(macros);
			mainWindow.webContents.send('macros', macros);*/
		});
		
		ipc.on('set_shortcut', function (event, data) {
			let macro = macros.filter((macro) => macro.id === data.id_macro)[0];
			macro.shortcuts[data.action] = data.shortcut;
			
			updateShortcuts(macros);
			macrosProvider.saveMacros(macros);
			mainWindow.webContents.send('macros', macros);
		});
		
		ipc.on('close', function (/*event, arg*/) {
			mainWindow.hide();
			window_open = false;
		});
		
		ipc.on('devtools', function (/*event, arg*/) {
			mainWindow.toggleDevTools();
		});
	}
};
