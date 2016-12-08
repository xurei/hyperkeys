const uuid = require('uuid');

const macros = (state = [], action) => {
	switch (action.type) {
		case 'SET_MACROS':
			return action.macros;
		case 'ADD_MACRO':
			var macro = Object.assign({id: uuid()}, action.macro);
			state.push(macro);
			return state;
		case 'REMOVE_MACRO':
			return state.filter((marco) => marco.id !== action.id);
		default:
			return state;
	}
};

module.exports = macros;