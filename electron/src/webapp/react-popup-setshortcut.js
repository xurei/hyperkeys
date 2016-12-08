const React = require ("react");

const Popup = require('./react-popup');
const actions = require('./actions');
const ShortcutInput = require('./react-shortcut-input');

import { Button } from 'react-bootstrap';

var PopupSetShortcut = React.createClass({
	propTypes: {
		onClose: React.PropTypes.func.isRequired,
		onSubmit: React.PropTypes.func.isRequired,
	},
	
	getInitialState: () => ({
		shortcut: null,
	}),
	
	handleChange: function(shortcut) {
		this.setState({shortcut:shortcut});
	},
	
	onSubmit: function(e) {
		this.props.onSubmit(this.state.shortcut);
		this.props.onClose(e);
	},
	
	componentDidMount: function() {
		this.refs.add_shortcut_input.focus();
	},
	
	render: function() {
		return (
			<Popup maxHeight="180px"
				   title="Enter Shortcut"
				   onKeyDown={this.handleKey}
				   onKeyUp={this.handleKey}
				   {...this.props}>
				<ShortcutInput ref="add_shortcut_input" shortcut={this.state.shortcut} onChange={this.handleChange} />
				<Button bsStyle="success" className="pull-right" onClick={this.onSubmit}>Set Shortcut</Button>
			</Popup>
		);
	},
});

module.exports = PopupSetShortcut;