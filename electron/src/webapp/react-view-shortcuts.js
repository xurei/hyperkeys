const React = require ("react");

import { Button } from 'react-bootstrap';
const MacrosList = require('./react-macros-list');
const ShortcutsList = require('./react-shortcuts-list');
const PopupAddMacro = require('./react-popup-addmacro');
const ReactRedux = require('react-redux');
const store = require('./store');
const actions = require('./actions');
const uuid = require('uuid');

window.ipc.on('macros', (event, arg) => {
	console.log("Got macros");
	console.log(arg);
	
	store.dispatch(actions.setMacros(arg));
});

function requestMacros() {
	console.log("Requesting macros");
	window.ipc.send('request_macros');
}

//TODO Mocked shortcuts config
var macros = [
	{
		id: uuid(),
		name: 'SWITCH_WINDOW',
		options: {
			slot: 0,
		},
		shortcuts: {
			set: 'alt+shift+w',
			get: 'alt+w'
		}
	},
	{
		id: uuid(),
		name: 'SWITCH_WINDOW',
		options: {
			slot: 1,
		},
		shortcuts: {
			set: 'alt+shift+x',
			get: 'alt+x'
		}
	},
	{
		id: uuid(),
		name: 'SWITCH_WINDOW',
		options: {
			slot: 2,
		},
		shortcuts: {
			set: 'alt+shift+c',
			get: 'alt+c'
		}
	},
	{
		id: uuid(),
		name: 'SWITCH_WINDOW',
		options: {
			slot: 3,
		},
		shortcuts: {
			set: 'alt+shift+v',
			get: 'alt+v'
		}
	},
];

var macroTypes = [
	{
		name: 'SWITCH_WINDOW',
		title: "Window Pin",
		description: "Pin a window with a shortcut, and bring it back to front with another.",
		options: {
			slot: null,
		},
		shortcuts: {
			set: null,
			get: null
		}
	}
];

var MainView = React.createClass({
	getInitialState: function() {
		return {
			showPopupAddMacro: false
		};
	},
	getDefaultProps: () => ({
		macros: [],
	}),
	
	componentDidMount: () => {
		requestMacros();
	},
	
	handleChange: function(e) {
		console.log(e.target);
		//var data = { value: e.target.value };
		//this.props.onChange(data);
		//this.props.onValidityChange(this.isValid(data));
	},
	
	render: function() {
		
		return (
				<div>
					<div className="pull-right">
						<Button bsStyle="success" onClick={this.addMacroClick}>Add Macro</Button>
					</div>
					<h2>Configured Macros</h2>
					<MacrosList macros={this.props.macros} />
					
					{this.state.showPopupAddMacro ? <PopupAddMacro onClose={this.closeAddMacroPopup} onSubmit={this.submitAddMacroPopup} macroTypes={macroTypes}/> : (<div></div>)}
				</div>
		);
	},
	
	closeAddMacroPopup: function(e) {
		this.setState({showPopupAddMacro: false});
	},
	
	submitAddMacroPopup: function(e) {
		console.log(e);
	},
	
	addMacroClick: function(e) {
		//TODO clean version of addShortcutClick
		/*var key = prompt('Shortcut ?');
		var actionName = prompt('Action ?');
		var payload = prompt('Other (JSON) ?');
		var action = Object.assign(payload, {name: actionName});
		
		actions.addKeybind({
			key: key,
			action: action
		});*/
		
		this.setState({showPopupAddMacro: true});
	}
});


function mapStateToProps(state) {
	return {
		macros: state.macros
	}
}

function mapDispatchToProps(dispatch) {
	/*return {
	 onClickNext: () => {
	 dispatch(actions.nextPage())
	 },
	 onClickPrev: () => {
	 dispatch(actions.prevPage())
	 },
	 }*/
	return {};
}

module.exports = ReactRedux.connect(
		mapStateToProps,
		mapDispatchToProps
)(MainView);
