const exec = require('child_process').exec;
const debug = require('debug')('hyperkeys-action-show-switch-window');
const platform = require('hyperkeys-api').platform;

module.exports = {
    name: 'SHOW_WINDOW_PIN_BY_NAME',
    factory: function(action) {
        return {
            execute: () => {
                if (action.config.name && action.config.name !== '') {
                    let command = '';
                    if (platform.isLinux) {
                        command = `wmctrl -a "${action.config.name}"`;
                    }
                    else if (platform.isWin) {
                        command = `"${__dirname}\\..\\..\\natives\\win32\\nircmd\\nircmdc.exe" win activate ititle "${action.config.name}"`;
                    }
                    
                    debug(command);
                    debug('Switching to', action.config.name);
                    exec(command, function callback(error, stdout, stderr){
                        if (error === null) {
                            /* nothing */
                        }
                        else {
                            //TODO error management
                        }
                    });
                }
                else {
                    debug('No title mapped to this action');
                }
            },
        };
    },
};
