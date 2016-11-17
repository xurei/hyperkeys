const provider = require('../providers/keybinds-provider');

var service = {
	registerKeys: () => {
		provider.getKeybinds()
		.then(keybinds => {
			
		});
	}
};

module.exports = service;