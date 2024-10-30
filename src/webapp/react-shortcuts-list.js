import React from 'react'; //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'; //eslint-disable-line no-unused-vars
import deepEqual from 'deep-eql';
import autobind from 'autobind-decorator';

import PopupSetShortcut from './react-popup-setshortcut';

import ShortcutRenderer from './react-shortcut-renderer';

class ShortcutsListItem extends React.Component {
    static propTypes = {
        id_macro: PropTypes.string.isRequired,
        action_name: PropTypes.string.isRequired,
        enabled: PropTypes.bool.isRequired,
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
        const props = this.props;
        const shortcut = this.props.shortcut;
        const metadata = this.props.metadata || {};
        return (
            <span style={{padding: '0 32px 0 0'}}>
                <div style={{opacity: props.enabled ? 1 : 0.33}}>
                    <div style={{paddingRight: '5px'}}>
                        {metadata.title}
                    </div>
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
                </div>
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
        enabled: PropTypes.bool.isRequired,
        shortcuts: PropTypes.object.isRequired,
        metadatas: PropTypes.object.isRequired,
    };
    
    render() {
        const props = this.props;
        const shortcuts = Object.keys(props.shortcuts).map((key) => {
            const shortcut = props.shortcuts[key];
            return (
                <ShortcutsListItem
                    key={`shortcut_${key}`}
                    id_macro={props.id_macro}
                    enabled={props.enabled}
                    action_name={key}
                    metadata={props.metadatas[key]}
                    shortcut={shortcut}
                />
            );
        });
		
        return (
            <span style={{display: 'inline-block'}}>
                <span style={{display: 'flex', flexDirection: 'row'}}>
                    {shortcuts}
                </span>
            </span>
        );
    }
    
    shouldComponentUpdate(nextProps) {
        return !deepEqual(this.props, nextProps);
    }
}

export default ShortcutsList;
