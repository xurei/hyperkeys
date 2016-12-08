const React = require ("react");
const PopupSetShortcut = require('./react-popup-setshortcut');

import {ListGroup, ListGroupItem, Row, Col} from 'react-bootstrap';
const ShortcutRenderer = require('./react-shortcut-renderer');

var ShortcutsListItem = React.createClass({
	propTypes: {
		id_macro: React.PropTypes.string.isRequired,
		action_name: React.PropTypes.string.isRequired,
		metadata: React.PropTypes.object.isRequired,
		shortcut: React.PropTypes.string,
	},
	getInitialState: () => ({
		settingShortcut: false
	}),
	
	render: function() {
		var shortcut = this.props.shortcut;
		return (
			<ListGroupItem>
				<Row>
					<Col xs={12} sm={4} md={3}>
						<div style={{lineHeight:"40px"}}>{this.props.metadata.title}</div>
					</Col>
					<Col xs={12} sm={8} md={9}>
						<ShortcutRenderer shortcut={shortcut}></ShortcutRenderer>
						<span className="pull-right">
						<span className="btn btn-default" onClick={this.openPopup}>🖉</span>&nbsp;
					</span>
					</Col>
				</Row>
				{this.state.settingShortcut
						? <PopupSetShortcut onClose={this.handlePopupClose} onSubmit={this.changeShortcut} />
						: <span/>}
			</ListGroupItem>
		);
	},
	
	changeShortcut: function(shortcut) {
		//console.log(this.props.action_name);
		window.ipc.send('set_shortcut', {
			id_macro: this.props.id_macro,
			action: this.props.action_name,
			shortcut: shortcut
		});
	},
	
	openPopup: function(e) {
		this.setState({settingShortcut: true});
	},
	
	handlePopupClose: function(e) {
		this.setState({settingShortcut: false});
	},
	
	shouldComponentUpdate: function(nextProps, nextState) {
		return JSON.stringify(this.props) !== JSON.stringify(nextProps) || JSON.stringify(this.state) !== JSON.stringify(nextState);
	}
});

var ShortcutsList = React.createClass({
	propTypes: {
		id_macro: React.PropTypes.string.isRequired,
		shortcuts: React.PropTypes.object.isRequired,
		metadatas: React.PropTypes.object.isRequired,
	},
	getInitialState: () => ({
	}),
	
	render: function() {
		var shortcuts = Object.keys(this.props.shortcuts).map((key) => {
			var shortcut = this.props.shortcuts[key];
			return (
				<ShortcutsListItem id_macro={this.props.id_macro} key={"shortcut_"+key} action_name={key} metadata={this.props.metadatas[key]} shortcut={shortcut} />
			);
		});
		
		return (
			<ListGroup>
				{shortcuts}
			</ListGroup>
		);
	},
	
	shouldComponentUpdate: function(nextProps, nextState) {
		return JSON.stringify(this.props) !== JSON.stringify(nextProps) || JSON.stringify(this.state) !== JSON.stringify(nextState);
	}
});

module.exports = ShortcutsList;