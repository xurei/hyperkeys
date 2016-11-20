const React = require ("react");
const ReactDOM = require ("react-dom");
const Provider = require('react-redux').Provider;
const MainView = require("./react-view-main");
const store = require('./store');

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