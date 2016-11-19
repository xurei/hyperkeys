const {app, BrowserWindow, globalShortcut, clipboard, Menu, Tray} = require('electron');
const ipc = require("electron").ipcMain;
const {exec} = require('child_process');
const debug = require('debug')('app');
//----------------------------------------------------------------------------------------------------------------------

const platform = require('./util/platform');
const keybindsProvider = require('./providers/keybinds-provider');
const keybindsService = require('./services/keybinds-service');
//----------------------------------------------------------------------------------------------------------------------

const actions = require('./actions/index');
debug(actions);
//----------------------------------------------------------------------------------------------------------------------

function toggleWindow() {
	if (window_open && window_focus) {
		mainWindow.hide();
		window_open = false;
	}
	else {
		if (!window_open) {
			mainWindow.show();
			mainWindow.restore();
			mainWindow.webContents.send('openWindow', {"APPPATH": APPPATH});
		}
		window_open = true;
		mainWindow.focus();
		
		//LINUX - force focus on the window, even if Gnome Shell is messing up with the focus
		if (platform.isLinux)
			exec('wmctrl -v -F -a "Snippr"', function callback(error, stdout, stderr) {
			});
	}
}
//----------------------------------------------------------------------------------------------------------------------

debug("platform:", platform.name);
const APPPATH = __dirname;
debug("APPPATH:", APPPATH);
var DIRSEP = "/";
if (platform.isWin)
	DIRSEP = "\\";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

var window_open = false;
var window_focus = false;
var appIcon = null;
//----------------------------------------------------------------------------------------------------------------------

var App = {
	ready: () => {
		if (platform.isWin || platform.isLinux) {
			appIcon = new Tray(APPPATH + DIRSEP + 'icon.png');
			var contextMenu = Menu.buildFromTemplate([
				{label: 'Show', click: toggleWindow},
				{label: 'Exit', click: App.exit}
			]);
			appIcon.setContextMenu(contextMenu);
			appIcon.setToolTip('Snippr | Press ALT+S to open');
			appIcon.on('double-clicked', toggleWindow);
			appIcon.on('clicked', toggleWindow);
		}
		
		// Create the browser window.
		mainWindow = new BrowserWindow({width: 800, height: 600, show: false});
		mainWindow.setMenu(null);
		// and load the index.html of the app
		mainWindow.loadURL('file://' + __dirname + '/index.html');
		
		//mainWindow.openDevTools();
		
		
		keybindsProvider.getKeybinds()
		.then(keybinds => {
			for (let keybind of keybinds) {
				keybindsService.registerKey(keybind);
			}
		});
		
		ipc.on('login', function (event, arg) {
			
		});
		
		ipc.on('copy', function (event, arg) {
			clipboard.writeText(arg);
		});
		ipc.on('close', function (event, arg) {
			mainWindow.hide();
			window_open = false;
		});
		
		ipc.on('devtools', function (event, arg) {
			mainWindow.toggleDevTools();
		});
		
		mainWindow.on('blur', function (e) {
			window_focus = false;
		});
		mainWindow.on('focus', function (e) {
			window_focus = true;
		});
		
		// Emitted when the window is closed.
		mainWindow.on('close', function (e) {
			if (mainWindow != null) {
				mainWindow.hide();
				e.preventDefault();
				window_open = false;
				if (!ret) {
					App.exit();
				}
			}
		});
	},
	
	exit: () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
		
		//Unregister all shortcuts.
		globalShortcut.unregisterAll();
		
		//Destroy the app icon
		if (appIcon != null)
			appIcon.destroy();
		
		app.quit();
	}
};

module.exports = App;