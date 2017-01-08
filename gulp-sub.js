const process = require('process');
const spawn = require('child_process').spawn;
const gutil = require('gulp-util');

var subs = {};

function spawnProcess(command, args) {
	return new Promise((resolve, reject) => {
		var childProcess = spawn(command, args);
		var errBuffer = null;
		
		var indent = true;
		function write(data) {
			data = `${data}`;
			
			if (indent) {
				process.stdout.write("    ");
			}
			
			if (data.charAt(data.length-1) == "\n") {
				data = data.substr(0, data.length-1);
				data = data.replace("\n", "\n    ");
				data += "\n";
				indent = true;
			}
			else {
				indent = false;
			}
			process.stdout.write(data);
		}
		
		childProcess.stdout.on('data', (data) => {
			write(data);
		});
		childProcess.stderr.on('data', (data) => {
			write(data);
			errBuffer = "An error occured";
		});
		
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
				
				gutil.log('Running submodule ' + name + ' (' + tasks + ')');
				spawnProcess('gulp', ['--color', '--gulpfile', subs[name], tasks])
				.then((code) => {
					gutil.log('Submodule ' + name + ' (' + tasks + ')' + ` exited with code ${code}`);
					callback();
				})
				.catch(() => {
					gutil.log('ERROR IN Submodule ' + name + ' (' + tasks + ')');
					callback();
				});
			}
		}
	};
	
	return out;
};

module.exports = gulpSub;