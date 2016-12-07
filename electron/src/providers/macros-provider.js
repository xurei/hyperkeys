const storage = require('electron-json-storage');
const uuid = require('uuid');

//TODO default macros if none found

//Bootstrap code, should be added if not found
storage.set('macros', [
	{
		id: uuid(),
		name: 'SWITCH_WINDOW',
		options: {
			slot: 0,
		},
		shortcuts: {
			SET_SWITCH_WINDOW: 'alt+shift+w',
			SHOW_SWITCH_WINDOW: 'alt+w'
		}
	},
	{
		id: uuid(),
		name: 'SWITCH_WINDOW',
		options: {
			slot: 1,
		},
		shortcuts: {
			SET_SWITCH_WINDOW: 'alt+shift+x',
			SHOW_SWITCH_WINDOW: 'alt+x'
		}
	},
	{
		id: uuid(),
		name: 'SWITCH_WINDOW',
		options: {
			slot: 2,
		},
		shortcuts: {
			SET_SWITCH_WINDOW: 'alt+shift+c',
			SHOW_SWITCH_WINDOW: 'alt+c'
		}
	},
	{
		id: uuid(),
		name: 'SWITCH_WINDOW',
		options: {
			slot: 3,
		},
		shortcuts: {
			SET_SWITCH_WINDOW: 'alt+shift+v',
			SHOW_SWITCH_WINDOW: 'alt+v'
		}
	},
]);

var provider = {
	saveMacros: function(macros) {
		return new Promise((resolve, reject) => {
		storage.set('macros', macros, function(error, data) {
				if (error) {
					reject(error);
				}
				
				resolve(data);
			});
		});
	},
	
	loadMacros: function() {
		return new Promise((resolve, reject) => {
			storage.get('macros', function(error, data) {
				if (error) {
					reject(error);
				}
				
				//TODO add default config on first launch ?
				
				resolve(data);
			});
		});
	}
};

module.exports = provider;