const spawn = require('child_process').spawn;
const path = require('path');
const debug = require('debug')(`hyperkeys-${path.basename(__dirname)}`);
const NotificationService = require('hyperkeys-api').NotificationService;

module.exports = {
    name: 'RUN_COMMAND',
    factory: function(action) {
        return {
            execute: () => {
                const onError = (e) => {
                    NotificationService.notify({
                        'title': 'Run command',
                        'message': `Couldn't run '${action.config.command}'`,
                    });
                };
                
                const command = action.config.command;
                debug('Running command', command);
                try {
                    const child = spawn(command, {
                        detached: true,
                        shell: true,
                    });
                    child.on('error', onError);
                }
                catch (e) {
                    onError(e);
                }
            },
        };
    },
};

