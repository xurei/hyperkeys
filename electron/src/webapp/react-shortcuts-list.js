const React = require ("react");
const ReactRedux = require('react-redux');

import { FormGroup, FormControl, ControlLabel, HelpBlock, ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap';
const ShortcutRenderer = require('./react-shortcut-renderer');

var View = React.createClass({
	propTypes: {
		shortcuts: React.PropTypes.array.isRequired
	},
	
	render: function() {
		var shortcuts = this.props.shortcuts;
		
		var shortcuts = shortcuts.map((shortcut) => {
			return (
					<ListGroupItem key={"shortcut_"+shortcut.key}>
						<Row>
							<Col xs={5}>
								<ShortcutRenderer shortcut={shortcut.key}></ShortcutRenderer>
							</Col>
							<Col xs={7}>
								<span style={{lineHeight: "45px"}}>{shortcut.action.name}</span>
								<span className="pull-right">
									<span className="btn btn-default">🖉</span>&nbsp;
									<span className="btn btn-default">⚙</span>&nbsp;
									<span className="btn btn-danger">&times;</span>
								</span>
							</Col>
						</Row>
					</ListGroupItem>
			);
		});
		
		return (
				<div>
					<ListGroup>
						{shortcuts}
					</ListGroup>
				</div>
		);
	}
});


function mapStateToProps(state) {
	return {
		shortcuts: state.keybinds
	}
}

function mapDispatchToProps(dispatch) {
	/*return {
		onClickNext: () => {
			dispatch(actions.nextPage())
		},
		onClickPrev: () => {
			dispatch(actions.prevPage())
		},
		onClickCancel: () => {
			dispatch(actions.cancel());
		},
		onClickFinish: () => {
			dispatch(actions.finish());
		},
		onValidityChange: (pageIndex, validity) => {
			dispatch(actions.validityChange(pageIndex, validity));
		},
		onChange: (pageIndex, validity) => {
			dispatch(actions.dataChange(pageIndex, validity));
		}
	}*/
	return {};
}

module.exports = ReactRedux.connect(
		mapStateToProps,
		mapDispatchToProps
)(View);