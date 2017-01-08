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
const browserify = require('gulp-browserify');
const install = require('gulp-install');
const fs = require('fs');
const electron = require('./gulp-electron-packager');
const exec = require('gulp-exec');
const merge2 = require('merge2');
const spawn = require('child_process').spawn;

const gulpSub = require('./gulp-sub')(gulp);
//----------------------------------------------------------------------------------------------------------------------

var config = {};

config.source = "src";
config.dest = "bin";
config.distr = "distr";
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
gulp.task('npm', ['package.json'], function (callback) {
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
		return src;
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
				gutil.log('----------------------------------------------------------');
				callback(e);
			})
		});
	});
});
gulp.task('prod', function (callback) {
	return runSequence('clean', 'base', () => {
		return gulpSub.run(["electron", "extensions"], "prod", () => {
			return runSequence('assemble', (e) => {
				gutil.log('----------------------------------------------------------');
				callback(e);
			})
		});
	});
});
//----------------------------------------------------------------------------------------------------------------------

gulp.task('distr:clean', [], function(callback) {
	return gulp.src(path.join(config.distr, '*'))
	.pipe(rm());
});

function package(platform, arch) {
	var json = JSON.parse(fs.readFileSync(path.join(config.dest, 'package.json')));
	
	return electron({
		dir: path.join(__dirname, config.dest),
		out: path.join(__dirname, config.distr),
		platform: platform,
		arch: arch,
		'app-version': json.version
	})
}

function spawnProcess(command, cb) {
	var childProcess = spawn(command);
	
	childProcess.stdout.on('data', (data) => {
		var lines = `${data}`.split("\n");
		for (let l of lines) {
			if (l.length > 0) gutil.log(l);
		}
	});
	childProcess.stderr.on('data', (data) => {
		var lines = `${data}`.split("\n");
		for (let l of lines) {
			if (l.length > 0) gutil.log(l);
		}
	});
	
	childProcess.on('close', (code) => {
		cb();
	});
}

gulp.task('distr:linux', ['distr:clean', 'prod'], function() {
	//FIXME I don't know why but the files are apparently not written right after prod... I've put a setTimeout of one second to fix that, but I should investigate this
	
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			spawnProcess('./create_linux_package.sh', resolve);
		}, 1000);
	});
});

gulp.task('distr:windows', ['distr:clean', 'distr:linux', 'prod'], function() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			spawnProcess('./create_win32_package.sh', resolve);
		}, 1000);
	});
});

gulp.task('distr', ['distr:clean', 'distr:linux', 'distr:windows'], function() {
});
//----------------------------------------------------------------------------------------------------------------------

gulp.task('default', ['prod']);
gulp.task('watch', ['debug'], function () {
	var watcher = gulp.watch(['electron/**/*', 'extensions/**/*', '!**/bin/**/*', '!**/build/**/*', '!distr/**/*', '!distr*/**/*'], ['debug']);
	watcher.on('change', function (event) {
		gutil.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
});