const fs = require('fs');
const path = require('path');

module.exports = JSON.parse(`${fs.readFileSync(path.resolve(__dirname, '..', 'package.json'))}`);
