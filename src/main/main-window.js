const {BrowserWindow} = require('electron');
const path = require('path');
const releasesProvider = require('./providers/releases-provider');
const semver = require('semver');
//noinspection JSFileReferences
const pkg = require('./package.json');

// Create the browser window.
const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    icon: path.join(__dirname, '300x300.png'),
    webPreferences: {
        nodeIntegration: true,
    },
});
mainWindow.setMenu(null);
mainWindow.setTitle('Hyperkeys');
// and load the index.html of the app
mainWindow.loadURL(`file://${  __dirname  }/index.html`);

mainWindow.on('show', function(e) {
    releasesProvider.loadLatestRelease()
    .then((release) => {
        console.log(`Latest release: ${release.tag_name} vs ${pkg.version}`);
        if (semver.gt(release.tag_name.substring(1), pkg.version)) {
            release.new_version = true;
            console.log(`NEW VERSION ${release.tag_name}`);
        }
        mainWindow.webContents.send('latest_version', release);
        return;
    })
    .catch(e => {
        console.error(e);
    });
});

// Emitted when the window is closed.
mainWindow.on('close', function(e) {
    if (mainWindow !== null) {
        e.preventDefault();
        mainWindow.hide();
    }
});

module.exports = mainWindow;
