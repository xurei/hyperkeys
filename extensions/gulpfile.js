var gulp = require('gulp');

const path = require('path');
const fs = require('fs');
const del = require('del');
const runSequence = require('run-sequence').use(gulp);
const xutil = require('xurei-util');
const mkdirp = require('mkdirp');

const gulpSub = require('../gulp-sub')(gulp);
//------------------------------------------------------------------------------------------------------------------

var config = {};
config.dest = "bin";
//------------------------------------------------------------------------------------------------------------------

var subs = [];

var ls = xutil.lsDir(__dirname, false);
var dirs = ls.filter((file) => {
	var stat = fs.statSync(file);
	return (stat && stat.isDirectory())
});

for (let dir of dirs) {
	var gulpFile = path.join(dir, 'gulpfile.js');
	try {
		fs.accessSync(gulpFile, fs.constants.R_OK);
		gulpSub.register(path.basename(dir), gulpFile);
		subs.push(path.basename(dir));
	}
	catch (e) {
		/* nothing */
	}
}
//------------------------------------------------------------------------------------------------------------------

gulp.task('submodules:copy', function () {
	for (let sub of subs) {
		gulp.src(sub + '/' + config.dest + '/**/*')
		.pipe(gulp.dest(path.join(config.dest, sub)))
	}
	gulp.src(['*.js', '!gulpfile.js'])
	.pipe(gulp.dest(config.dest))
});

gulp.task('clean', function () {
	return del([
		path.join(config.dest, '*')
	]);
});
gulp.task('base', function (callback) {
	return mkdirp(config.dest, () => {
		return runSequence('submodules:copy', callback);
	});
});
//------------------------------------------------------------------------------------------------------------------

gulp.task('prod', function (callback) {
	return gulpSub.run(subs, "prod", () => {
		return runSequence('submodules:copy', callback)
		return runSequence('clean', 'base', /*'es:lint', 'css:uglify',*/ callback);
	})
});
gulp.task('debug', function (callback) {
	return gulpSub.run(subs, "debug", () => {
		return runSequence('clean', 'base', /*'es:lint', 'css:uglify',*/ callback);
	})
});

gulp.task('default', ['prod']);