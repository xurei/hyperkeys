import React from 'react'; //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'; //eslint-disable-line no-unused-vars
import deepEqual from 'deep-eql';
import autobind from 'autobind-decorator';
import ShortcutsList from './react-shortcuts-list';

import { ListGroup, ListGroupItem } from 'reactstrap';

class MacrosListItem extends React.Component {
    static propTypes = {
        macro: PropTypes.object.isRequired,
        metadata: PropTypes.object.isRequired,
        onRemoveMacro: PropTypes.func.isRequired,
        onMacroConfig: PropTypes.func.isRequired,
    };
    
    constructor(props) {
        super(props);
        this.state = {
            detailsVisible: true,
        };
    }
    
    render() {
        const macro = this.props.macro;
        const metadata = this.props.metadata;
        
        const me = this;
        
        const ConfigScreen = global.hyperkeys_modules[metadata.name];
        const hasConfig = metadata.configScreen && metadata.configScreen.enabled;
        
        return (
            <ListGroupItem>
                <div onClick={this.handleToggleDetails} style={{cursor:'pointer'}}>
                    <span style={{lineHeight:'45px', display: 'inline-block', width:200}}>{hasConfig ? (this.state.detailsVisible ? '−':'+') : ' '} {macro.title}</span>
                    <ShortcutsList id_macro={macro.id} shortcuts={macro.shortcuts} metadatas={metadata.actions}/>
                    <span className="pull-right">
                        <span className="btn btn-danger" onClick={(e) => { e.stopPropagation(); if (confirm('Remove macro ?')) me.props.onRemoveMacro(macro.id); }}>&times;</span>
                    </span>
                </div>
                {hasConfig && this.state.detailsVisible && (
                    <div style={{marginTop: '10px'}}>
                        {(metadata.configScreen && metadata.configScreen.enabled) && (
                            <div>
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
    handleConfigChange(config) {
        const macro = this.props.macro;
        window.ipc.send('set_config', { id: macro.id, config: config });
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
        onMacroConfig: PropTypes.func.isRequired,
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
                <MacrosListItem key={'macro_'+macro.id} macro={macro} metadata={this.props.metadatas[macro.name]}
                                onRemoveMacro={this.props.onRemoveMacro} onMacroConfig={this.props.onMacroConfig}/>
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
