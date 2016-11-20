var gulp = require('gulp');

const runSequence = require('run-sequence').use(gulp);
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const eslint = require('gulp-eslint');
const path = require('path');
const del = require('del');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const exec = require('gulp-exec');
const browserify = require('gulp-browserify');

const gulpSub = require('./gulp-sub')(gulp);
//----------------------------------------------------------------------------------------------------------------------

var config = {};

config.dest = "bin";
config.source = "src";
//----------------------------------------------------------------------------------------------------------------------

gulpSub.register("electron", path.join(__dirname, "electron/gulpfile.js"));
gulpSub.register("actions", path.join(__dirname, "actions/gulpfile.js"));
//----------------------------------------------------------------------------------------------------------------------

gulp.task('clean', function () {
	return del([
		path.join(config.dest, '*')
	]);
});
gulp.task('base', function () {
	//return runSequence('electron:base', callback);
});
gulp.task('submodules:copy', function () {
	gulp.src(path.join(__dirname, "electron/bin/**/*"))
	.pipe(gulp.dest(path.join(config.dest, 'electron')))
});
//----------------------------------------------------------------------------------------------------------------------

gulp.task('debug', function (callback) {
	return runSequence('clean', 'base', () => {
		return gulpSub.run(["electron", "actions"], "debug", () => {
			return runSequence('submodules:copy', callback)
		});
	});
});
gulp.task('prod', function (callback) {
	return runSequence('clean', 'base', () => {
		return gulpSub.run(["electron", "actions"], "prod", () => {
			return runSequence('submodules:copy', callback)
		});
	});
});

gulp.task('default', ['prod']);
gulp.task('watch', ['debug'], function () {
	var watcher = gulp.watch([path.join(config.source, '**/*'), path.join(config.source, '*')], ['debug']);
	watcher.on('change', function (event) {
		gutil.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
});