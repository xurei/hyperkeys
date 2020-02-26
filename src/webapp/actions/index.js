export const setMetadatas = (metadatas) => {
	return {
		type: 'SET_METADATAS',
		metadatas: metadatas
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
