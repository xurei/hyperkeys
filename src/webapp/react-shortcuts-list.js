import React from 'react'; //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'; //eslint-disable-line no-unused-vars
import deepEqual from 'deep-eql';
import autobind from 'autobind-decorator';

import PopupSetShortcut from './react-popup-setshortcut';
import { FlexLayout, FlexChild } from './components/layout/flex-layout';

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
            settingShortcut: false,
        };
    }
    
    render() {
        const shortcut = this.props.shortcut;
        const metadata = this.props.metadata || {};
        return (
            <span style={{padding: '0 15px'}}>
                {metadata.title}
                {' '}
                <span onClick={this.handleOpenPopup}>
                    {!shortcut || shortcut === '' ? (
                        <span className="btn btn-default" style={{padding: '5px'}}>
                            <i className="fa fa-pencil" aria-hidden="true"/>
                        </span>
                    ) : (
                        <ShortcutRenderer shortcut={shortcut}/>
                    )}
                </span>
                {' '}
                {this.state.settingShortcut && (
                    <PopupSetShortcut onClose={this.handlePopupClose} onSubmit={this.handleChangeShortcut} />
                )}
            </span>
        );
    }
    
    @autobind
    handleChangeShortcut(shortcut) {
        //console.log(this.props.action_name);
        global.ipc.send('set_shortcut', {
            id_macro: this.props.id_macro,
            action: this.props.action_name,
            shortcut: shortcut,
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
        const shortcuts = Object.keys(this.props.shortcuts).map((key) => {
            const shortcut = this.props.shortcuts[key];
            return (
                <ShortcutsListItem id_macro={this.props.id_macro} key={`shortcut_${key}`} action_name={key} metadata={this.props.metadatas[key]} shortcut={shortcut} />
            );
        });
		
        return (
            <span>
                {shortcuts}
            </span>
        );
    }
    
    shouldComponentUpdate(nextProps) {
        return !deepEqual(this.props, nextProps);
    }
}

export default ShortcutsList;
