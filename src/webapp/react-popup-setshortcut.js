import React from 'react'; //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'; //eslint-disable-line no-unused-vars
import deepEqual from 'deep-eql';
import autobind from 'autobind-decorator';

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
        this.setState({shortcut: shortcut});
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
            <div style={{display: 'flex', alignItems: 'center'}}>
                <ShortcutInput focus={true} ref="add_shortcut_input" shortcut={this.state.shortcut} onChange={this.handleChange} />
                <div style={{display: 'inline-block', lineHeight: '30px'}}>
                    <Button className="btn-shortcut-confirm" color="success" onClick={this.handleSubmit}>
                        <i className="fa fa-check" aria-hidden="true"/>
                    </Button>
                    {' '}
                    <a href="javascript:" onClick={this.props.onClose} style={{marginRight: '10px'}}>cancel</a>
                </div>
            </div>
        );
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return !deepEqual(this.props, nextProps) || !deepEqual(this.state, nextState);
    }
}

export default PopupSetShortcut;
