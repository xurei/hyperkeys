module.exports = {
	actions: [
		require('./action-set-switch-window'),
		require('./action-show-switch-window')
	],
	metadata: {
		name: 'SWITCH_WINDOW',
		title: "Window Pin",
		description: "Pin a window with a shortcut, and bring it back to front with another.",
		actions: {
			SET_SWITCH_WINDOW: {title: "Pin current window"},
			SHOW_SWITCH_WINDOW: {title: "Bring pinned window to front"},
		},
		hasConfigScreen: false,
		defaultConfig: {}
	}
};