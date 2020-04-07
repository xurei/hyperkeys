const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const debug = require('debug')('hyperkeys-action-switch-audio');
const notifier = require('node-notifier');

function getAudioSinks() {
	return new Promise((resolve, reject) => {
		exec('pacmd list-sinks', {}, (err, stdout, stderr) => {
			// TODO handle errors
			const output = `${stdout}`.split('\n');
			const sinks = [];
			let curSink = {};
			output.forEach(line => {
				line = line.trim();
				//console.log(line);
				if (line.startsWith('index:')) {
					sinks.push(curSink);
					curSink = {
						index: line.substring(7)
					};
				}
				else if (line.startsWith('* index:')) {
					sinks.push(curSink);
					curSink = {
						index: line.substring(9)
					};
				}
				else if (line.startsWith('state: RUNNING')) {
					curSink.active = true;
				}
				else if (line.startsWith('alsa.card_name =')) {
					curSink.name = line.substring(18, line.length-1);
				}
			});
			sinks.push(curSink);
			sinks.shift();
			
			resolve(sinks);
		});
	});
}

function getSinkInputs() {
	return new Promise((resolve, reject) => {
		exec('pacmd list-sink-inputs', {}, (err, stdout, stderr) => {
			// TODO handle errors
			const output = `${stdout}`.split('\n');
			const inputs = [];
			let curInput = {};
			output.forEach(line => {
				line = line.trim();
				if (line.startsWith('index:')) {
					inputs.push(curInput);
					curInput = {
						index: line.substring(7)
					};
				}
				else if (line.startsWith('* index:')) {
					inputs.push(curInput);
					curInput = {
						index: line.substring(9)
					};
				}
				else if (line.startsWith('sink:')) {
					curInput.sink = line.substring(6);
				}
			});
			inputs.push(curInput);
			inputs.shift();
			
			resolve(inputs);
		});
	});
}

module.exports = {
	name: "SWITCH_AUDIO",
	factory: function (action) {
		return {
			execute: () => {
				let command = action.config.command;
				debug("Switching audio", command);
				Promise.all([getAudioSinks(), getSinkInputs()])
				.then(([sinks, inputs]) => {
					debug('Sinks:');
					debug(sinks);
					
					const activeIndex = sinks.findIndex(sink => sink.active);
					const newActiveSink = sinks[(activeIndex+1) % sinks.length];
					
					exec(`pacmd set-default-sink ${newActiveSink.index}`, {}, (err,stderr,stdout) => {
						console.log(stderr);
						console.log(stdout);
					});
					inputs.forEach((sinkInput) => {
						exec(`pacmd move-sink-input ${sinkInput.index} ${newActiveSink.index}`, {}, (err,stderr,stdout) => {
							console.log(stderr);
							console.log(stdout);
						});
					});
					
					notifier.notify({
						'title': 'Audio switch',
						'message': `Switched to ${newActiveSink.name}`
					});
				});
			}
		};
	}
};
