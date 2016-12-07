const React = require ("react");

import { Button } from 'react-bootstrap';
const ShortcutsList = require('./react-shortcuts-list');
const Popup = require('./react-popup');
const ShortcutInput = require('./react-shortcut-input');
const store = require('./store');
const actions = require('./actions');
const ReactDOM = require ("react-dom");

import { FormGroup, FormControl, ControlLabel, HelpBlock, ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap';

var PopupAddMacro = React.createClass({
	propTypes: {
		onClose: React.PropTypes.func.isRequired,
	},
	
	getInitialState: () => ({
	}),
	
	handleChange: function(e) {
		console.log(e.target);
		//var data = { value: e.target.value };
		//this.props.onChange(data);
		//this.props.onValidityChange(this.isValid(data));
	},
	
	componentDidMount: function() {
		this.refs.add_shortcut_input.focus();
	},
	
	render: function() {
		return (
			<Popup title="Add Shortcut" {...this.props}>
				<form>
					<ShortcutInput
							ref="add_shortcut_input"
							placeholder="Enter shortcut"
							onChange={this.handleChange} />
					<FormGroup
							controlId="formBasicText"
					>
						<ControlLabel>Working example with validation</ControlLabel>
						<FormControl
								type="text"
								value={""}
								placeholder="Enter text"
								onChange={this.handleChange}
						/>
						<FormControl.Feedback />
						<HelpBlock>Validation is based on string length.</HelpBlock>
					</FormGroup>
				</form>
			</Popup>
		);
	},
});

module.exports = PopupAddMacro;