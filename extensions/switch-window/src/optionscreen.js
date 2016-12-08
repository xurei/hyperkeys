const React = require ("react");
const ReactRedux = require('react-redux');

import { FormGroup, FormControl, ControlLabel, HelpBlock, ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap';
const ShortcutRenderer = require('./react-shortcut-renderer');

var OptionScreen = React.createClass({
	propTypes: {
		shortcuts: React.PropTypes.object.isRequired
	},
	
	render: function() {
		return (
				<form>
					<FormGroup>
						<ControlLabel>Pin number :</ControlLabel>
						<FormControl componentClass="select" placeholder="select" onChange={this.handleChange}>
							{macroTypes}
						</FormControl>
						<HelpBlock></HelpBlock>
					</FormGroup>
					<Button bsStyle="success" className="pull-right" onClick={this.onSubmit}>Add Macro</Button>
				</form>
		);
	},
	
	shouldComponentUpdate: function(nextProps, nextState) {
		return JSON.stringify(this.props) !== JSON.stringify(nextProps);
	}
});

module.exports = OptionScreen;