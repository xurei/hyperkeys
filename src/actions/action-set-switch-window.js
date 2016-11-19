const store = require('../stores/store-switch-window');
const exec = require('child_process').exec;
const debug = require('debug')('action-set-switch-window');

module.exports = {
	name: "SET_SWITCH_WINDOW",
	factory: function (options) {
		return {
			execute: () => {
				exec('xdotool getwindowfocus', function callback(error, stdout) {
					debug("Action mapped to", stdout.trim());
					store[options.slot] = stdout.trim();
					debug(store[options.slot]);
				});
			}
		};
	}
};