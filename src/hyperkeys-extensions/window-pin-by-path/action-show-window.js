const exec = require('child_process').exec;
const path = require('path');
const spawn = require('child_process').spawn;
const NotificationService = require('hyperkeys-api').NotificationService;
const platform = require('hyperkeys-api').platform;

const debug = require('debug')(`hyperkeys-${path.basename(__dirname)}`);

function listProcessesByPID() {
    //TODO windows and mac versions
    
    return new Promise((resolve, reject) => {
        const out = {};
        
        exec(`ps -e -o pid=,cmd=`, function callback(error, stdout, stderr) {
            if (!error) {
                stdout.split('\n')
                .map(l => l.trim().split(/ +/))
                .forEach((a) => {
                    out[parseInt(a[0])] = a.slice(1).join(' ');
                });
                
                resolve(out);
            } else {
                reject(error);
            }
        });
    });
}

function listWindows() {
    //TODO windows and mac versions
    
    return new Promise((resolve, reject) => {
        exec(`${__dirname}/../../natives/linux/wmctrl -l -p`, function callback(error, stdout, stderr) {
            if (!error) {
                const lines = stdout.split('\n').map(l => l.trim().split(/ +/)).map(a => ({wid: a[0], pid: a[2]}));
                resolve(lines);
            } else {
                reject(error);
            }
        });
    });
}


module.exports = {
    name: 'SHOW_WINDOW_PIN_BY_PATH',
    factory: function(action) {
        const onError = (e) => {
            NotificationService.notify({
                'title': 'Run command',
                'message': `Couldn't run '${action.config.command}'`,
            });
        };
        
        return {
            execute: () => {
                if (action.config.path && action.config.path !== '') {
                    try {
                        let command;
                        if (platform.isLinux) {
                            command = async() => {
                                const processes = await listProcessesByPID();
                                const /* Array */ windows = await listWindows();
                                
                                windows.forEach(p => {
                                    console.log('WIN', p.pid, ' -> ', p.wid);
                                });
                                
                                const matcher = new RegExp(action.config.path);
                                const matchingWindow = windows.find(w => {
                                    const process = processes[parseInt(w.pid)];
                                    if (process) {
                                        return process.match(matcher);
                                    }
                                });
                                
                                //const matchingprocesses.
                                
                                if (matchingWindow) {
                                    debug(`Window found ${JSON.stringify(matchingWindow, null, '  ')}`);
                                    await new Promise((resolve, reject) => {
                                        exec(`${__dirname}/../../natives/linux/wmctrl -i -a "${matchingWindow.wid}"`, function callback(error, stdout, stderr) {
                                            if (!error) {
                                                resolve();
                                            }
                                            else {
                                                reject(error);
                                            }
                                        });
                                    });
                                }
                                else {
                                    debug(`Window not found, starting the process`);
                                    const child = spawn(action.config.path, {
                                        detached: true,
                                        shell: true,
                                    });
                                    child.on('error', onError);
                                }
                            };
                        }
                        else if (platform.isWin) {
                            // TODO !
                            
                            // const asfw = require('asfw').SetForegroundWindowByName;
                            // command = () => new Promise((resolve, reject) => {
                            //     asfw(action.config.path);
                            //     resolve();
                            // });
                        }
        
                        command().catch(onError);
                    }
                    catch (e) {
                        onError(e);
                    }
                }
                else {
                    debug('No title mapped to this action');
                }
            },
        };
    },
};
