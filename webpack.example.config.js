const _ = require('lodash');
const defaultConfig = require('./webpack.config.js');

module.exports = _.merge(defaultConfig, {
  output: {
    path: `${__dirname}/example/node_modules/react-admin-panel/lib`,
  },
});
