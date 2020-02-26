const fs = require('fs');
const path = require('path');
const xutil = require('xurei-util');
let isset = xutil.isset;

let lsDir = function(dir, recursive) {
	if (!isset(recursive)) {
		recursive = true;
	}
	let results = [];
	let list = fs.readdirSync(dir);
	list.forEach(function(file) {
		let stat = fs.statSync(path.join(dir, file));
		if (stat && stat.isDirectory()) {
			if (recursive) {
				results = results.concat(lsDir(path.join(dir, file)));
			}
			else {
				results.push(path.join(dir, file));
			}
		}
		else {
			results.push(path.join(dir, file));
		}
	});
	return results;
};

module.exports = lsDir;