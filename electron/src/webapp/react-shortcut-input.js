const React = require ("react");

import { FormGroup, FormControl, ControlLabel, HelpBlock, ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap';
const ShortcutRenderer = require('./react-shortcut-renderer');
const uuid = require('uuid');
const ReactDOM = require ("react-dom");

var View = React.createClass({
	propTypes: {
		onChange: React.PropTypes.func.isRequired,
	},
	getDefaultProps: () => ({
		placeholder: "Enter shortcut",
		id: uuid()
	}),
	getInitialState: () => ({
		shortcut: "",
		editing: false
	}),
	
	handleKey: function(e) {
		if (this.state.editing) {
			var key =[];
			
			if (e.altKey) key.push("alt");
			if (e.metaKey) key.push("meta");
			if (e.shiftKey) key.push("shift");
			if (e.ctrlKey) key.push("ctrl");
			
			if (e.type == "keydown" && e.which != 18 && e.which != 17 && e.which != 16 && e.which != 91) {
				/*key.push(e.keyCode);
				 key.push(String.fromCharCode(e.keyCode));
				 key.push(String.fromCharCode(e.which));
				 key.push(e.charCode);*/
				key.push(e.key);
				this.setState({editing: false});
			}
			key = key.join("+");
			
			if (!e.repeat) {
				this.setState({shortcut: key});
				console.log(e.which, key);
				this.props.onChange(key);
			}
		}
	},
	
	focus: function() {
		console.log("focus");
		this.setState({shortcut: "", editing: true});
		ReactDOM.findDOMNode(this.refs.formcontrol).focus();
	},
	
	render: function() {
		var inputStyle = {
			position: "relative",
			background:"#222",
			height:"56px",
			borderRadius: "5px",
			padding: "5px",
			textAlign:"center",
			border: (this.state.editing ? "solid 1px #666" : "none")
		};
		
		return (
			<FormGroup>
				<FormControl
					type="text"
					value={""}
					ref="formcontrol"
					style={{height:"0px", padding:0, border:"none"}}
					id={this.props.id}
					placeholder={this.props.placeholder}
					onChange={this.props.onChange}
					onKeyDown={this.handleKey}
					onKeyUp={this.handleKey}
				/>
				<div ref="fakeinput" onClick={this.focus} style={inputStyle}>
					<div style={{zIndex: 1, position: "absolute", width: "100%", height:"100%", lineHeight:"51px", top:0, left:0}}>
						<ShortcutRenderer shortcut={this.state.shortcut}/>
					</div>
					{this.state.shortcut == ""
						?	<div style={{zIndex: 0, position: "absolute", width: "100%", height:"100%", lineHeight:"56px", top:0, left:0, color:"#666"}}>
								{this.props.placeholder}
							</div>
						:	<span/>}
				</div>
			</FormGroup>
		);
	}
});

module.exports = View;