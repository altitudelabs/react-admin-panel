const _ = require('lodash');
const defaultConfig = require('./webpack.config.js');
module.exports = _.merge(defaultConfig, {
  output: {
    publicPath: '/react-admin-panel/',
  },
});
