const metadatas = (state = {}, action) => {
    switch (action.type) {
        case 'SET_METADATAS':
            return action.metadatas;
        default:
            return state;
    }
};

export default metadatas;
