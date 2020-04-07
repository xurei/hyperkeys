const storage = require('electron-json-storage');

//TODO default macros if none found

const provider = {
    saveMacros: function(macros) {
        return new Promise((resolve, reject) => {
            storage.set('macros', macros, function(error, data) {
                if (error) {
                    reject(error);
                }
                resolve(data);
            });
        })
        .catch(e => console.error(e));
    },
    
    loadMacros: function() {
        return new Promise((resolve, reject) => {
            storage.get('macros', function(error, data) {
                if (error) {
                    reject(error);
                }
				
                if (!Array.isArray(data)) {
                    data = [];
                }
				
                //TODO add default config on first launch ?
				
                resolve(data);
            });
        })
        .catch(e => console.error(e));
    },
};

module.exports = provider;
