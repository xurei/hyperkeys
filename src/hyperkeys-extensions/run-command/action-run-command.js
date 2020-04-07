const exec = require('child_process').spawn;
const debug = require('debug')('hyperkeys-action-run-command');

module.exports = {
    name: 'RUN_COMMAND',
    factory: function(action) {
        return {
            execute: () => {
                const command = action.config.command;
                debug('Running command', command);
                exec(command, {
                    detached: true,
                });
            },
        };
    },
};
