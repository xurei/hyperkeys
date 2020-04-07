const store = require('./store-switch-window');
const exec = require('child_process').exec;
const debug = require('debug')('hyperkeys-action-set-switch-window');
const platform = require('hyperkeys-api').platform;
const NotificationService = require('hyperkeys-api').NotificationService;

module.exports = {
    name: 'SET_SWITCH_WINDOW',
    factory: function(action) {
        return {
            execute: () => {
                var command = '';
                if (platform.isLinux) {
                    command = 'xdotool getwindowfocus';
                }
                else if (platform.isWin) {
                    command = `"${__dirname  }\\win32\\foregroundwin.exe"`;
                }
				
                debug(command);
				
                exec(command, function callback(error, stdout) {
                    if (error === null) {
                        debug(`Action mapped to ${  stdout.trim()}`);
                        store[action.id_macro] = stdout.trim();
						
                        NotificationService.notify({
                            'title': 'Window Pinner',
                            'message': 'Window pinned',
                        });
                    }
                    else {
                        debug('Error occured');
                        debug(error);
						
                        NotificationService.notify({
                            'title': 'Window Pinner',
                            'message': 'ERROR : cannot pin window',
                        });
                    }
                });
            },
        };
    },
};
