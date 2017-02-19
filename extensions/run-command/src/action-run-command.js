const exec = require('child_process').exec;
const debug = require('debug')('action-set-switch-window');
const notifier = require('node-notifier');

module.exports = {
	name: "RUN_COMMAND",
	factory: function (action) {
		return {
			execute: () => {
				console.log('action', action);
				let command = 'gedit';
				debug(command);
				exec(command);
			}
		};
	}
};