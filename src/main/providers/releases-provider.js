const request = require('request-promise-native');

let _latestRelease;

const provider = {
    loadLatestRelease: function() {
        if (!_latestRelease) {
            return request({
                method: 'GET',
                json: true,
                headers: {
                    Accept: 'application/vnd.github.v3+json',
                    'User-Agent': 'Hyperkeys-App',
                },
                url: `https://api.github.com/repos/xurei/hyperkeys/releases?per_page=10&page=0`,
            })
            .then((releases) => {
                return releases.filter(r => !r.prerelease);
            })
            .then((releases) => {
                _latestRelease = releases[0];
                return _latestRelease;
            })
            .catch(e => {
                console.error(e);
                return null;
            });
        }
        else {
            return Promise.resolve(_latestRelease);
        }
    },
};

module.exports = provider;
