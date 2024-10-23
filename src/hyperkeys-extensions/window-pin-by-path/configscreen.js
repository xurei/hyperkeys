import React from 'react'; //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'; //eslint-disable-line no-unused-vars
import autobind from 'autobind-decorator';

import { FormGroup, InputGroup, Input, Label, Button } from 'reactstrap';

class ConfigScreen extends React.Component {
    static propTypes = {
        config: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired,
    };
    
    constructor(props) {
        super(props);
        this.state = {
            value: props.config.path,
        };
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label>Path</Label>
                    <InputGroup>
                        <Input type="text" value={this.state.value} placeholder="Ex: firefox" onChange={this.handleChangeName}/>
                    </InputGroup>
                    <div>Enter the path of the executable to bring to front or run.</div>
                    
                    <br/>
                    
                    <div style={{width: 200}}>
                        <Button color="success" disabled={this.state.value === this.props.config.path} className="pull-right fullw" onClick={this.handleSubmit}>Confirm</Button>
                    </div>
                    <br/>
                </FormGroup>
            </form>
        );
    }
    
    @autobind
    handleChangeName(e) {
        this.setState({value: e.target.value});
    }
    
    @autobind
    handleSubmit(e) {
        e.preventDefault();
        const config = Object.assign({}, this.props.config, { path: this.state.value });
        this.props.onSubmit(config);
    }
}

export { ConfigScreen };

global.hyperkeys_modules = global.hyperkeys_modules || {};
global.hyperkeys_modules['WINDOW_PIN_BY_PATH'] = ConfigScreen;
