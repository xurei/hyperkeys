import React from 'react'; //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'; //eslint-disable-line no-unused-vars
import Styled from 'styled-components';

function FlexLayout(props) {
    const style = Object.assign({}, props.style, {
        flexDirection: props.direction || 'row',
        flexWrap: props.wrap || 'nowrap',
    });
    return (
        <div className={props.className} style={style}>
            {props.children}
        </div>
    );
}
FlexLayout.propTypes = {
    direction: PropTypes.oneOf(['column', 'column-reverse', 'row', 'row-reverse']),
    wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
};

//language=SCSS
//eslint-disable-next-line no-func-assign
FlexLayout = Styled(FlexLayout)`
& {
    position: relative;
    display: flex;
    height: 100%;
    width: 100%;
}
`;

function FlexChild(props) {
    const style = Object.assign({}, props.style, {
        flexGrow: props.grow || 0,
        flexShrink: props.shrink || 0,
        width: props.width,
        height: props.height,
    });
    
    return (
        <div className={props.className} style={style}>
            {props.children}
        </div>
    );
}
FlexChild.propTypes = {
    grow: PropTypes.number,
    shrink: PropTypes.number,
};

export { FlexLayout, FlexChild };
