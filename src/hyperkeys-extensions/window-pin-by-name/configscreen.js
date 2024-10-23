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
            value: props.config.name,
            fallbackCommand: props.config.fallbackCommand,
        };
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label>Title bar</Label>
                    <InputGroup>
                        <Input type="text" value={this.state.value} placeholder="Ex: firefox" onChange={this.handleChangeName}/>
                    </InputGroup>
                    <div>Enter a title bar that matches the window you want to pin. Partial names are accepted.</div>
                    
                    <br/>
                    
                    <Label>Fallback command</Label>
                    <InputGroup>
                        <Input type="text" value={this.state.fallbackCommand} placeholder="Ex: /bin/firefox" onChange={this.handleChangeFallbackCmd}/>
                    </InputGroup>
                    <div>If set, run this command if no window match the title bar filter</div>
                    
                    <br/>
                    
                    <div style={{width: 200}}>
                        <Button color="success" disabled={this.state.value === this.props.config.name && this.state.fallbackCommand === this.props.config.fallbackCommand} className="pull-right fullw" onClick={this.handleSubmit}>Confirm</Button>
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
    handleChangeFallbackCmd(e) {
        this.setState({value: e.target.fallbackCommand});
    }
    
    @autobind
    handleSubmit(e) {
        e.preventDefault();
        const config = Object.assign({}, this.props.config, { name: this.state.value });
        this.props.onSubmit(config);
    }
}

export { ConfigScreen };

global.hyperkeys_modules = global.hyperkeys_modules || {};
global.hyperkeys_modules['WINDOW_PIN_BY_NAME'] = ConfigScreen;
