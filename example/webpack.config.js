const ExtractTextPlugin = require('extract-text-webpack-plugin');
const prod = process.env.NODE_ENV === 'production';
const webpack = require('webpack');
module.exports = {
  context: `${__dirname}/client`,
  entry: [
    `${__dirname}/globals`,
    `${__dirname}/client/main.js`,
  ],
  output: {
    path: `${__dirname}/client/dist`,
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        // loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
        loader: ExtractTextPlugin.extract(
          'style', // backup loader when not building .css file
          !prod ? 'css?sourceMap!autoprefixer-loader!sass?sourceMap'  // loaders
                : 'css!autoprefixer-loader!sass'
        ),
      },
      {
        test: /([\w\-\/]+\.(?:eot|woff|ttf|otf|ico|jpeg|png|jpg))/,
        loader: 'file-loader?name=[path][name].[ext]',
      },
    ],
  },
  devServer: {
    contentBase: './client',
    output: {
      filename: 'bundle.js',
      publicPath: '/',
    },
  },
  devtool: !prod ? 'source-map' : null,
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify(prod ? 'production' : 'development'),
    }),
  ],
};
