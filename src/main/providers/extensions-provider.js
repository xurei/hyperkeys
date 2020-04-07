const {app} = require('electron');
const debug = require('debug')('hyperkeys-extensions-provider');
const fs = require('fs');
const path = require('path');
const basename = path.basename;
const lsDir = require('../util/lsdir');

const loadExtensions = function(basePath) {
    debug(`Loading extensions from ${  basePath}`);
    if (!fs.existsSync(basePath)) {
        return {};
    }
    //Load files
    const files = lsDir(basePath, false);
    const dirs = files.filter((file) => {
        const stat = fs.statSync(file);
        return (stat && stat.isDirectory());
    });
    const extensions = {};
    for (const dir of dirs) {
        const dirname = basename(dir);
        if (dirname !== 'bin' && dirname !== 'node_modules') {
            debug(`Loading extension ${  dir}`);
            extensions[dirname] = require(dir);
        }
    }
    debug(extensions);
    
    return extensions;
};

const provider = {
    loadExtensions: function() {
        const userExtensions = loadExtensions(path.join(app.getPath('userData'), 'hyperkeys-extensions'));
        const bundledExtensions = loadExtensions(path.join(app.getAppPath(), 'hyperkeys-extensions'));
		
        return Object.assign(bundledExtensions, userExtensions);
    },
};

module.exports = provider;
