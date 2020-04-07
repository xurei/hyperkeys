module.exports = {
	actions: [
		require('./action-run-command'),
	],
	metadata: {
		name: 'RUN_COMMAND',
		title: (config) => config && config.command ? "Run command `" + config.command + "`" : 'Run command',
		description: "Run a command line instruction",
		actions: {
			RUN_COMMAND: {title: "Run command"}
		},
		configScreen: {
			enabled: true,
		},
		defaultConfig: {
			command: ""
		}
	}
};
