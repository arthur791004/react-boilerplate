const path = require('path');

const rootPath = process.cwd();
const buildPath = path.join(rootPath, 'build');

module.exports = {
  buildPath,
};
