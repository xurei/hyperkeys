import React from 'react'; //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'; //eslint-disable-line no-unused-vars
import deepEqual from 'deep-eql';
import autobind from 'autobind-decorator';

class ShortcutRenderer extends React.Component {
    static propTypes = {
        shortcut: PropTypes.string,
    };
    
    render() {
        const shortcut = (this.props.shortcut || '').replace('++','+Plus');
		
        let i = 0;
        const keys = (
            shortcut.split('+')
            .filter((k) => k !== '')
            .map((k) => {
                ++i;
                return (
                    <span key={i}>
                        {' '}
                        <span className="btn btn-default" style={{padding: 3}}>{k.toUpperCase()}</span>
                    </span>);
            })
        );
		
        return (
            <span style={{background: 'transparent'}}>
                {keys}
            </span>
        );
    }
    
    shouldComponentUpdate(nextProps) {
        return !deepEqual(this.props, nextProps);
    }
}

export default ShortcutRenderer;
