const {app} = require('electron');
const storage = require('electron-json-storage');
const uuid = require('uuid');
const debug = require('debug')('extensions-provider');
const fs = require('fs');
const basename = require('path').basename;
const pathjoin = require('path').join;
const lsDir = require('../util/lsdir');

//Bootstrap code, should be added if not found
const loadExtensions = function(path) {
	debug('Loading extensions from ' + path);
	if (!fs.existsSync(path)) {
		return {};
	}
	//Load files
	let files = lsDir(path, false);
	let dirs = files.filter((file) => {
		let stat = fs.statSync(file);
		return (stat && stat.isDirectory())
	});
	let extensions = {};
	for (let dir of dirs) {
		let dirname = basename(dir);
		if (dirname != "bin" && dirname != "node_modules") {
			extensions[dirname] = require(dir);
		}
	}
	
	return extensions;
};

let provider = {
	loadExtensions: function() {
		let userExtensions = loadExtensions(pathjoin(app.getPath('userData'), 'extensions'));
		let bundledExtensions = loadExtensions(pathjoin(app.getAppPath(), 'extensions'));
		
		return Object.assign(bundledExtensions, userExtensions);
	},
};

module.exports = provider;