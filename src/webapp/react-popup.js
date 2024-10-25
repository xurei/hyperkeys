import React from 'react'; //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'; //eslint-disable-line no-unused-vars

class Popup extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        onClose: PropTypes.func.isRequired,
        maxWidth: PropTypes.string,
        maxHeight: PropTypes.string,
    };
    static defaultProps = {
        visible: true,
        maxWidth: '500px',
        maxHeight: '350px',
    };
    
    componentDidMount() {
        console.log('add evt listener');
        this.handleEscape = this.handleEscape.bind(this);
        global.document.body.addEventListener('keydown', this.handleEscape);
    }
    
    componentWillUnmount() {
        global.document.body.removeEventListener('keydown', this.handleEscape);
    }
    
    handleEscape(e) {
        if(e.key === 'Escape') {
            this.props.onClose();
        }
    }
    
    render() {
        //TODO allow to not have an height. This can be done by removing some absolute positions if maxHeight is not set
		
        const props = this.props;
		
        return (
            <div style={{position: 'fixed', flexDirection: 'column', alignItems: 'center', justifyContent: 'start', left: 0,right: 0,top: 0,bottom: 0, background: 'rgba(0,0,0,0.2)', zIndex: 1000, display: (props.visible ? 'flex':'none')}}>
                <div style={{height: '25vh'}}></div>
                <div style={{position: 'relative', width: '100%', maxWidth: props.maxWidth, background: '#111111', boxShadow: '#000 0 0 25px', overflow: 'hidden'}}>
                    <div style={{height: '2.6em', width: '100%', background: '#222', padding: '11px 8px'}}>
                        <span style={{position: 'absolute', display: 'inline-block', height: 'inherit', top: 0, right: 0, fontSize: '1.8em', color: '#fff', textDecoration: 'none', cursor: 'pointer', padding: '0 10px 1px 10px'}} onClick={props.onClose}>&times;</span>
                        <h4 style={{margin: 0}}>{props.title}</h4>
                    </div>
                    <div style={{width: '100%', padding: '8px 8px 54px 8px'}}>
                        {props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;
