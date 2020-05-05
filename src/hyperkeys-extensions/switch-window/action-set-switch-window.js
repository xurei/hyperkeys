const store = require('./store-switch-window');
const path = require('path');
const debug = require('debug')(`hyperkeys-${path.basename(__dirname)}`);
const NotificationService = require('hyperkeys-api').NotificationService;
const activeWin = require('active-win');

module.exports = {
    name: 'SET_SWITCH_WINDOW',
    factory: function(action) {
        return {
            execute: () => {
                activeWin().then((winData) => {
                    console.log(winData);
                    const id = winData.id;
                    debug(`Action mapped to ${id}`);
                    store[action.id_macro] = id;
                    NotificationService.notify({
                        'title': 'Window Pinner',
                        'message': `Pinned ${winData.title || 'window'}`,
                    });
                    return;
                })
                .catch(error => {
                    debug('Error occured');
                    debug(error);
        
                    NotificationService.notify({
                        'title': 'Window Pinner',
                        'message': 'ERROR : cannot pin window',
                    });
                });
                /*
                var command = '';
                if (platform.isLinux) {
                    command = 'xdotool getwindowfocus';
                }
                else if (platform.isWin) {
                    command = `"${__dirname}\\foregroundwin.exe"`;
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
                });*/
            },
        };
    },
};
