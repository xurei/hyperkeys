var gulp = require('gulp');

const path = require('path');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const del = require('del');
const runSequence = require('run-sequence').use(gulp);
//------------------------------------------------------------------------------------------------------------------

var config = {};
config.dest = "bin";
config.source = "src";
config.build = "build";
config.sourceReact = path.join(config.source, 'webapp');
config.buildReact = path.join(config.build, 'webapp');
config.destReact = path.join(config.dest, 'webapp');
//------------------------------------------------------------------------------------------------------------------

gulp.task('webapp:lint', function () {
	return gulp.src(path.join(config.sourceReact, '**/*'))
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failAfterError());
});

gulp.task('webapp:transpile', function () {
	return gulp.src(path.join(config.sourceReact, '**/*'))
	.pipe(sourcemaps.init())
	.pipe(babel({
		presets: ['es2015', "react"]
	}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(config.buildReact));
});

gulp.task('webapp:browserify', function () {
	// Single entry point to browserify
	gulp.src(path.join(config.buildReact, '/webapp.js'))
	.pipe(browserify({
		debug: true,
		insertGlobals: true
	}))
	.pipe(gulp.dest(config.dest))
});

gulp.task('copy', function () {
	gulp.src([path.join(config.source, '**/*'), '!' + path.join(config.source, 'webapp/**')])
	.pipe(gulp.dest(config.dest))
});

gulp.task('clean', function () {
	return del([
		path.join(config.dest, '*'),
		path.join(config.build, '*')
	]);
});
gulp.task('base', function (callback) {
	return runSequence('copy', 'webapp:transpile', 'webapp:browserify', callback);
});
//------------------------------------------------------------------------------------------------------------------

gulp.task('prod', function (callback) {
	return runSequence('clean', 'base', /*'es:lint', 'css:uglify',*/ callback);
});
gulp.task('debug', function (callback) {
	return runSequence('clean', 'base', /*'es:lint', 'css:uglify',*/ callback);
});

gulp.task('default', ['prod']);