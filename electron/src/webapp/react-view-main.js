const React = require('./react');
const MacrosView = require ("./react-view-macros");

import { FormGroup, FormControl, ControlLabel, HelpBlock, ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap';

var MainView = React.createClass({
	render: function() {
		//TODO header
		return (
				<div>
					<div className="header"></div>
					<Grid>
						<Row>
							<Col xs={12}>
								<MacrosView></MacrosView>
							</Col>
						</Row>
					</Grid>
				</div>
		);
	}
});

module.exports = MainView;