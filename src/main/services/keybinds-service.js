const {globalShortcut} = require('electron');
const actionService = require('./actions-service');
const debug = require('debug')('hyperkeys-keybinds-service');

const KeybindsService = {
    registerKey: (keybind) => {
        const action = actionService.buildActionObject(keybind.action);
		
        try {
            globalShortcut.register(keybind.key, action.execute);
			
            if (!globalShortcut.isRegistered(keybind.key)) {
                console.error('Cannot register keybind `' + keybind.key + '`. Already registered.');
            } else {
                debug('Registered keybind `' + keybind.key + '` => `' + keybind.action.name + '`');
            }
        }
        catch(e) {
            console.error('Cannot register keybind `' + keybind.key + '`. Exception:');
            console.error(e);
        }
    },
    
    unregisterKey: (keybind) => {
        // TODO use unredisterKey()
        globalShortcut.unregister(keybind.key);
    }
};

module.exports = KeybindsService;
