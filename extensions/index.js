const fs = require('fs');
const path = require('path');
const xutil = require('xurei-util');

var files = xutil.lsDir(__dirname, false);
var dirs = files.filter((file) => {
	var stat = fs.statSync(file);
	return (stat && stat.isDirectory())
});
var out = {};
for (let dir of dirs) {
	var basename = path.basename(dir);
	if (basename != "bin") {
		out[basename] = require(dir);
	}
}

module.exports = out;