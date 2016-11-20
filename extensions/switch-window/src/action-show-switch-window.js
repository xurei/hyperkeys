const store = require('./store-switch-window');
const exec = require('child_process').exec;
const debug = require('debug')('action-show-switch-window');
const platform = require('hyperkeys-api').platform;

module.exports = {
	name: "SHOW_SWITCH_WINDOW",
	factory: function (options) {
		return {
			execute: () => {
				var command = '';
				if (platform.isLinux) {
					command = 'wmctrl -ia ' + store[options.slot];
				}
				else if (platform.isWin) {
					command = __dirname + '\\win32\\nircmd\\nircmd.exe win activate handle ' + store[options.slot];
				}
				
				debug(command);
				
				if (store[options.slot] != null) {
					debug("Switching to", store[options.slot]);
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