const latestRelease = (state = null, action) => {
    switch (action.type) {
        case 'SET_LATEST_RELEASE':
            return action.release;
        default:
            return state;
    }
};

export default latestRelease;
