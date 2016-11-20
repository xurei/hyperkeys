export const setKeybinds = (keybinds) => {
	return {
		type: 'SET_KEYBINDS',
		keybinds: keybinds
	}
};

export const addKeybind = (keybind) => {
	return {
		type: 'ADD_KEYBIND',
		keybind: keybind
	}
};

export const removeKeybind = (keybind) => {
	return {
		type: 'REMOVE_KEYBIND',
		keybind: keybind
	}
};
