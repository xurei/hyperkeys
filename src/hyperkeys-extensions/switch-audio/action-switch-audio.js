const exec = require('child_process').exec;
const path = require('path');
const debug = require('debug')(`hyperkeys-${path.basename(__dirname)}`);
const NotificationService = require('hyperkeys-api').NotificationService;

function getAudioSinks() {
    return new Promise((resolve, reject) => {
        exec('pactl list sinks', {}, (err, stdout, stderr) => {
            // TODO handle errors
            const output = `${stdout}`.split('\n');
            const sinks = [];
            let curSink = {};
            output.forEach(line => {
                line = line.trim();
                if (line.startsWith('Sink #')) {
                    sinks.push(curSink);
                    curSink = {
                        index: line.substring(6),
                    };
                }
                /*else if (line.startsWith('* index:')) {
                    sinks.push(curSink);
                    curSink = {
                        index: line.substring(9),
                    };
                }*/
                else if (line.startsWith('State: RUNNING')) {
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
                        index: line.substring(7),
                    };
                }
                else if (line.startsWith('* index:')) {
                    inputs.push(curInput);
                    curInput = {
                        index: line.substring(9),
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
    name: 'SWITCH_AUDIO',
    factory: function(action) {
        return {
            execute: () => {
                const command = action.config.command;
                debug('Switching audio', command);
                return Promise.all([getAudioSinks()/*, getSinkInputs()*/])
                .then(([sinks, inputs]) => {
                    debug('Sinks:');
                    debug(sinks);
					
                    const activeIndex = sinks.findIndex(sink => sink.active);
                    const newActiveSink = sinks[(activeIndex+1) % sinks.length];
                    debug(`Active Sink: ${activeIndex}`);
					
                    exec(`pactl set-default-sink ${newActiveSink.index}`, {}, (err,stderr,stdout) => {
                        debug(stderr);
                        debug(stdout);
                    });
                    /*inputs.forEach((sinkInput) => {
                        exec(`pacmd move-sink-input ${sinkInput.index} ${newActiveSink.index}`, {}, (err,stderr,stdout) => {
                            debug(stderr);
                            debug(stdout);
                        });
                    });*/
					
                    NotificationService.notify({
                        title: 'Audio switch',
                        message: `Switched to ${newActiveSink.name}`,
                        timeout: 3,
                    });
                    return;
                });
            },
        };
    },
};
