import React from 'react'; //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'; //eslint-disable-line no-unused-vars
import deepEqual from 'deep-eql';
import autobind from 'autobind-decorator';

import { FormGroup } from 'reactstrap';
import ShortcutRenderer from './react-shortcut-renderer';
const uuid = require('uuid').v4;

class ShortcutInput extends React.Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        focus: PropTypes.bool,
    };
    static defaultProps = {
        placeholder: 'Enter shortcut',
        id: uuid(),
    };
    inputRef = React.createRef();
    state = {
        shortcut: '',
        editing: false,
    };
    typing = false;
    
    @autobind
    handleKey(e) {
        if (this.state.editing) {
            let key =[];
			
            if (e.altKey) {key.push('alt');}
            if (e.metaKey) {key.push('meta');}
            if (e.shiftKey) {key.push('shift');}
            if (e.ctrlKey) {key.push('ctrl');}
			
            console.log(e.type, e.which, e.keyCode, e.code, e.key, e.charCode);
            if (e.type === 'keydown' || (this.typing && e.type === 'keyup')) {
                if (e.type === 'keydown') {
                    this.typing = true;
                }
                if (e.which !== 18 && e.which !== 17 && e.which !== 16 && e.which !== 91) {
                    /*key.push(e.keyCode);
					 key.push(String.fromCharCode(e.keyCode));
					 key.push(String.fromCharCode(e.which));
					 key.push(e.charCode);*/
                    key.push(e.key);
                    this.typing = false;
                    //this.setState({editing: false});
                }
                else {
                    //this.setState({typing: true});
                }
                key = key.join('+');
				
                if (!e.repeat) {
                    this.setState({shortcut: key});
                    console.log(e.which, key);
                    this.props.onChange(key);
                }
            }
        }
    }
    
    componentDidMount() {
        if (this.props.focus) {
            this.setState({shortcut: '', editing: true});
            this.inputRef.current.focus();
        }
    }
    
    @autobind
    handleFocus() {
        this.setState({shortcut: '', editing: true});
        this.inputRef.current.focus();
    }
    
    render() {
        const inputStyle = {
            position: 'relative',
            background: '#222',
            height: 40,
            width: 190,
            borderRadius: '5px',
            padding: '5px',
            textAlign: 'center',
            borderStyle: 'solid',
            borderColor: (this.state.editing ? '#EE8202' : 'none'),
            borderLeftWidth: '1px',
            borderTopWidth: '1px',
            borderBottomWidth: '1px',
            borderRightWidth: '0',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
        };
		
        return (
            <FormGroup className="nomargin">
                <input
                    type="text"
                    value={''}
                    className="form-control"
                    ref={this.inputRef}
                    style={{...inputStyle, height: '0px', padding: 0, border: 'none'}}
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    onKeyDown={this.handleKey}
                    onKeyUp={this.handleKey}
                />
                <div ref="fakeinput" onClick={this.handleFocus} style={inputStyle}>
                    <div style={{zIndex: 1, position: 'absolute', width: '100%', height: '100%', padding: 3, top: 0, left: 0}}>
                        <ShortcutRenderer noEditHover shortcut={this.state.shortcut}/>
                    </div>
                    {this.state.shortcut === '' && (
                        <div style={{zIndex: 0, position: 'absolute', width: '100%', height: '100%', lineHeight: '36px', top: 0, left: 0, color: '#666'}}>
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
