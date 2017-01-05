const {app} = require('electron');
const storage = require('electron-json-storage');
const uuid = require('uuid');
const debug = require('debug')('extensions-provider');
const fs = require('fs');
const basename = require('path').basename;
const pathjoin = require('path').join;
const xutil = require('xurei-util');

//TODO default macros if none found

//Bootstrap code, should be added if not found

var provider = {
	loadExtensions: function() {
		var path = pathjoin(app.getPath('userData'), 'extensions');
		
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
	},
};

module.exports = provider;