const provider = require('../providers/keybinds-provider');
const isset = require('xurei-util').isset;
const debug = require('debug')('actions-service');

var actionFactories = {};

var service = {
	loadActions: () => {
		
	},
	
	registerActionFactory: (name, factoryMethod) => {
		debug('Registered action `'+name+'`');
		actionFactories[name] = factoryMethod;
	},
	
	buildActionObject: (action) => {
		var factory = actionFactories[action.name];
		if (isset(factory)) {
			return factory(action.options);
		}
		else {
			throw "No factory found for action " + action.name;
		}
	}
};

module.exports = service;