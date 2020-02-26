import React from 'react'; //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'; //eslint-disable-line no-unused-vars
import deepEqual from 'deep-eql';
import autobind from 'autobind-decorator';

import { FormGroup, Input } from 'reactstrap';
import ShortcutRenderer from './react-shortcut-renderer';
const uuid = require('uuid').v4;
const ReactDOM = require ('react-dom');

class ShortcutInput extends React.Component {
	static propTypes = {
		onChange: PropTypes.func.isRequired,
	};
	static defaultProps = {
		placeholder: 'Enter shortcut',
		id: uuid(),
	};
	
	constructor(props) {
		super(props);
		this.state = {
			shortcut: '',
			editing: false
		};
	}
	
	@autobind
	handleKey(e) {
		if (this.state.editing) {
			var key =[];
			
			if (e.altKey) key.push('alt');
			if (e.metaKey) key.push('meta');
			if (e.shiftKey) key.push('shift');
			if (e.ctrlKey) key.push('ctrl');
			
			console.log(e, e.which, e.keyCode, e.code, e.key, e.charCode);
			
			if (e.type === 'keydown' && e.which !== 18 && e.which !== 17 && e.which !== 16 && e.which !== 91) {
				/*key.push(e.keyCode);
				 key.push(String.fromCharCode(e.keyCode));
				 key.push(String.fromCharCode(e.which));
				 key.push(e.charCode);*/
				key.push(e.key);
				this.setState({editing: false});
			}
			key = key.join('+');
			
			if (!e.repeat) {
				this.setState({shortcut: key});
				console.log(e.which, key);
				this.props.onChange(key);
			}
		}
	}
	
	@autobind
	handleFocus() {
		console.log('focus');
		this.setState({shortcut: '', editing: true});
		ReactDOM.findDOMNode(this.refs.Input).focus();
	}
	
	render() {
		var inputStyle = {
			position: 'relative',
			background:'#222',
			height:'56px',
			borderRadius: '5px',
			padding: '5px',
			textAlign:'center',
			border: (this.state.editing ? 'solid 1px #666' : 'none')
		};
		
		return (
			<FormGroup>
				<Input
					type='text'
					value={''}
					ref='Input'
					style={{height:'0px', padding:0, border:'none'}}
					id={this.props.id}
					placeholder={this.props.placeholder}
					onKeyDown={this.handleKey}
					onKeyUp={this.handleKey}
				/>
				<div ref='fakeinput' onClick={this.handleFocus} style={inputStyle}>
					<div style={{zIndex: 1, position: 'absolute', width: '100%', height:'100%', lineHeight:'51px', top:0, left:0}}>
						<ShortcutRenderer shortcut={this.state.shortcut}/>
					</div>
					{this.state.shortcut === '' && (
						<div style={{zIndex: 0, position: 'absolute', width: '100%', height:'100%', lineHeight:'56px', top:0, left:0, color:'#666'}}>
							{this.props.placeholder}
						</div>
					)}
				</div>
			</FormGroup>
		);
	}
	
	shouldComponentUpdate(nextProps, nextState) {
	    return !deepEqual(this.props, nextProps) || !deepEqual(this.state, nextState);
	}
}

export default ShortcutInput;
