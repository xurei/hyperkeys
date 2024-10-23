module.exports = {
    actions: [
        require('./action-ifttt-webhook'),
    ],
    metadata: {
        name: 'IFTTT_WEBHOOK',
        title: (config) => config && config.event ? `IFTTT Webhook '${config.event}'` : 'IFTTT Webhook',
        description: 'Trigger an IFTTT webhook ',
        actions: {
            IFTTT_WEBHOOK: {title: 'Trigger'},
        },
        configScreen: {
            enabled: true,
        },
        defaultConfig: {
            event: '',
            apiKey: '',
        },
    },
};
