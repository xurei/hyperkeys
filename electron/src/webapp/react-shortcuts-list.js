const React = require ("react");
const ReactRedux = require('react-redux');

import { FormGroup, FormControl, ControlLabel, HelpBlock, ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap';
const ShortcutRenderer = require('./react-shortcut-renderer');

var ShortcutsList = React.createClass({
	propTypes: {
		shortcuts: React.PropTypes.object.isRequired
	},
	
	render: function() {
		var shortcuts = Object.keys(this.props.shortcuts).map((key) => {
			var shortcut = this.props.shortcuts[key];
			return (
				<ListGroupItem key={"shortcut_"+key}>
					<Row>
						<Col xs={12} sm={4} md={3}>
							<div style={{lineHeight:"40px"}}>{key.charAt(0).toUpperCase() + key.substring(1)}</div>
						</Col>
						<Col xs={12} sm={8} md={9}>
							<ShortcutRenderer shortcut={shortcut}></ShortcutRenderer>
							<span className="pull-right">
								<span className="btn btn-default">🖉</span>&nbsp;
							</span>
						</Col>
					</Row>
				</ListGroupItem>
			);
		});
		
		return (
			<ListGroup>
				{shortcuts}
			</ListGroup>
		);
	},
	
	shouldComponentUpdate: function(nextProps, nextState) {
		return JSON.stringify(this.props) !== JSON.stringify(nextProps);
	}
});

module.exports = ShortcutsList;