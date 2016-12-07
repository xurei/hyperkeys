const React = require ("react");
const ReactRedux = require('react-redux');
const ShortcutsList = require('./react-shortcuts-list');

import { FormGroup, FormControl, ControlLabel, HelpBlock, ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap';
const ShortcutRenderer = require('./react-shortcut-renderer');

var View = React.createClass({
	propTypes: {
		macros: React.PropTypes.array.isRequired
	},
	
	render: function() {
		var macros = this.props.macros;
		
		var shortcuts = macros.map((macro) => {
			return (
				<ListGroupItem key={"macro_"+macro.id}>
					<div>
						<span style={{lineHeight: "45px"}}>{macro.name}</span>
						<span className="pull-right">
							<span className="btn btn-default">⚙</span>&nbsp;
							<span className="btn btn-danger">&times;</span>
						</span>
					</div>
					<div style={{marginTop: "10px"}}>
						<ShortcutsList shortcuts={macro.shortcuts} />
					</div>
				</ListGroupItem>
			);
		});
		
		return (
			<ListGroup>
				{shortcuts}
			</ListGroup>
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