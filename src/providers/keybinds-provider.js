var provider = {
	getKeybinds: function() {
		//TODO persist keybinds
		return Promise.resolve([
			{
				key: 'alt+s',
				action: 'SHOW_NOTES'
			},
				
			{
				key: 'alt+a',
				action: 'SHOW_ALT_WINDOW',
				slot: 0,
			},
			{
				key: 'alt+z',
				action: 'SHOW_ALT_WINDOW',
				slot: 1,
			},
			{
				key: 'alt+e',
				action: 'SHOW_ALT_WINDOW',
				slot: 2,
			},
			{
				key: 'alt+r',
				action: 'SHOW_ALT_WINDOW',
				slot: 3,
			},
				
			{
				key: 'alt+a',
				action: 'SET_ALT_WINDOW',
				slot: 0,
			},
			{
				key: 'alt+z',
				action: 'SET_ALT_WINDOW',
				slot: 1,
			},
			{
				key: 'alt+e',
				action: 'SET_ALT_WINDOW',
				slot: 2,
			},
			{
				key: 'alt+r',
				action: 'SET_ALT_WINDOW',
				slot: 3,
			},
				
		]);
	}
};

module.exports = provider;