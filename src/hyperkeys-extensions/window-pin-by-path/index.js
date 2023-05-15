module.exports = {
    actions: [
        require('./action-show-window'),
    ],
    platforms: ['linux'],
    metadata: {
        name: 'WINDOW_PIN_BY_PATH',
        title: (config) => config && config.path ? `Window Pin '${config.path}'` : 'Window Pin by path',
        description: 'Pin a window with a specific executable path. If not specified, run it',
        actions: {
            SHOW_WINDOW_PIN_BY_PATH: {title: 'Bring to front'},
        },
        configScreen: {
            enabled: true,
        },
        defaultConfig: {
            path: '',
            fallbackCommand: null,
        },
    },
};
