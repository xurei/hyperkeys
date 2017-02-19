const React = require ("react");
const ReactDOM = require ("react-dom");

import { FormGroup, FormControl, ControlLabel, HelpBlock, Button, Grid, Row, Col } from 'react-bootstrap';

const ConfigScreen = React.createClass({
	propTypes: {
		config: React.PropTypes.object.isRequired
	},
	
	getInitialState() {
		return {
			value: this.props.config.config.command
		};
	},
	
	handleChange(e) {
		this.setState({ value: e.target.value }, null);
	},
	
	onSubmit: function(/*e*/) {
		const config = Object.assign({}, this.props.config.config, { command: this.state.value })
		window.ipc.send('set_config', { id: this.props.config.id, config: config });
	},
	
	render: function() {
		return (
			<Grid>
				<Row>
					<Col xs={12}>
						<div>&nbsp;</div>
						<form>
							<FormGroup>
								<ControlLabel>Command to execute</ControlLabel>
								<FormControl type="text" value={this.state.value} placeholder="Example : firefox" onChange={this.handleChange}/>
								<FormControl.Feedback />
								<HelpBlock/>
							</FormGroup>
							<Button bsStyle="success" className="pull-right" onClick={this.onSubmit}>Confirm</Button>
						</form>
					</Col>
				</Row>
			</Grid>
		);
	},
	
	shouldComponentUpdate: function(nextProps, nextState) {
		try {
			return JSON.stringify(this.props) !== JSON.stringify(nextProps) || JSON.stringify(this.state) !== JSON.stringify(nextState);
		}
		catch (e) {
			console.warn(e);
			return true;
		}
	}
});

window.addEventListener("DOMContentLoaded", function() {
	const config = JSON.parse(decodeURIComponent(document.location.hash).substring(1));
	
	console.log(config);
	
	//Rendering the UI
	ReactDOM.render(
		<ConfigScreen config={config}/>,
		document.getElementById('content')
	);
});