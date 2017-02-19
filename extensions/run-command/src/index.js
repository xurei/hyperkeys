module.exports = {
	actions: [
		require('./action-run-command'),
	],
	metadata: {
		name: 'RUN_COMMAND',
		title: (macro) => "Run command `" + macro.config.command + "`",
		description: "Run a command line instruction",
		actions: {
			RUN_COMMAND: {title: "Run command"}
		},
		configScreen: {
			enabled: true,
			width: 600,
			height: 200,
		},
		defaultConfig: {
			command: "gedit"
		}
	}
};