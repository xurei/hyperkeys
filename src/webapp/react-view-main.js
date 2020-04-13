import React from 'react'; //eslint-disable-line no-unused-vars
import Styled from 'styled-components';
import MacrosView from './react-view-macros';
//eslint-disable-next-line xurei/no-relative-parent-imports
import * as pkg from '../../package.json';

class MainView extends React.Component {
    render() {
        const props = this.props;
        return (
            <div className={props.className}>
                <div className="header"/>
                <MacrosView/>
                <div>
                    Version: {pkg.version}
                </div>
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
