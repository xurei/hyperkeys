const exec = require('child_process').exec;
const path = require('path');
const debug = require('debug')(`hyperkeys-${path.basename(__dirname)}`);
const NotificationService = require('hyperkeys-api').NotificationService;
const platform = require('hyperkeys-api').platform;

module.exports = {
    name: 'SHOW_WINDOW_PIN_BY_NAME',
    factory: function(action) {
        return {
            execute: () => {
                if (action.config.name && action.config.name !== '') {
                    let command;
                    if (platform.isLinux) {
                        command = () => new Promise((resolve, reject) => {
                            exec(`${__dirname}/../../natives/linux/wmctrl -a "${action.config.name}"`, function callback(error, stdout, stderr) {
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
                        const asfw = require('asfw').SetForegroundWindowByName;
                        command = () => new Promise((resolve, reject) => {
                            asfw(action.config.name);
                            resolve();
                        });
                        
                        //command = `"${__dirname}\\..\\..\\natives\\win32\\nircmd\\nircmdc.exe" win activate ititle "${action.config.name}"`;
                    }
    
                    command()
                    .catch(e => {
                        NotificationService.notify({
                            'title': 'Window Pin By Name',
                            'message': `Cannot bring window to foreground: ${e}`,
                        });
                    });
                }
                else {
                    debug('No title mapped to this action');
                }
            },
        };
    },
};
