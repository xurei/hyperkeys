const keybinds = (state = [], action) => {
	switch (action.type) {
		case 'SET_KEYBINDS':
			return action.keybinds;
		case 'ADD_KEYBIND':
			state.push(action.keybind);
			return state;
		case 'REMOVE_KEYBIND':
			state.push(action.keybind);
			return state.filter((keybind) => {
				keybind.key !== action.keybind.key;
			});
		default:
			return state;
	}
};

module.exports = keybinds;