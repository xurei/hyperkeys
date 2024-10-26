module.exports = {
    actions: [
        require('./action-switch-audio'),
    ],
    platforms: ['linux'],
    metadata: {
        name: 'SWITCH_AUDIO',
        title: 'Switch audio output',
        description: 'Switch between your audio outputs. Works with PipeWire and PulseAudio. You need pactl to make it work (on Ubuntu/Debian: apt install pulseaudio-utils)',
        actions: {
            SWITCH_AUDIO: {title: 'Switch audio'},
        },
    },
};
