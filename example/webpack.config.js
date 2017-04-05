const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const prod = process.env.NODE_ENV === 'production';
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
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader', // backup loader when not building .css file
          use: prod ? 'css-loader!autoprefixer-loader!sass-loader'
                    : 'css-loader?sourceMap!autoprefixer-loader!sass-loader?sourceMap',
        }),
      },
      {
        test: /([\w\-\/]+\.(?:eot|woff|ttf|otf|ico|jpeg|png|jpg))/,
        loader: 'file-loader?name=[path][name].[ext]',
      },
    ],
  },
  devServer: {
    contentBase: './client',
    historyApiFallback: {
      index: 'index.html',
    },
  },
  devtool: prod ? false : 'source-map',
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
