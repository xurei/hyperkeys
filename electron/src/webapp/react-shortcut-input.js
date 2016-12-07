const React = require ("react");

import { FormGroup, FormControl, ControlLabel, HelpBlock, ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap';
const ShortcutRenderer = require('./react-shortcut-renderer');
const uuid = require('uuid');
const ReactDOM = require ("react-dom");

var View = React.createClass({
	propTypes: {
		visible: React.PropTypes.bool,
		onChange: React.PropTypes.func.isRequired,
	},
	getDefaultProps: () => ({
		placeholder: "Enter shortcut",
		id: uuid()
	}),
	getInitialState: () => ({
		shortcut: ""
	}),
	
	handleKey: function(e) {
		var key =[];
		
		if (e.altKey) key.push("alt");
		if (e.metaKey) key.push("meta");
		if (e.shiftKey) key.push("shift");
		if (e.ctrlKey) key.push("ctrl");
		
		if (e.type == "keydown" && e.which > 20) {
			/*key.push(e.keyCode);
			key.push(String.fromCharCode(e.keyCode));
			key.push(String.fromCharCode(e.which));
			key.push(e.charCode);*/
			key.push(e.key);
		}
		key = key.join("+");
		
		if (!e.repeat) {
			this.setState({shortcut: key});
			console.log(e.which, key);
		}
	},
	
	handleKeyDown: function(e) {
		this.handleKey(false, e);
	},
	
	handleKeyUp: function(e) {
		this.handleKey(true, e);
	},
	
	focus: function() {
		console.log("focus");
		ReactDOM.findDOMNode(this.refs.formcontrol).focus();
	},
	
	render: function() {
		return (
			<FormGroup>
				<FormControl
					type="text"
					value={""}
					ref="formcontrol"
					id={this.props.id}
					placeholder={this.props.placeholder}
					onChange={this.props.onChange}
					onKeyDown={this.handleKey}
					onKeyUp={this.handleKey}
				/>
				<ShortcutRenderer shortcut={this.state.shortcut}/>
			</FormGroup>
		);
	}
});

module.exports = View;