const provider = require('../providers/keybinds-provider');
const isset = require('../util/isset');
const debug = require('debug')('actions-service');

var actionFactories = {};

var service = {
	
	registerActionFactory: (name, factoryMethod) => {
		debug('Registered action `'+name+'`');
		actionFactories[name] = factoryMethod;
	},
	
	buildActionObject: (action) => {
		var actionName = action.name;
		var factory = actionFactories[actionName];
		if (isset(factory)) {
			return factory(action);
		}
		else {
			throw "No factory found for action " + actionName;
		}
	}
};

module.exports = service;