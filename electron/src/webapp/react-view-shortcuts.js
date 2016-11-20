const React = require ("react");

import { Button } from 'react-bootstrap';
const ShortcutsList = require('./react-shortcuts-list');
const store = require('./store');
const actions = require('./actions');

window.ipc.on('keybinds', (event, arg) => {
	console.log("Got keybinds");
	console.log(arg);
	
	store.dispatch(actions.setKeybinds(arg));
});

function requestKeybinds() {
	console.log("Requesting keybinds");
	window.ipc.send('keybinds');
}

var MainView = React.createClass({
	componentDidMount: () => {
		requestKeybinds();
	},
	
	render: function() {
		
		//TODO Mocked shortcuts config
		var shortcuts = [
			/*{
			 key: 'alt+s',
			 action: {
			 name: 'SHOW_NOTES'
			 }
			 },*/
			
			{
				key: 'alt+w',
				action: {
					name: 'SHOW_SWITCH_WINDOW(1)',
					slot: 0,
				}
			},
			{
				key: 'alt+x',
				action: {
					name: 'SHOW_SWITCH_WINDOW(2)',
					slot: 1,
				}
			},
			{
				key: 'alt+c',
				action: {
					name: 'SHOW_SWITCH_WINDOW(3)',
					slot: 2,
				}
			},
			{
				key: 'alt+v',
				action: {
					name: 'SHOW_SWITCH_WINDOW(4)',
					slot: 3,
				}
			},
			
			{
				key: 'alt+shift+w',
				action: {
					name: 'SET_SWITCH_WINDOW(1)',
					slot: 0,
				}
			},
			{
				key: 'alt+shift+x',
				action: {
					name: 'SET_SWITCH_WINDOW(2)',
					slot: 1,
				}
			},
			{
				key: 'alt+shift+c',
				action: {
					name: 'SET_SWITCH_WINDOW(3)',
					slot: 2,
				}
			},
			{
				key: 'alt+shift+v',
				action: {
					name: 'SET_SWITCH_WINDOW(4)',
					slot: 3,
				}
			},
			/*{
			 key: 'alt+p',
			 action: {
			 name: 'BUGGY',
			 slot: 3,
			 }
			 },*/
		
		];
		
		return (
				<div>
					<h2>Shortcuts</h2>
					<ShortcutsList shortcuts={shortcuts}></ShortcutsList>
					<div>
						<Button bsStyle="success" onClick={this.addShortcutClick}>Add Shortcut</Button>
					</div>
				</div>
		);
	},
	
	addShortcutClick: function(e) {
		//TODO clean version of addShortcutClick
		var key = prompt('Shortcut ?');
		var actionName = prompt('Action ?');
		var payload = prompt('Other (JSON) ?');
		var action = Object.assign(payload, {name: actionName});
		
		actions.addKeybind({
			key: key,
			action: action
		});
	}
});

module.exports = MainView;