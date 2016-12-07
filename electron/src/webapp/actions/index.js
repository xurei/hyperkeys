export const setKeybinds = (keybinds) => {
	return {
		type: 'SET_KEYBINDS',
		keybinds: keybinds
	}
};

export const setMacros = (macros) => {
	return {
		type: 'SET_MACROS',
		macros: macros
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
