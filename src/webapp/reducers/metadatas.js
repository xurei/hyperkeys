import macros from './macros';

const uuid = require('uuid').v4;

const metadatas = (state = {}, action) => {
	switch (action.type) {
		case 'SET_METADATAS':
			return action.metadatas;
		default:
			return state;
	}
};

export default metadatas;
