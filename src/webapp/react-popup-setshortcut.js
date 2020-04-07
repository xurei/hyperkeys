import React from 'react'; //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'; //eslint-disable-line no-unused-vars
import deepEqual from 'deep-eql';
import autobind from 'autobind-decorator';

import Popup from './react-popup';
import ShortcutInput from './react-shortcut-input';

import { Button } from 'reactstrap';

class PopupSetShortcut extends React.Component {
	static propTypes = {
		onClose: PropTypes.func.isRequired,
		onSubmit: PropTypes.func.isRequired,
	};
	
	constructor(props) {
		super(props);
		this.state = {
			shortcut: null,
		};
	}
	
	@autobind
	handleChange(shortcut) {
		this.setState({shortcut:shortcut});
	}
	
	@autobind
	handleSubmit(e) {
		this.props.onSubmit(this.state.shortcut);
		this.props.onClose(e);
	}
	
	componentDidMount() {
		//this.refs.add_shortcut_input.focus();
	}
	
	render() {
		return (
			<Popup maxHeight="180px"
			       title="Enter Shortcut"
			       {...this.props}>
				<ShortcutInput focus={true} ref="add_shortcut_input" shortcut={this.state.shortcut} onChange={this.handleChange} />
				<div style={{lineHeight: "40px"}} className="pull-right">
					<a href="javascript:" onClick={this.props.onClose} style={{marginRight: "10px"}}>Cancel</a>
					<Button color="success" onClick={this.handleSubmit}>Set Shortcut</Button>
				</div>
			</Popup>
		);
	}
	
	shouldComponentUpdate(nextProps, nextState) {
	    return !deepEqual(this.props, nextProps) || !deepEqual(this.state, nextState);
	}
}

export default PopupSetShortcut;
