module.exports = {
    actions: [
        require('./action-show-window'),
    ],
    metadata: {
        name: 'WINDOW_PIN_BY_NAME',
        title: (config) => config && config.name ? `Window Pin '${config.name}'` : 'Window Pin by name',
        description: 'Pin a window with a specific name, and bring it back to front with a shortcut.',
        actions: {
            SHOW_WINDOW_PIN_BY_NAME: {title: 'Bring to front'},
        },
        configScreen: {
            enabled: true,
        },
        defaultConfig: {
            name: '',
        },
    },
};
