const exec = require('child_process').spawn;
const debug = require('debug')('hyperkeys-action-run-command');
const notifier = require('node-notifier');

module.exports = {
	name: "RUN_COMMAND",
	factory: function (action) {
		return {
			execute: () => {
				let command = action.config.command;
				debug("Running command", command);
				exec(command, {
					detached: true
				});
			}
		};
	}
};
