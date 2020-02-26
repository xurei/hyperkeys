import React from 'react'; //eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MainView from './react-view-main';
import store from './store';

import './assets/font-awesome.min.css';
import './assets/bootstrap.min.css';
import './assets/style.css';

window.addEventListener("DOMContentLoaded", function() {
	//Rendering the UI
	ReactDOM.render(
		<Provider store={store}>
			<MainView/>
		</Provider>,
		document.getElementById('content')
	);
	
	//TODO fadeout of the loading view
	var loadingView = document.getElementById('loading-view');
	loadingView.style.display = "none";
});
