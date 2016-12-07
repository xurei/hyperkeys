const React = require ("react");

import { Button } from 'react-bootstrap';
const Popup = require('./react-popup');

import { FormGroup, FormControl, ControlLabel, HelpBlock, ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap';

var PopupAddMacro = React.createClass({
	propTypes: {
		onClose: React.PropTypes.func.isRequired,
		onSubmit: React.PropTypes.func.isRequired,
		macroTypes: React.PropTypes.array.isRequired,
	},
	
	getInitialState: () => ({
		chosenMacro: null
	}),
	
	handleChange: function(e) {
		console.log(e.target);
		this.setState({chosenMacro: this.props.macroTypes.filter((m) => m.name == e.target.value)[0]});
		//var data = { value: e.target.value };
		//this.props.onChange(data);
		//this.props.onValidityChange(this.isValid(data));
	},
	
	componentDidMount: function() {
		this.setState({chosenMacro: this.props.macroTypes[0]})
	},
	
	onSubmit: function(e) {
		this.props.onSubmit(e);
		this.props.onClose(e);
	},
	
	render: function() {
		var macroTypes = this.props.macroTypes.map((macroType) => {
			return (
				<option key={macroType.name} value={macroType.name}>{macroType.title}</option>
			);
		});
		
		var curMacroDescription = (this.state.chosenMacro ? this.state.chosenMacro.description : "plop");
		
		return (
			<Popup maxHeight="220px" title="Add Macro" {...this.props}>
				<form>
					<FormGroup>
						<ControlLabel>Choose Macro type :</ControlLabel>
						<FormControl componentClass="select" placeholder="select" onChange={this.handleChange}>
							{macroTypes}
						</FormControl>
						<HelpBlock>{curMacroDescription}</HelpBlock>
					</FormGroup>
					<Button bsStyle="success" className="pull-right" onClick={this.onSubmit}>Add Macro</Button>
				</form>
			</Popup>
		);
	},
});

module.exports = PopupAddMacro;