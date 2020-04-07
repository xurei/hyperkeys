const store = require('./store-switch-window');
const exec = require('child_process').exec;
const debug = require('debug')('hyperkeys-action-show-switch-window');
const platform = require('hyperkeys-api').platform;

module.exports = {
    name: "SHOW_WINDOW_PIN_BY_NAME",
    factory: function (action) {
        return {
            execute: () => {
                let command = '';
                if (platform.isLinux) {
                    command = 'wmctrl -ia ' + store[action.id_macro];
                }
                else if (platform.isWin) {
                    command = '"' + __dirname + '\\win32\\nircmd\\nircmd.exe" win activate title "' + store[action.id_macro] + '"';
                }
				
                debug(command);
				
                if (store[action.id_macro] != null) {
                    debug("Switching to", store[action.id_macro]);
                    exec(command, function callback(error, stdout, stderr){
                        if (error == null) {
                            /* nothing */
                        }
                        else {
                            //TODO error management
                        }
                    });
                }
                else {
                    //TODO alert ? "No window mapped to this action"
                    debug("No window mapped to this action");
                }
            }
        };
    }
};
