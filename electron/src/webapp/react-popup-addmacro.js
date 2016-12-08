const React = require ("react");

import { Button } from 'react-bootstrap';
const Popup = require('./react-popup');

import { FormGroup, FormControl, ControlLabel, HelpBlock, ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap';

function buildMacro(macro) {
	return Object.assign({}, macro.defaultConfig);
}

var PopupAddMacro = React.createClass({
	propTypes: {
		onClose: React.PropTypes.func.isRequired,
		onSubmit: React.PropTypes.func.isRequired,
		metadatas: React.PropTypes.object.isRequired,
	},
	
	getInitialState: () => ({
		chosenMacro: null
	}),
	
	handleChange: function(e) {
		console.log(e.target);
		var macro = this.props.macroTypes.filter((m) => m.name == e.target.value)[0];
		this.setState({chosenMacro: buildMacro(macro)});
		//var data = { value: e.target.value };
		//this.props.onChange(data);
		//this.props.onValidityChange(this.isValid(data));
	},
	
	componentDidMount: function() {
		this.setState({chosenMacro: buildMacro(this.props.metadatas[Object.keys(this.props.metadatas)[0]])})
	},
	
	onSubmit: function(e) {
		this.props.onSubmit(this.state.chosenMacro);
		this.props.onClose(e);
	},
	
	render: function() {
		var metadatas = this.props.metadatas;
		
		metadatas = Object.keys(metadatas).map((key) => {
			let macroType = metadatas[key];
			return (
				<option key={key} value={macroType.name}>{macroType.title}</option>
			);
		});
		
		var curMacroDescription = (this.state.chosenMacro ? this.state.chosenMacro.description : "plop");
		
		return (
			<Popup maxHeight="220px" title="Add Macro" {...this.props}>
				<form>
					<FormGroup>
						<ControlLabel>Choose Macro type :</ControlLabel>
						<FormControl componentClass="select" placeholder="select" onChange={this.handleChange}>
							{metadatas}
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