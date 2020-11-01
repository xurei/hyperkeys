import React from 'react'; //eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MainView from './react-view-main';
import store from './store';

import './assets/font-awesome.min.css';
import './assets/bootstrap.min.css';
import './assets/style.scss';
import { setLatestRelease, setMacros, setMetadatas } from './actions';

const document = global.document;
const ipc = global.ipc;

function addModule(path) {
    var script = document.createElement('SCRIPT');
    script.src = path;
    document.body.appendChild(script);
}

global.addEventListener('DOMContentLoaded', function() {
    ipc.on('metadatas', (event, metadatas) => {
        console.log('Got metadatas', metadatas);
		
        Object.keys(metadatas).forEach((key) => {
            const metadata = metadatas[key];
            if (metadata.configScreen) {
                addModule(`${metadata.directory}/configscreen.js`);
            }
        });
		
        store.dispatch(setMetadatas(metadatas));
        ipc.send('request_macros');
    });
    ipc.on('latest_version', (event, release) => {
        console.log('Latest version:', release.tag_name);
        console.log('URL:', release.html_url);
        store.dispatch(setLatestRelease(release));
    });
    ipc.on('macros', (event, arg) => {
        console.log('Got macros', arg);
        store.dispatch(setMacros(arg));
		
        //Rendering the UI
        setTimeout(() => {
            ReactDOM.render(
                <Provider store={store}>
                    <MainView/>
                </Provider>,
                document.getElementById('content'),
            );
			
            //TODO fadeout of the loading view
            var loadingView = document.getElementById('loading-view');
            loadingView.style.display = 'none';
        }, 200);
    });
    ipc.send('request_metadatas');
});
