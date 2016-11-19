const debug = require('debug')('actions');
const fs = require('fs');
const path = require('path');
const actionsService = require('../services/actions-service');

var walk = function(dir) {
	var results = [];
	var list = fs.readdirSync(dir);
	list.forEach(function(file) {
		var stat = fs.statSync(dir + '/' + file);
		if (stat && stat.isDirectory()) {
			results = results.concat(walk(dir + '/' + file));
		}
		else {
			results.push(dir + '/' + file);
		}
	});
	return results;
};

var files = walk(__dirname);
var out = {};
for (let file of files) {
	var basename = path.basename(file, '.js');
	if (basename != "index") {
		out[basename] = require(file);
		actionsService.registerActionFactory(out[basename].name, out[basename].factory);
	}
}

module.exports = out;