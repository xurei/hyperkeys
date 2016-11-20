const storage = require('electron-json-storage');

var provider = {
	saveKeybinds: function(keybinds) {
		return new Promise((resolve, reject) => {
		storage.set('keybinds', keybinds, function(error, data) {
				if (error) {
					reject(error);
				}
				
				resolve(data);
			});
		});
	},
	
	loadKeybinds: function() {
		return new Promise((resolve, reject) => {
			storage.get('keybinds', function(error, data) {
				if (error) {
					reject(error);
				}
				
				//TODO add default config on first launch ?
				
				resolve(data);
			});
		});
		
		//TODO persist keybinds
		return Promise.resolve([
			/*{
				key: 'alt+s',
				action: {
					name: 'SHOW_NOTES'
				}
			},*/
				
			{
				key: 'alt+w',
				action: {
					name: 'SHOW_SWITCH_WINDOW',
					slot: 0,
				}
			},
			{
				key: 'alt+x',
				action: {
					name: 'SHOW_SWITCH_WINDOW',
					slot: 1,
				}
			},
			{
				key: 'alt+c',
				action: {
					name: 'SHOW_SWITCH_WINDOW',
					slot: 2,
				}
			},
			{
				key: 'alt+v',
				action: {
					name: 'SHOW_SWITCH_WINDOW',
					slot: 3,
				}
			},
				
			{
				key: 'alt+shift+w',
				action: {
					name: 'SET_SWITCH_WINDOW',
					slot: 0,
				}
			},
			{
				key: 'alt+shift+x',
				action: {
					name: 'SET_SWITCH_WINDOW',
					slot: 1,
				}
			},
			{
				key: 'alt+shift+c',
				action: {
					name: 'SET_SWITCH_WINDOW',
					slot: 2,
				}
			},
			{
				key: 'alt+shift+v',
				action: {
					name: 'SET_SWITCH_WINDOW',
					slot: 3,
				}
			},
			/*{
				key: 'alt+p',
				action: {
					name: 'BUGGY',
					slot: 3,
				}
			},*/
				
		]);
	}
};

module.exports = provider;