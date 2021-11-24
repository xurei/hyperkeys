import React from 'react'; //eslint-disable-line no-unused-vars
import Styled from 'styled-components';
import MacrosView from './react-view-macros';
//eslint-disable-next-line xurei/no-relative-parent-imports
import * as pkg from '../../package.json';
import { connect as redux_connect } from 'react-redux';

class MainView extends React.Component {
    render() {
        const props = this.props;
        return (
            <div className={props.className}>
                {props.release && props.release.new_version && (
                    <div className="new-version">
                        <strong>A new version of Hyperkeys is available !</strong>
                        {' '}
                        {props.release.tag_name}
                        {' '}
                        <a href="https://hyperkeys.xureilab.com/download" target="_blank">Download</a>
                    </div>
                )}
                <div className="main-content">
                    <div className="header"/>
                    <MacrosView/>
                    <div>
                        Version: {pkg.version}
                    </div>
                </div>
            </div>
        );
    }
}

MainView = redux_connect(
    (state) => {
        console.log(state);
        return ({
            release: state.latestRelease,
        });
    },
)(MainView);

//language=SCSS
MainView = Styled(MainView)`
& {
  .main-content {
    padding: 10px 40px;
  }

  .new-version {
    background: #D17000;
    position: relative;
    padding: 10px 40px;
    
    a {
      color: #320;
      text-decoration: underline;
    }
  }
}
`;

export default MainView;
