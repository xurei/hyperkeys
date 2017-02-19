const fs = require('fs');
const path = require('path');
const lsDir = require('../util/lsdir');

let files = lsDir(__dirname, false);
let dirs = files.filter((file) => {
	let stat = fs.statSync(file);
	return (stat && stat.isDirectory())
});
let out = {};
for (let dir of dirs) {
	let basename = path.basename(dir);
	if (basename != "bin") {
		out[basename] = require(dir);
	}
}

module.exports = out;