import ReactDOM from 'react-dom'; //eslint-disable-line no-unused-vars
import React from 'react'; //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'; //eslint-disable-line no-unused-vars
import autobind from 'autobind-decorator';

import { FormGroup, Input, Label, Button } from 'reactstrap';

class ConfigScreen extends React.Component {
    static propTypes = {
        config: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired,
    };
    
    constructor(props) {
        super(props);
        this.state = {
            value: props.config.name,
        };
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label>Title bar</Label>
                    <div style={{display: 'flex'}}>
                        <div style={{flexGrow: 1}}>
                            <Input type="text" value={this.state.value} placeholder="Example : firefox" onChange={this.handleChange}/>
                        </div>
                        <div style={{flexGrow: 0, width: 90}}>
                            <Button color="success" disabled={this.state.value === this.props.config.name} className="pull-right fullw" onClick={this.handleSubmit}>Confirm</Button>
                        </div>
                    </div>
                    <div>Enter a title bar that matches the window you want to pin. Partial names are accepted.</div>
                </FormGroup>
            </form>
        );
    }
    
    @autobind
    handleChange(e) {
        this.setState({value: e.target.value});
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
