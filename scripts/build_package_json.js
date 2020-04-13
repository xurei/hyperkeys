const fs = require('fs');
const path = require('path');

const json = JSON.parse(`${fs.readFileSync(path.resolve(__dirname, '..', 'package.json'))}`);

const prodJson = [
    'name',
    'version',
    'description',
    'author',
    'private',
    'main',
    'dependencies',
].reduce((a,b) => {
    a[b] = json[b];
    return a;
}, {});

fs.writeFileSync(path.resolve(__dirname, '..', 'build/package.json'), JSON.stringify(prodJson, null, '  '));
