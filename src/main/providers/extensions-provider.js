const {app} = require('electron');
const debug = require('debug')('hyperkeys-extensions-provider');
const fs = require('fs');
const path = require('path');
const basename = path.basename;
const lsDir = require('../util/lsdir');

const loadExtensions = function(basePath) {
	debug('Loading extensions from ' + basePath);
	if (!fs.existsSync(basePath)) {
		return {};
	}
	//Load files
	let files = lsDir(basePath, false);
	let dirs = files.filter((file) => {
		let stat = fs.statSync(file);
		return (stat && stat.isDirectory());
	});
	let extensions = {};
	for (let dir of dirs) {
		let dirname = basename(dir);
		if (dirname !== 'bin' && dirname !== 'node_modules') {
			debug('Loading extension ' + dir);
			extensions[dirname] = require(dir);
		}
	}
	debug(extensions);
	
	return extensions;
};

let provider = {
	loadExtensions: function() {
		let userExtensions = loadExtensions(path.join(app.getPath('userData'), 'extensions'));
		let bundledExtensions = loadExtensions(path.join(app.getAppPath(), 'extensions'));
		
		return Object.assign(bundledExtensions, userExtensions);
	},
};

module.exports = provider;
