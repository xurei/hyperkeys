const store = require('./store-switch-window');
const exec = require('child_process').exec;
const debug = require('debug')('action-set-switch-window');
const platform = require('hyperkeys-api').platform;

module.exports = {
	name: "SET_SWITCH_WINDOW",
	factory: function (action) {
		return {
			execute: () => {
				var command = '';
				if (platform.isLinux) {
					command = 'xdotool getwindowfocus';
				}
				else if (platform.isWin) {
					command = __dirname + '\\win32\\foregroundwin.exe';
				}
				
				debug(command);
				
				exec(command, function callback(error, stdout) {
					if (error == null) {
						debug("Action mapped to " + stdout.trim());
						store[action.id_macro] = stdout.trim();
						debug(store[action.id_macro]);
					}
					else {
						//TODO error management
					}
				});
			}
		};
	}
};