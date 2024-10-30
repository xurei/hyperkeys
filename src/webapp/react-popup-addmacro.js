import React from 'react'; //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'; //eslint-disable-line no-unused-vars
import deepEqual from 'deep-eql';
import autobind from 'autobind-decorator';

import { Button } from 'reactstrap';
import Popup from './react-popup';
const arrayToMap = require('xurei-util').arrayToMap;

import { FormGroup, Label } from 'reactstrap';

function buildMacro(macro) {
    macro = JSON.parse(JSON.stringify(macro));
    return {
        name: macro.name,
        description: macro.description,
        shortcuts: arrayToMap(Object.keys(macro.actions), k=>k, v=>null),
        config: macro.defaultConfig,
    };
}

class PopupAddMacro extends React.Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        metadatas: PropTypes.object.isRequired,
    };
    
    constructor(props) {
        super(props);
        this.state = {
            chosenMacro: buildMacro(this.props.metadatas[Object.keys(this.props.metadatas)[0]]),
        };
    }
    
    @autobind
    handleChange(e) {
        const macro = this.props.metadatas[
        Object.keys(this.props.metadatas).filter((key) => {
            const m = this.props.metadatas[key];
            return (m.name === e.target.value);
        })[0]
        ];
        this.setState({chosenMacro: buildMacro(macro)}, null);
    }
    
    @autobind
    handleSubmit(e) {
        this.props.onSubmit(this.state.chosenMacro);
        this.props.onClose(e);
    }
    
    render() {
        let metadatas = this.props.metadatas;
		
        metadatas = Object.keys(metadatas).map((key) => {
            const macroType = metadatas[key];
            return (
                <option key={key} value={macroType.name}>{macroType.title}</option>
            );
        });
		
        const curMacroDescription = (this.state.chosenMacro ? this.state.chosenMacro.description : 'plop');
        console.log(this.state);
        console.log(curMacroDescription);
		
        return (
            <Popup maxHeight="220px" title="Add Macro" {...this.props}>
                <form>
                    <FormGroup>
                        <Label>Choose Macro type :</Label>
                        <select className="form-control" placeholder="Select" onChange={this.handleChange}>
                            {metadatas}
                        </select>
                        <div style={{padding: 10}}>
                            {curMacroDescription}
                        </div>
                    </FormGroup>
					
                    <div style={{lineHeight: '40px'}} className="pull-right">
                        <a href="javascript:void(0)" onClick={this.props.onClose} style={{marginRight: '10px'}}>Cancel</a>
                        <Button color="success" onClick={this.handleSubmit}>Add Macro</Button>
                    </div>
                </form>
            </Popup>
        );
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return !deepEqual(this.props, nextProps) || !deepEqual(this.state, nextState);
    }
}

export default PopupAddMacro;
