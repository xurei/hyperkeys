const store = require('../stores/store-switch-window');
const exec = require('child_process').exec;
const debug = require('debug')('action-show-switch-window');

module.exports = {
	name: "SHOW_SWITCH_WINDOW",
	factory: function (options) {
		return {
			execute: () => {
				if (store[options.slot] != null) {
					debug("Switching to", store[options.slot]);
					exec('wmctrl -ia ' + store[options.slot], function callback(error, stdout, stderr){});
				}
				else {
					debug("No window mapped to this action");
				}
			}
		};
	}
};