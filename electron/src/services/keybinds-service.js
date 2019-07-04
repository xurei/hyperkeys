const {globalShortcut} = require('electron');
const actionService = require('./actions-service');
const debug = require('debug')('keybinds-service');

const KeybindsService = {
	registerKey: (keybind) => {
		let action = actionService.buildActionObject(keybind.action);
		globalShortcut.register(keybind.key, action.execute);
		if (!globalShortcut.isRegistered(keybind.key)) {
			console.error('Cannot register keybind `'+keybind.key+'`. Already registered.');
		}
		else {
			debug('Registered keybind `'+keybind.key+'` => `' + keybind.action.name+'`');
		}
	},
	
	unregisterKey: (keybind) => {
		// TODO use unredisterKey()
		globalShortcut.unregister(keybind.key);
	}
};

module.exports = KeybindsService;
