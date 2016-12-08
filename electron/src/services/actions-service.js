const isset = require('xurei-util').isset;
const debug = require('debug')('actions-service');

var actionFactories = {};

var service = {
	registerActionFactory: (name, factoryMethod) => {
		debug('Registered action `'+name+'`');
		actionFactories[name] = factoryMethod;
	},
	
	buildActionObject: (action) => {
		var factory = actionFactories[action.name];
		if (isset(factory)) {
			return factory(action);
		}
		else {
			throw "No factory found for action " + action.name;
		}
	}
};

module.exports = service;