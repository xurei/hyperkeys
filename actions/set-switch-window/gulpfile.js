var gulp = require('gulp');

const path = require('path');
const gutil = require('gulp-util');
const mkdirp = require('mkdirp');
const del = require('del');
const runSequence = require('run-sequence').use(gulp);
const spawn = require('child_process').spawn;
//------------------------------------------------------------------------------------------------------------------

var config = {};
config.dest = "bin";
config.source = "src";
config.sourceWin32 = path.join(config.source, "win32");
//------------------------------------------------------------------------------------------------------------------

function passtrough(command, args, callback) {
	console.log(command);
	console.log(args);
	var childProcess = spawn(command, args);
	
	childProcess.stdout.on('data', (data) => {
		process.stdout.write(`${data}`);
	});
	
	var errBuffer = null;
	childProcess.stderr.on('data', (data) => {
		process.stderr.write(`${data}`);
		errBuffer = "An error occured";
	});
	
	childProcess.on('close', () => {
		callback(errBuffer);
	});
}
//------------------------------------------------------------------------------------------------------------------

gulp.task('win32:compile', function (callback) {
	mkdirp(path.join(config.dest, "win32"), () => {
		passtrough("i686-w64-mingw32-g++", ["-m32", path.join(config.source ,"win32/foregroundwin.cpp"), "-o", path.join(config.dest, "win32/foregroundwin.exe")], callback);
	});
});
//------------------------------------------------------------------------------------------------------------------

gulp.task('copy', function () {
	gulp.src([path.join(config.source, '**/*'), '!' + path.join(config.source, 'win32/**/*')])
	.pipe(gulp.dest(config.dest));
});

gulp.task('clean', function () {
	return del([
		path.join(config.dest, '*'),
	]);
});
gulp.task('base', function (callback) {
	return runSequence('win32:compile', 'copy', callback);
});
//------------------------------------------------------------------------------------------------------------------

gulp.task('prod', function (callback) {
	return runSequence('clean', 'base', /*'es:lint', 'css:uglify',*/ callback);
});
gulp.task('debug', function (callback) {
	return runSequence('clean', 'base', /*'es:lint', 'css:uglify',*/ callback);
});

gulp.task('default', ['prod']);