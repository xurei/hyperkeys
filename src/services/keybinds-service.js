const {globalShortcut} = require('electron');
const actionService = require('./actions-service');
const debug = require('debug')('keybinds-service');

var service = {
	registerKey: (keybind) => {
		var action = actionService.buildActionObject(keybind.action);
		
		globalShortcut.register(keybind.key, action.execute);
		debug('Registered keybind `'+keybind.key+'` => `' + keybind.action.name+'`');
	},
	
	unregisterKey: (keybind) => {
		//TODO unregisterKey
	}
};

module.exports = service;  