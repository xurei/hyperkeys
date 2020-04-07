const {app} = require('electron');
const myapp = require('./app');

console.log('getPath', app.getPath('exe'));
console.log('getDataPath', app.getPath('userData'));

//PLATFORM DETECTION
process.on('uncaughtException', function (err) {
    console.log('EXCEPTION OCCURRED');
    console.log(err);
    app.exit();
});

app.commandLine.appendSwitch('disable-http-cache', '');

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', myapp.ready);
