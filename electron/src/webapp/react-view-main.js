const React = require ("react");
const ShortcutsView = require ("./react-view-shortcuts");

import { FormGroup, FormControl, ControlLabel, HelpBlock, ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap';

var MainView = React.createClass({
	render: function() {
		return (
				<div>
					<div className="header">HEADER</div>
					<Grid>
						<Row>
							<Col xs={12}>
								<ShortcutsView></ShortcutsView>
							</Col>
						</Row>
					</Grid>
				</div>
		);
	}
});

module.exports = MainView;