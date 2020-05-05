const path = require('path');
const debug = require('debug')(`hyperkeys-${path.basename(__dirname)}`);
const NotificationService = require('hyperkeys-api').NotificationService;
const request = require('request-promise-native');

module.exports = {
    name: 'IFTTT_WEBHOOK',
    factory: function(action) {
        return {
            execute: async() => {
                const onError = (e) => {
                    NotificationService.notify({
                        'title': 'IFTTT Webhook',
                        'message': `Couldn't trigger action: ${e.toString()}`,
                    });
                };
    
                const event = action.config.event;
                const apiKey = action.config.apiKey;
                debug('IFTTT Webhook', event);
                try {
                    await request({
                        method: 'GET',
                        url: `https://maker.ifttt.com/trigger/${event}/with/key/${apiKey}`,
                    });
                    NotificationService.notify({
                        'title': 'IFTTT Webhook',
                        'message': `Action trigerred !`,
                    });
                }
                catch (e) {
                    onError(e);
                }
            },
        };
    },
};

