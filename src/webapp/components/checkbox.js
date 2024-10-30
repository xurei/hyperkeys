import React from 'react'; //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'; //eslint-disable-line no-unused-vars
import deepEqual from 'deep-eql';
import { injectCss } from '../util/inject-css';

/**
 * An uncontrolled checkbox with all the required logic but no rendering.
 * A renderer prop is provided to implement the rendering itself as a pure component.
 */
class Checkbox extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        className: PropTypes.string,
        name: PropTypes.string,
        checked: PropTypes.bool.isRequired,
        disabled: PropTypes.bool,
        tabindex: PropTypes.number,
        onClick: PropTypes.func.isRequired,
        
        // The pure component used to render the various states of the checkbox. A default renderer is provided (see DefaultCheckboxRenderer)
        renderer: PropTypes.oneOfType([
            PropTypes.instanceOf(React.Component),
            PropTypes.func,
        ]),
    };
    
    state = {
        focus: false,
        hover: false,
    };
    
    constructor(props) {
        super(props);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }
    
    render() {
        const props = this.props;
        let Renderer = props.renderer;
        if (typeof(Renderer) === 'undefined') {
            console.warn('No renderer set for Checkbox. Set the renderer to DefaultCheckboxRenderer for the defaault behavior.');
            Renderer = DefaultCheckboxRenderer;
        }
        return (
            <div className={props.className} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <span className="xureact-checkbox__wrapper" tabIndex={props.tabindex} style={{ display: 'inline-block', position: 'relative' }}
                    onClick={props.disabled ? null : props.onClick} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    <input type="checkbox" checked={props.checked} style={{
                        //visibility: 'hidden',
                        opacity: 0,
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    }}
                    tabIndex={props.tabindex}
                    onFocus={this.handleFocus} onBlur={this.handleBlur}>
                    </input>
                    <Renderer checked={props.checked} disabled={props.disabled} hover={this.state.hover} focus={this.state.focus}/>
                </span></div>
        );
    }
    
    handleBlur(e) {
        this.setState(s => ({
            ...s,
            focus: false,
        }));
    }
    
    handleFocus(e) {
        this.setState(s => ({
            ...s,
            focus: true,
        }));
    }
    
    handleMouseEnter(e) {
        this.setState(s => ({
            ...s,
            hover: true,
        }));
    }
    
    handleMouseLeave(e) {
        this.setState(s => ({
            ...s,
            hover: false,
        }));
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return !deepEqual(this.props, nextProps) || !deepEqual(this.state, nextState);
    }
}

class DefaultCheckboxRenderer extends React.Component {
    static propTypes = {
        checked: PropTypes.bool.isRequired,
        hover: PropTypes.bool.isRequired,
        focus: PropTypes.bool.isRequired,
        disabled: PropTypes.bool,
    };
    
    static focusStyle = Object.assign({}, DefaultCheckboxRenderer.baseStyle, {
        background: 'red',
        color: '#fff',
        fontSize: 20,
        lineHeight: '20px',
    });
    
    componentDidMount() {
        injectCss('xureact-checkbox__default-renderer',
            //language=CSS
            `
                  .xureact-checkbox__default-renderer {
                    display: inline-block;
                    width: 26px;
                    height: 26px;
                    border: solid 1px #999;
                    background: #777;
                    color: #444;
                    text-align: center;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 24px;
                    line-height: 24px;
                    position: relative;
                    top: 1px;
                  }

                  .xureact-checkbox__default-renderer-checked {
                    background: #FC7E28;
                    border-color: #FC7E28;
                    color: #fff;
                  }

                  .xureact-checkbox__default-renderer-checked-disabled {
                    background: #777;
                    border-color: #999;
                    color: #fff;
                    cursor: default;
                  }

                  .xureact-checkbox__default-renderer:hover, .xureact-checkbox__default-renderer-focus {
                    border-color: #FC7E28;
                  }
                  
                  .xureact-checkbox__default-renderer-checked:hover, .xureact-checkbox__default-renderer-checked.xureact-checkbox__default-renderer-focus {
                    /*border-color: #35D;*/
                    border-color: #FFF;
                  }
            `);
    }
    
    render() {
        const props = this.props;
        const subclass = `xureact-checkbox__default-renderer${props.checked ? '-checked' : ''}${props.disabled ? '-disabled' : ''}`;
        const focusclass = `xureact-checkbox__default-renderer${props.focus ? '-focus' : ''}`;
        
        return (
            <div className={`xureact-checkbox__default-renderer ${subclass} ${focusclass}`}>
                <span style={{position: 'relative', top: '-1px', left: '1px'}}>✓</span>
            </div>
        );
    }
}

export { Checkbox, DefaultCheckboxRenderer };
