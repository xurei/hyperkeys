const store = require('./store-switch-window');
const exec = require('child_process').exec;
const debug = require('debug')('hyperkeys-action-show-switch-window');
const NotificationService = require('hyperkeys-api').NotificationService;
const platform = require('hyperkeys-api').platform;

module.exports = {
    name: 'SHOW_SWITCH_WINDOW',
    factory: function(action) {
        return {
            execute: () => {
                if (store[action.id_macro]) {
                    debug('Switching to', store[action.id_macro]);
    
                    let command;
                    if (platform.isLinux) {
                        command = () => new Promise((resolve, reject) => {
                            exec(`wmctrl -ia ${store[action.id_macro]}`, function callback(error, stdout, stderr) {
                                if (!error) {
                                    resolve();
                                }
                                else {
                                    reject(error);
                                }
                            });
                        });
                    }
                    else if (platform.isWin) {
                        const asfw = require('asfw').SetForegroundWindow;
                        command = () => new Promise((resolve, reject) => {
                            asfw(store[action.id_macro]);
                            resolve();
                        });
                    }
                    
                    command()
                    .catch(e => {
                        NotificationService.notify({
                            'title': 'Window Pinner',
                            'message': `Cannot bring window to foreground: ${e}`,
                        });
                    });
                }
                else {
                    debug('No window mapped to this action');
                }
            },
        };
    },
};
