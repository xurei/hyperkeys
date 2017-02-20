const isset = require('xurei-util').isset;
const debug = require('debug')('actions-service');

let actionFactories = {};

const ActionService = {
	registerActionFactory: (name, factoryMethod) => {
		debug('Registered action `'+name+'`');
		actionFactories[name] = factoryMethod;
	},
	
	buildActionObject: (action) => {
		let factory = actionFactories[action.name];
		if (isset(factory)) {
			return factory(action);
		}
		else {
			throw "No factory found for action " + action.name;
		}
	}
};

module.exports = ActionService;