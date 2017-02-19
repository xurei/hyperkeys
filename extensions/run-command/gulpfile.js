var gulp = require('gulp');

const path = require('path');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const sourcemaps = require('gulp-sourcemaps');
const mkdirp = require('mkdirp');
const rm = require('gulp-rimraf');
const runSequence = require('run-sequence').use(gulp);
const webpack = require('gulp-webpack');
//------------------------------------------------------------------------------------------------------------------

const config = {};
config.dest = "bin";
config.source = "src";
//------------------------------------------------------------------------------------------------------------------

gulp.task('webapp:transpile', function () {
	return gulp.src(path.join(config.source, 'configscreen.js'))
	.pipe(webpack({
		module: {
			loaders: [
				{
					loader: 'babel-loader',
					
					// Skip any files outside of your project's `src` directory
					include: [
						path.resolve(__dirname),
					],
					
					// Only run `.js` and `.jsx` files through Babel
					test: /\.jsx?$/,
					
					// Options to configure babel with
					query: {
						//plugins: ['transform-runtime','transform-class-properties'],
						presets: ['es2015', 'react'],
					}
				},
			],
		},
		
		output: {
			filename: 'configscreen.js'
		},
	}))
	.pipe(gulp.dest(config.dest));
});

gulp.task('webapp:browserify', function () {
	// Single entry point to browserify
	gulp.src(path.join(config.source, 'configscreen.js'))
	.pipe(browserify({
		debug: true,
		insertGlobals: true
	}))
	.pipe(gulp.dest(config.dest))
});
//------------------------------------------------------------------------------------------------------------------

gulp.task('copy', function () {
	gulp.src([path.join(config.source, 'index.js'), path.join(config.source, 'action-run-command.js'), path.join(config.source, 'configscreen.html')])
	.pipe(gulp.dest(config.dest));
});

gulp.task('clean', function () {
	return gulp.src([
		path.join(config.dest, '*')
	])
	.pipe(rm());
});

gulp.task('base', function (callback) {
	return runSequence('copy', 'webapp:transpile', /*'webapp:browserify', */callback);
});
//------------------------------------------------------------------------------------------------------------------

gulp.task('prod', function (callback) {
	return runSequence('clean', 'base', /*'es:lint', 'css:uglify',*/ callback);
});
gulp.task('debug', function (callback) {
	return runSequence('clean', 'base', /*'es:lint', 'css:uglify',*/ callback);
});

gulp.task('default', ['prod']);