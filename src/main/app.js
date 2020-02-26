const {app, globalShortcut, Menu, Tray} = require('electron');
const debug = require('debug')('hyperkeys-app');
const ipcService = require('./ipc');
//----------------------------------------------------------------------------------------------------------------------

const HKAPI = require('hyperkeys-api');
const platform = HKAPI.platform;
const uuid = require('uuid').v4;
const notifier = require('node-notifier');
const path = require('path');
//----------------------------------------------------------------------------------------------------------------------

debug("platform:", platform.name);
const APPPATH = __dirname;
debug("APPPATH:", APPPATH);
//----------------------------------------------------------------------------------------------------------------------

let DIRSEP = "/";
if (platform.isWin)
	DIRSEP = "\\";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
let mainWindow = null;

let window_open = false;
let appIcon = null;
//----------------------------------------------------------------------------------------------------------------------

let App = {
	ready: () => {
		mainWindow = require('./main-window');
		
		ipcService.start(app);
		
		function toggleWindow() {
			mainWindow.show();
		}
		
		if (platform.isWin || platform.isLinux) {
			console.log(APPPATH + DIRSEP + 'icon.png');
			appIcon = new Tray(APPPATH + DIRSEP + 'icon.png');
			let contextMenu = Menu.buildFromTemplate([
				{label: 'Show', click: toggleWindow},
				{label: 'Exit', click: App.exit}
			]);
			appIcon.setContextMenu(contextMenu);
			appIcon.setToolTip('Hyperkeys');
			appIcon.on('double-click', toggleWindow);
			appIcon.on('click', toggleWindow);
		}
		
		//TODO remove this toggleWindow()
		toggleWindow();
	},
	
	exit: () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
		
		//Unregister all shortcuts.
		globalShortcut.unregisterAll();
		
		//Destroy the app icon
		if (appIcon != null) {
			appIcon.destroy();
		}
		
		app.quit();
		app.exit(0);
	}
};

module.exports = App;
