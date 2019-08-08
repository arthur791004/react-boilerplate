const path = require('path');
const { rootFolder, names } = require('../internals/webpack/constants');

const [clientBuild, serverBuild] = names.map(name =>
  path.join(rootFolder, 'build', name)
);

const statsFilename = 'loadable-stats.json';
const clientStatsFile = path.join(clientBuild, statsFilename);
const serverStatsFile = path.join(serverBuild, statsFilename);

module.exports = {
  clientBuild,
  serverBuild,
  statsFilename,
  clientStatsFile,
  serverStatsFile,
};
