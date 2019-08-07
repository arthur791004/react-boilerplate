const path = require('path');
const { rootFolder, targets } = require('../internals/webpack/constants');

const [clientBuild, serverBuild] = targets.map(target =>
  path.join(rootFolder, 'build', target)
);

module.exports = {
  clientBuild,
  serverBuild,
};
