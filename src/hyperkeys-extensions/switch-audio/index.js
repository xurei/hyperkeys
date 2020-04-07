module.exports = {
	actions: [
		require('./action-switch-audio'),
	],
	metadata: {
		name: 'SWITCH_AUDIO',
		title: 'Switch audio output',
		description: "Switch between your audio outputs",
		actions: {
			SWITCH_AUDIO: {title: "Switch audio"}
		},
		configScreen: {
			enabled: true,
			width: 600,
			height: 300,
		},
		defaultConfig: {
			command: ""
		}
	}
};
