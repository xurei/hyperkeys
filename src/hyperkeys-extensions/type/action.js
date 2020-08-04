const spawn = require('child_process').spawn;
const path = require('path');
const debug = require('debug')(`hyperkeys-${path.basename(__dirname)}`);
const NotificationService = require('hyperkeys-api').NotificationService;
const platform = require('hyperkeys-api').platform;
const robotjs = require('robotjs');

module.exports = {
    name: 'TYPE',
    factory: function(action) {
        return {
            execute: () => {
                const onError = (e) => {
                    console.error(e);
                    NotificationService.notify({
                        'title': 'Type',
                        'message': `Couldn't type the text`,
                    });
                };
                
                const text = action.config.text.replace(/"/g, '\\"');
    
                let command;
                if (platform.isLinux) {
                    command = () => new Promise((resolve, reject) => {
                        debug('Typing', text);
                        debug(action);
    
                        try {
                            const child = spawn(`${__dirname}/../../natives/linux/xdotool`, ['type', `"${text}"`], {
                                detached: true,
                            });
                            child.on('error', reject);
                            child.on('close', resolve);
                            //robotjs.typeStringDelayed(text, 10000);
                        }
                        catch (e) {
                            onError(e);
                        }
                    });
                }
                else {
                    // TODO
                    NotificationService.notify({
                        'title': 'Type',
                        'message': `TODO`,
                    });
                }
    
                command().catch(onError);
                
                //try {
                //    const child = spawn(command, {
                //        detached: true,
                //    });
                //    child.on('error', onError);
                //}
                //catch (e) {
                //    onError(e);
                //}
            },
        };
    },
};

