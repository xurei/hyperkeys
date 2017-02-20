const React = require('./react');

import { Button } from 'react-bootstrap';
const MacrosList = require('./react-macros-list');
const PopupAddMacro = require('./react-popup-addmacro');
const ReactRedux = require('react-redux');
const store = require('./store');
const actions = require('./actions');
const uuid = require('uuid');

window.ipc.on('macros', (event, arg) => {
	console.log("Got macros", arg);
	store.dispatch(actions.setMacros(arg));
});
window.ipc.on('metadatas', (event, arg) => {
	console.log("Got metadatas", arg);
	store.dispatch(actions.setMetadatas(arg));
});

const MainView = React.createClass({
	getInitialState: function() {
		return {
			showPopupAddMacro: false
		};
	},
	getDefaultProps: () => ({
		macros: [],
	}),
	
	componentDidMount: () => {
		window.ipc.send('request_metadatas');
		window.ipc.send('request_macros');
	},
	
	render: function() {
		return (
				<div>
					<div className="pull-right">
						<Button bsStyle="success" onClick={this.addMacroClick}>Add Macro</Button>
					</div>
					<h2>Configured Macros</h2>
					<MacrosList macros={this.props.macros} metadatas={this.props.metadatas} onRemoveMacro={this.removeMacro} onMacroConfig={this.showMacroConfig} />
					
					{this.state.showPopupAddMacro ? <PopupAddMacro onClose={this.closeAddMacroPopup} onSubmit={this.submitAddMacroPopup} metadatas={this.props.metadatas}/> : (<div></div>)}
				</div>
		);
	},
	
	removeMacro: function(macro_id) {
		window.ipc.send('remove_macro', macro_id);
	},
	
	showMacroConfig: function(macro_id) {
		window.ipc.send('macro_configscreen', macro_id);
	},
	
	closeAddMacroPopup: function(e) {
		this.setState({showPopupAddMacro: false});
	},
	
	submitAddMacroPopup: function(data) {
		console.log(data);
		window.ipc.send('add_macro', data);
	},
	
	addMacroClick: function(e) {
		this.setState({showPopupAddMacro: true});
	}
});


function mapStateToProps(state) {
	return {
		macros: state.macros,
		metadatas: state.metadatas
	}
}

function mapDispatchToProps(dispatch) {
	return {};
}

module.exports = ReactRedux.connect(
		mapStateToProps,
		mapDispatchToProps
)(MainView);
