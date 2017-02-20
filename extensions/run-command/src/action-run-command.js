const exec = require('child_process').exec;
const debug = require('debug')('action-run-command');
const notifier = require('node-notifier');

module.exports = {
	name: "RUN_COMMAND",
	factory: function (action) {
		return {
			execute: () => {
				let command = action.config.command;
				debug("Running command", command);
				exec(command);
			}
		};
	}
};