const React = require ("react");

import { FormGroup, FormControl, ControlLabel, HelpBlock, Grid, Row, Col } from 'react-bootstrap';

var MainView = React.createClass({
	render: function() {
		return (
			<div>
				<Grid>
					<Row>
						<Col xs={12}>
							Hello world
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
});

module.exports = MainView;