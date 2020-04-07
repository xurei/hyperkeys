const {BrowserWindow} = require('electron');

// Create the browser window.
const OptionWindow = function(parentWindow, opts) {
    
    const config = Object.assign({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
        },
    },
    opts,
    {
        parent: parentWindow,
        modal: true,
        show: true,
    });
    
    const out = new BrowserWindow(config);
    out.setMenu(null);
    out.setTitle('Hyperkeys');
    out.webContents.openDevTools();
    return out;
};

module.exports = OptionWindow;
