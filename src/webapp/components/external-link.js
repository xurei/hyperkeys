import React from 'react'; //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'; //eslint-disable-line no-unused-vars
import deepEqual from 'deep-eql';
import autobind from 'autobind-decorator';

class ExternalLink extends React.Component {
    static propTypes = {
        href: PropTypes.string,
    };
    
    render() {
        const props = this.props;
        return (
            <a target="_blank" href={props.href} onClick={this.handleClick}>{props.children}</a>
        );
    }
    
    @autobind
    handleClick(e) {
        e.preventDefault();
        global.ipc.send('open_external', this.props.href);
    }
    
    shouldComponentUpdate(nextProps) {
        return !deepEqual(this.props, nextProps);
    }
}

export { ExternalLink };
