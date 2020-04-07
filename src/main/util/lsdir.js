const fs = require('fs');
const path = require('path');
const xutil = require('xurei-util');
const isset = xutil.isset;

const lsDir = function(dir, recursive) {
    if (!isset(recursive)) {
        recursive = true;
    }
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        const stat = fs.statSync(path.join(dir, file));
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
