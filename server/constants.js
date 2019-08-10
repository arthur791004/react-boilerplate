const path = require('path');
const { clientBuild, serverBuild } = require('../internals/webpack/constants');

const statsFilename = 'loadable-stats.json';
const clientStatsFile = path.join(clientBuild, statsFilename);
const serverStatsFile = path.join(serverBuild, statsFilename);

module.exports = {
  statsFilename,
  clientStatsFile,
  serverStatsFile,
};
