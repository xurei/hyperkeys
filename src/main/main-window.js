const {BrowserWindow} = require('electron');
const path = require('path');

// Create the browser window.
const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
        nodeIntegration: true
    },
});
mainWindow.setMenu(null);
mainWindow.setTitle('Hyperkeys');
// and load the index.html of the app
mainWindow.loadURL('file://' + __dirname + '/index.html');

// Emitted when the window is closed.
mainWindow.on('close', function (e) {
    if (mainWindow !== null) {
        e.preventDefault();
        mainWindow.hide();
    }
});

module.exports = mainWindow;
