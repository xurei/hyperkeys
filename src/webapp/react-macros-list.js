import React from 'react'; //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'; //eslint-disable-line no-unused-vars
import deepEqual from 'deep-eql';
import autobind from 'autobind-decorator';
import { ListGroup, ListGroupItem } from 'reactstrap';

import ShortcutsList from './react-shortcuts-list';
import { Checkbox } from './components/checkbox';

class MacrosListItem extends React.Component {
    static propTypes = {
        macro: PropTypes.object.isRequired,
        metadata: PropTypes.object.isRequired,
        onRemoveMacro: PropTypes.func.isRequired,
    };
    
    constructor(props) {
        super(props);
        this.state = {
            detailsVisible: false,
        };
    }
    
    render() {
        const macro = this.props.macro;
        const metadata = this.props.metadata;
        
        const ConfigScreen = global.hyperkeys_modules[metadata.name];
        const hasConfig = metadata.configScreen && metadata.configScreen.enabled;
        
        return (
            <ListGroupItem>
                <div style={{ userSelect: 'none' }}>
                    <Checkbox
                        name="test"
                        checked={macro.enabled}
                        onClick={this.handleEnabledClick}
                    />
                    <span style={{ paddingLeft: '8px', position: 'relative', zIndex: 1 }}>
                        <span className="macro-name" onClick={this.handleToggleDetails} style={{cursor: 'pointer'}}>
                            <span style={{opacity: macro.enabled ? 1 : 0.33, lineHeight: '45px', display: 'inline-block', width: 32, paddingLeft: 0}}>
                                {hasConfig ? <i className="fa fa-cog btn-settings"/> : ' '}
                            </span>
                            <span style={{opacity: macro.enabled ? 1 : 0.33, lineHeight: '45px', display: 'inline-block', width: 300}}>
                                {macro.title}
                            </span>
                        </span>
                        <span style={{ position: 'relative', top: '-9px'}}>
                            <ShortcutsList enabled={macro.enabled} id_macro={macro.id} shortcuts={macro.shortcuts} metadatas={metadata.actions}/>
                        </span>
                    </span>
                    <span className="pull-right">
                        <span className="btn btn-danger-hollow btn-danger" data-id={macro.id} onClick={this.handleRemoveclick}>
                            <i className="fa fa-trash"/>
                        </span>
                    </span>
                </div>
                {hasConfig && this.state.detailsVisible && (
                    <div>
                        {(metadata.configScreen && metadata.configScreen.enabled) && (
                            <div style={{position: 'relative', zIndex: 0, padding: '0 5px 5px 10px'}}>
                                {ConfigScreen && <ConfigScreen config={macro.config} onSubmit={this.handleConfigChange}/>}
                            </div>
                        )}
                        {/*<ShortcutsList id_macro={macro.id} shortcuts={macro.shortcuts} metadatas={metadata.actions}/>*/}
                    </div>
                )}
            </ListGroupItem>
        );
    }
    
    @autobind
    handleEnabledClick(e) {
        e.stopPropagation();
        const macro = this.props.macro;
        global.ipc.send('set_enabled', { id: macro.id, enabled: !macro.enabled });
        global.ipc.send('request_macros');
    }
    
    @autobind
    handleRemoveclick(e) {
        e.stopPropagation();
        if (global.confirm('Remove macro ?')) {
            this.props.onRemoveMacro(this.props.macro.id);
        }
    }
    
    @autobind
    handleConfigChange(config) {
        const macro = this.props.macro;
        global.ipc.send('set_config', { id: macro.id, config: config });
    }
    
    @autobind
    handleToggleDetails(e) {
        this.setState({detailsVisible: !this.state.detailsVisible});
    }
    
    @autobind
    handleToggleConfig(e) {
        this.setState({detailsVisible: !this.state.detailsVisible});
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return !deepEqual(this.props, nextProps) || !deepEqual(this.state, nextState);
    }
}

export { MacrosListItem };

class MacrosList extends React.Component {
    static propTypes = {
        macros: PropTypes.array.isRequired,
        metadatas: PropTypes.object.isRequired,
        onRemoveMacro: PropTypes.func.isRequired,
    };
    
    render() {
        const macros = (
            this.props.macros
            .sort((a,b) => {
                return a.name.localeCompare(b.name);
            })
        );
        
        const shortcuts = macros.map((macro) => {
            return (
                <MacrosListItem key={`macro_${macro.id}`} macro={macro} metadata={this.props.metadatas[macro.name]}
                    onRemoveMacro={this.props.onRemoveMacro} />
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

export default MacrosList;
