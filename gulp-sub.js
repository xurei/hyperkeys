const process = require('process');
const spawn = require('child_process').spawn;
const gutil = require('gulp-util');

var subs = {};

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
				
				var errBuffer = null;
				
				var childProcess = spawn('gulp', ['--color', '--gulpfile', subs[name], tasks]);
				
				console.log("\n");
				gutil.log('Running submodule ' + name + ' (' + tasks + ')');
				
				childProcess.stdout.on('data', (data) => {
					process.stdout.write(`${data}`);
				});
				
				childProcess.stderr.on('data', (data) => {
					process.stderr.write(`${data}`);
					errBuffer = "An error occured";
				});
				
				childProcess.on('close', (code) => {
					gutil.log('Submodule ' + name + ' (' + tasks + ')' + ` exited with code ${code}`);
					console.log("");
					callback(errBuffer);
				});
			}
		}
	};
	
	return out;
};

module.exports = gulpSub;