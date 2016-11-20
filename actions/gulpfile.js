var gulp = require('gulp');

const path = require('path');
const fs = require('fs');
const del = require('del');
const runSequence = require('run-sequence').use(gulp);
const xutil = require('xurei-util');

const gulpSub = require('../gulp-sub')(gulp);
//------------------------------------------------------------------------------------------------------------------

var config = {};
config.dest = "bin";
config.source = "src";
//------------------------------------------------------------------------------------------------------------------

var subs = [];

var ls = xutil.lsDir(__dirname, false);
for (let file of ls) {
	var stat = fs.statSync(file);
	if (stat && stat.isDirectory()) {
		var gulpFile = path.join(file, 'gulpfile.js');
		console.log(gulpFile);
		try {
			fs.accessSync(gulpFile, fs.constants.R_OK);
			gulpSub.register(path.basename(file), gulpFile);
			subs.push(path.basename(file));
		}
		catch (e) {
			/* nothing */
		}
	}
}
console.log(subs);
//------------------------------------------------------------------------------------------------------------------

gulp.task('copy', function () {
	gulp.src([path.join(config.source, '**/*'), '!' + path.join(config.source, 'webapp/**')])
	.pipe(gulp.dest(config.dest))
});

gulp.task('clean', function () {
	return del([
		path.join(config.dest, '*')
	]);
});
gulp.task('base', function (callback) {
	return runSequence('copy', callback);
});
//------------------------------------------------------------------------------------------------------------------

gulp.task('prod', function (callback) {
	return gulpSub.run(subs, "prod", () => {
		return runSequence('clean', 'base', /*'es:lint', 'css:uglify',*/ callback);
	})
});
gulp.task('debug', function (callback) {
	return gulpSub.run(subs, "debug", () => {
		return runSequence('clean', 'base', /*'es:lint', 'css:uglify',*/ callback);
	})
});

gulp.task('default', ['prod']);