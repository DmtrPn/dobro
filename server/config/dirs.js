const path = require('path');
const rootDir = path.resolve(__dirname, '../');
const servicesDir = `${rootDir}/dist/services/**/`;

module.exports = {
    rootDir,
    servicesDir,
}

