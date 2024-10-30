import React from 'react'; //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'; //eslint-disable-line no-unused-vars
import deepEqual from 'deep-eql';
import autobind from 'autobind-decorator';
import { connect as redux_connect } from 'react-redux';

import { Button } from 'reactstrap';

import MacrosList from './react-macros-list';
import PopupAddMacro from './react-popup-addmacro';

const ipc = global.ipc;

class MacrosView extends React.Component {
    static propTypes = {};
    
    constructor(props) {
        super(props);
        this.state = {
            showPopupAddMacro: false,
        };
    }
    
    componentDidMount() {
        ipc.send('request_metadatas');
        ipc.send('request_macros');
    }

    render() {
        const props = this.props;
		
        return (
            <div className="pos-relative">
                <div className="macros-header">
                    <div className="pull-right">
                        <Button color="success" onClick={this.handleAddMacroClick}>Add Macro</Button>
                    </div>
                    <h2 className="pos-relative" style={{top: 10}}>Configured Macros</h2>
                </div>
                <MacrosList macros={props.macros} metadatas={props.metadatas} onRemoveMacro={this.handleRemoveMacro} />
				
                {this.state.showPopupAddMacro && (
                    <PopupAddMacro onClose={this.handleCloseAddMacroPopup} onSubmit={this.handleSubmitAddMacroPopup} metadatas={props.metadatas}/>
                )}
            </div>
        );
    }
    
    handleRemoveMacro(macro_id) {
        ipc.send('remove_macro', macro_id);
    }
    
    @autobind
    handleCloseAddMacroPopup(e) {
        this.setState({showPopupAddMacro: false});
    }
    
    @autobind
    handleSubmitAddMacroPopup(data) {
        console.log(data);
        ipc.send('add_macro', data);
    }
    
    @autobind
    handleAddMacroClick(e) {
        this.setState({showPopupAddMacro: true});
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return !deepEqual(this.props, nextProps) || !deepEqual(this.state, nextState);
    }
}

MacrosView = redux_connect(
    (state) => ({
        macros: state.macros,
        metadatas: state.metadatas,
    }),
)(MacrosView);

export default MacrosView;
