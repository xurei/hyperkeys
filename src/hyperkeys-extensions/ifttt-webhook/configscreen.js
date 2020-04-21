import React from 'react'; //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'; //eslint-disable-line no-unused-vars
import autobind from 'autobind-decorator';

// TODO migrate this file in an external lib, for community ?
//eslint-disable-next-line xurei/no-relative-parent-imports
import { ExternalLink } from '../../webapp/components/external-link';
import { FormGroup, Input, Label } from 'reactstrap';

class ConfigScreen extends React.Component {
    static propTypes = {
        config: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired,
    };
    
    constructor(props) {
        super(props);
        this.state = {
            event: props.config.event,
            apiKey: props.config.apiKey,
        };
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label>IFTTT API Key</Label>
                    <ol>
                        <li>Go to <ExternalLink href="https://ifttt.com/maker_webhooks">https://ifttt.com/maker_webhooks</ExternalLink> and login,</li>
                        <li>Click on the "Documentation" button in the top right,</li>
                        <li>
                            Copy your key here:
                            <Input type="text" id="apiKey" value={this.state.apiKey} placeholder="" onChange={this.handleChange}/>
                        </li>
                    </ol>
    
                    <Label>Event</Label>
                    <p>Use the same event name as the one you configured in IFTTT.</p>
                    <Input type="text" id="event" value={this.state.event} placeholder="Example : my_event" onChange={this.handleChange}/>
                </FormGroup>
            </form>
        );
    }
    
    @autobind
    handleChange(e) {
        const newState = {};
        newState[e.target.id] = e.target.value;
        this.setState(newState);
        
        const config = Object.assign({}, this.props.config, this.state, newState);
        this.props.onSubmit(config);
    }
}

export { ConfigScreen };

global.hyperkeys_modules = global.hyperkeys_modules || {};
global.hyperkeys_modules['IFTTT_WEBHOOK'] = ConfigScreen;
