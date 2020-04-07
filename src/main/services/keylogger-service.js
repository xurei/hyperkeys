const spawn = require('child_process').spawn;
const path = require('path');

const KeyloggerService = {
    start() {
        console.log('Start listening');
        console.log(['-jar', path.join(__dirname, '..', 'vendor', 'gkm.jar')]);
        const gkm = spawn('java', [
            '-jar', path.join(__dirname, '..', 'vendor', 'gkm.jar'),
            '-cp', path.join(__dirname, '..', 'vendor', 'JNativeHook.jar'),
        ], {
            windowsHide: true,
        });
        console.log('Started listening');
        gkm.stdout.on('error', function(data) {
            console.error('error', `${data}`);
        });
        gkm.stdout.on('data', function(data) {
            try {
                data = JSON.parse(`${data}`);
                console.log('data');
                console.log(data);
            }
            catch (e) {
            }
        });
        gkm.stderr.on('data', function(data) {
            console.error(`${data}`);
        });
    }
};

module.exports = KeyloggerService;
