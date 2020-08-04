const path = require('path');

module.exports = {
    actions: [
        require('./action'),
    ],
    metadata: {
        name: 'TYPE',
        title: (config) => config && config.text ? `Type '${path.basename(config.text)}'` : 'Type text',
        description: 'Type in some predefined text',
        actions: {
            TYPE: {title: 'Trigger'},
        },
        configScreen: {
            enabled: true,
        },
        defaultConfig: {
            text: '',
        },
    },
};
