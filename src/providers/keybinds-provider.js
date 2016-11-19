var provider = {
	getKeybinds: function() {
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