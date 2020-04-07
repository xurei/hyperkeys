import React from 'react'; //eslint-disable-line no-unused-vars
import Styled from 'styled-components';
import PropTypes from 'prop-types'; //eslint-disable-line no-unused-vars
import deepEqual from 'deep-eql';
import autobind from 'autobind-decorator';

import MacrosView from './react-view-macros';

import { Container, Row, Col } from 'reactstrap';

class MainView extends React.Component {
    render() {
        const props = this.props;
        return (
            <div className={props.className}>
                <div className="header"/>
                <MacrosView/>
            </div>
        );
    }
}
//language=SCSS
MainView = Styled(MainView)`
& {
    padding: 10px 40px;
}
`;

export default MainView;
