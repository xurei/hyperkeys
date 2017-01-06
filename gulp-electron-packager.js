var through = require('through2');
var electron = require('electron-packager');
var util = require('gulp-util');

module.exports = function (opts) {
	
	var bufferContents = function (file, enc, cb) {
		return cb();
	};
	
	var endStream = function (callback) {
		
		electron(opts, function done(err, appPath) {
			if (err) {
				util.log(err)
			}
			else {
				util.log('Built', util.colors.cyan(opts.name), util.colors.magenta('v' + opts.appVersion))
				util.log('Packaged to: ');
				for (var i = 0; i < appPath.length; i++) {
					
					util.log('            ', util.colors.cyan(appPath[i]));
				}
			}
			return callback();
		});
	};
	
	return through.obj(bufferContents, endStream);
	
};