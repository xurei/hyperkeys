const React = require('./react');
const MacrosView = require ("./react-view-macros");

import { Grid, Row, Col } from 'react-bootstrap';

const MainView = React.createClass({
	render: function() {
		//TODO header
		return (
				<div>
					<div className="header"></div>
					<Grid>
						<Row>
							<Col xs={12}>
								<MacrosView/>
							</Col>
						</Row>
					</Grid>
				</div>
		);
	}
});

module.exports = MainView;