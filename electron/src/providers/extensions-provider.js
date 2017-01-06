const {app} = require('electron');
const storage = require('electron-json-storage');
const uuid = require('uuid');
const debug = require('debug')('extensions-provider');
const fs = require('fs');
const basename = require('path').basename;
const pathjoin = require('path').join;
const xutil = require('xurei-util');

//Bootstrap code, should be added if not found
const loadExtensions = function(path) {
	debug('Loading extensions from ' + path);
	if (!fs.existsSync(path)) {
		return {};
	}
	//Load files
	var files = xutil.lsDir(path, false);
	var dirs = files.filter((file) => {
		var stat = fs.statSync(file);
		return (stat && stat.isDirectory())
	});
	var extensions = {};
	for (let dir of dirs) {
		var dirname = basename(dir);
		if (dirname != "bin" && dirname != "node_modules") {
			extensions[dirname] = require(dir);
		}
	}
	
	return extensions;
};

var provider = {
	loadExtensions: function() {
		var userExtensions = loadExtensions(pathjoin(app.getPath('userData'), 'extensions'));
		var bundledExtensions = loadExtensions(pathjoin(app.getAppPath(), 'extensions'));
		
		return Object.assign(bundledExtensions, userExtensions);
	},
};

module.exports = provider;