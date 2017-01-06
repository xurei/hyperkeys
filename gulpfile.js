var gulp = require('gulp');

const runSequence = require('run-sequence').use(gulp);
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const eslint = require('gulp-eslint');
const path = require('path');
const rm = require('gulp-rimraf');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const exec = require('gulp-exec');
const browserify = require('gulp-browserify');
const install = require('gulp-install');
const fs = require('fs');
const electron = require('./gulp-electron-packager');

const gulpSub = require('./gulp-sub')(gulp);
//----------------------------------------------------------------------------------------------------------------------

var config = {};

config.source = "src";
config.dest = "bin";
config.distr = "distr2";
//----------------------------------------------------------------------------------------------------------------------

gulpSub.register("electron", path.join(__dirname, "electron/gulpfile.js"));
gulpSub.register("extensions", path.join(__dirname, "extensions/gulpfile.js"));
//----------------------------------------------------------------------------------------------------------------------

gulp.task('clean', function () {
	return gulp.src(path.join(config.dest, '*'))
	.pipe(rm());
});
gulp.task('base', function (callback) {
	return runSequence('package.json', 'npm', callback);
});
gulp.task('npm', ['package.json'], function () {
	return gulp.src(path.join(config.dest, '*'))
	.pipe(install({production: true}));
});
gulp.task('electron:copy', function () {
	return gulp.src(path.join(__dirname, "electron/bin/**/*"))
	.pipe(gulp.dest(config.dest));
});
gulp.task('extensions:copy', function () {
	return gulp.src(path.join(__dirname, "extensions/bin/**/*"))
	.pipe(gulp.dest(path.join(config.dest, 'extensions')));
});
gulp.task('package.json', function () {
	//Clean package.json from its devDependencies and write it in the bin
	function string_src(filename, string) {
		var src = require('stream').Readable({ objectMode: true })
		src._read = function () {
			this.push(new gutil.File({
				cwd: "",
				base: "",
				path: filename,
				contents: new Buffer(string)
			}));
			this.push(null)
		};
		return src
	}
	var json = JSON.parse(fs.readFileSync('./package.json'));
	delete json.devDependencies;
	delete json.scripts;
	
	return string_src("package.json", JSON.stringify(json,null,'\t'))
	.pipe(gulp.dest(config.dest));
});

gulp.task('assemble', ['electron:copy', 'extensions:copy']);
//----------------------------------------------------------------------------------------------------------------------

gulp.task('debug', function (callback) {
	return runSequence('base', () => {
		return gulpSub.run(["electron", "extensions"], "debug", () => {
			return runSequence('assemble', (e) => {
				callback(e);
				gutil.log('----------------------------------------------------------');
			})
		});
	});
});
gulp.task('prod', function (callback) {
	return runSequence('clean', 'base', () => {
		return gulpSub.run(["electron", "extensions"], "prod", () => {
			return runSequence('assemble', (e) => {
				callback(e);
				gutil.log('----------------------------------------------------------');
			})
		});
	});
});
//----------------------------------------------------------------------------------------------------------------------

gulp.task('distr:clean', [], function(callback) {
	return gulp.src(path.join(config.distr, '*'))
	.pipe(rm());
});

gulp.task('distr:linux', ['distr:clean', 'prod', 'npm'], function(callback) {
	gutil.log('DISTR LINUX');
	//FIXME I don't know why but the files are apparently not written right after prod... I've put a setTimeout of one second to fix that, but I should investigate this
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			gutil.log('AAA----------------------------------------------------------');
			
			var packageJson = JSON.parse(fs.readFileSync(path.join(config.dest, 'package.json')));
			
			gulp.src('')
			.pipe(electron({
				dir: path.join(__dirname, config.dest),
				out: path.join(__dirname, config.distr),
				platform: "linux",
				arch: 'ia32'
			}))
			.pipe(gulp.dest(''));
			
			gulp.src('')
			.pipe(electron({
				dir: path.join(__dirname, config.dest),
				out: path.join(__dirname, config.distr),
				platform: "linux",
				arch: 'x64'
			}))
			.pipe(gulp.dest(''));
			
			resolve();
			
			//gulp.src(path.join(__dirname, config.dest, "**/*"))
			//.pipe(gulp.dest(path.join(__dirname, config.distr, 'linux')));
			//resolve();
		}, 1000);
	});
});

gulp.task('distr:windows', ['distr:clean', 'prod', 'npm'], function(callback) {
	gutil.log('DISTR WINDOWS');
	////FIXME I don't know why but the files are apparently not written right after prod... I've put a setTimeout of one second to fix that, but I should investigate this
	//return new Promise((resolve, reject) => {
	//	setTimeout(() => {
	//		gutil.log('AAA----------------------------------------------------------');
	//		gulp.src(path.join(__dirname, config.dest, "**/*"))
	//		.pipe(debug())
	//		.pipe(gulp.dest(path.join(__dirname, config.distr)));
	//		resolve();
	//	}, 1000);
	//});
});

gulp.task('distr', ['distr:clean', 'distr:linux', 'distr:windows']);
//----------------------------------------------------------------------------------------------------------------------

gulp.task('default', ['prod']);
gulp.task('watch', ['debug'], function () {
	var watcher = gulp.watch(['electron/**/*', 'extensions/**/*', '!**/bin/**/*', '!**/build/**/*', '!distr/**/*', '!distr*/**/*'], ['debug']);
	watcher.on('change', function (event) {
		gutil.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
});