const {BrowserWindow} = require('electron');

// Create the browser window.
const OptionWindow = function(parentWindow, opts) {
	
	let config = Object.assign({width: 1024, height: 768}, opts, {parent: parentWindow, modal: true, show: true});
	
	const out = new BrowserWindow(config);
	out.setMenu(null);
	out.setTitle('Hyperkeys');
	return out;
};

module.exports = OptionWindow;