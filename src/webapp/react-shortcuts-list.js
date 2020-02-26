import React from 'react'; //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'; //eslint-disable-line no-unused-vars
import deepEqual from 'deep-eql';
import autobind from 'autobind-decorator';

import PopupSetShortcut from './react-popup-setshortcut';

import {ListGroup, ListGroupItem, Row, Col} from 'reactstrap';
import ShortcutRenderer from './react-shortcut-renderer';

class ShortcutsListItem extends React.Component {
	static propTypes = {
		id_macro: PropTypes.string.isRequired,
		action_name: PropTypes.string.isRequired,
		metadata: PropTypes.object.isRequired,
		shortcut: PropTypes.string,
	};
	
	constructor(props) {
		super(props);
		this.state = {
			settingShortcut: false
		};
	}
	
	render() {
		let shortcut = this.props.shortcut;
		return (
			<ListGroupItem>
				<Row>
					<Col xs={12} sm={4} md={3}>
						<div style={{lineHeight:"40px"}}>{this.props.metadata.title}</div>
					</Col>
					<Col xs={12} sm={8} md={9}>
						<ShortcutRenderer shortcut={shortcut}/>
						<span className="pull-right">
							<span className="btn btn-default" onClick={this.handleOpenPopup}>
								<i className="fa fa-pencil" aria-hidden="true"/>
							</span>
							&nbsp;
						</span>
					</Col>
				</Row>
				{this.state.settingShortcut && (
					<PopupSetShortcut onClose={this.handlePopupClose} onSubmit={this.handleChangeShortcut} />
				)}
			</ListGroupItem>
		);
	}
	
	@autobind
	handleChangeShortcut(shortcut) {
		//console.log(this.props.action_name);
		window.ipc.send('set_shortcut', {
			id_macro: this.props.id_macro,
			action: this.props.action_name,
			shortcut: shortcut
		});
	}
	
	@autobind
	handleOpenPopup(/*e*/) {
		console.log('open popup');
		this.setState({settingShortcut: true});
	}
	
	@autobind
	handlePopupClose(/*e*/) {
		this.setState({settingShortcut: false});
	}
	
	shouldComponentUpdate(nextProps, nextState) {
	    return !deepEqual(this.props, nextProps) || !deepEqual(this.state, nextState);
	}
}

export { ShortcutsListItem };

class ShortcutsList extends React.Component {
	static propTypes = {
		id_macro: PropTypes.string.isRequired,
		shortcuts: PropTypes.object.isRequired,
		metadatas: PropTypes.object.isRequired,
	};
	
	render() {
		let shortcuts = Object.keys(this.props.shortcuts).map((key) => {
			let shortcut = this.props.shortcuts[key];
			return (
				<ShortcutsListItem id_macro={this.props.id_macro} key={"shortcut_"+key} action_name={key} metadata={this.props.metadatas[key]} shortcut={shortcut} />
			);
		});
		
		return (
			<ListGroup>
				{shortcuts}
			</ListGroup>
		);
	}
	
	shouldComponentUpdate(nextProps) {
		return !deepEqual(this.props, nextProps);
	}
}

export default ShortcutsList;
