const process = require('process');
const spawn = require('child_process').spawn;
const gutil = require('gulp-util');
const indentStream = require('indent-stream');

var subs = {};

function spawnProcess(command, args) {
	return new Promise((resolve, reject) => {
		var childProcess = spawn(command, args);
		var errBuffer = null;
		
		childProcess.stdout.pipe(indentStream("           ")).on('data', (data) => process.stdout.write(`${data}`));
		childProcess.stderr.pipe(indentStream("           ")).on('data', (data) => process.stdout.write(`${data}`));
		
		childProcess.on('close', (code) => {
			if (errBuffer == null) {
				resolve(code);
			}
			else {
				reject(new Error(errBuffer));
			}
		});
	});
}

var gulpSub = function(gulp) {
	var out = {
		register: function(name, path) {
			subs[name] = path;
		},
		
		run: function(name, tasks, callback) {
			if (Array.isArray(name)) {
				if (name.length == 0) {
					callback(null);
				}
				else {
					var first = name[0];
					out.run(first, tasks, (errBuffer) => {
						if (errBuffer != null) {
							callback(errBuffer);
						}
						else {
							out.run(name.slice(1), tasks, callback);
						}
					});
				}
			}
			else {
				if (Array.isArray(tasks)) {
					tasks = tasks.join(' ');
				}
				
				var t0 = new Date().getTime();
				gutil.log('Running submodule ' + gutil.colors.cyan(name) + ' (' + gutil.colors.cyan(tasks) + ')');
				spawnProcess('gulp', ['--color', '--gulpfile', subs[name], tasks])
				.then(() => {
					var t1 = new Date().getTime();
					gutil.log('Submodule ' + gutil.colors.cyan(name) + ' (' + gutil.colors.cyan(tasks) + ')' + ` ran without error ` + gutil.colors.magenta((t1-t0)+' ms'));
					callback();
				})
				.catch((e) => {
					var t1 = new Date().getTime();
					gutil.log('ERROR IN Submodule ' + gutil.colors.cyan(name) + ' (' + gutil.colors.cyan(tasks) + ') ' + gutil.colors.magenta((t1-t0)+' ms'));
					gutil.log(e);
					callback();
				});
			}
		}
	};
	
	return out;
};

module.exports = gulpSub;