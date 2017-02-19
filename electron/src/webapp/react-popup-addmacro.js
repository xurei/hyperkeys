const React = require('./react');

import { Button } from 'react-bootstrap';
const Popup = require('./react-popup');
const arrayToMap = require('xurei-util').arrayToMap;

import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

function buildMacro(macro) {
	macro = JSON.parse(JSON.stringify(macro));
	return {name: macro.name, shortcuts: arrayToMap(Object.keys(macro.actions), k=>k, v=>null), config: macro.defaultConfig};
}

const PopupAddMacro = React.createClass({
	propTypes: {
		onClose: React.PropTypes.func.isRequired,
		onSubmit: React.PropTypes.func.isRequired,
		metadatas: React.PropTypes.object.isRequired,
	},
	
	getInitialState: function() {
		console.log(this.props.metadatas);
		return {
			chosenMacro: buildMacro(this.props.metadatas[Object.keys(this.props.metadatas)[0]])
		};
	},
	
	handleChange: function(e) {
		console.log(e.target);
		const macro = this.props.metadatas[
			Object.keys(this.props.metadatas).filter((key) => {
				const m = this.props.metadatas[key];
				return (m.name == e.target.value);
			})[0]
		];
		console.log(macro, buildMacro(macro));
		this.setState({chosenMacro: buildMacro(macro)}, null);
	},
	
	componentDidMount: function() {
	},
	
	onSubmit: function(e) {
		this.props.onSubmit(this.state.chosenMacro);
		this.props.onClose(e);
	},
	
	render: function() {
		let metadatas = this.props.metadatas;
		
		metadatas = Object.keys(metadatas).map((key) => {
			let macroType = metadatas[key];
			return (
				<option key={key} value={macroType.name}>{macroType.title}</option>
			);
		});
		
		let curMacroDescription = (this.state.chosenMacro ? this.state.chosenMacro.description : "plop");
		
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
					
					<div style={{lineHeight: "40px"}} className="pull-right">
						<a href="javascript:void(0)" onClick={this.props.onClose} style={{marginRight: "10px"}}>Cancel</a>
						<Button bsStyle="success" onClick={this.onSubmit}>Add Macro</Button>
					</div>
				</form>
			</Popup>
		);
	},
});

module.exports = PopupAddMacro;