const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const prod = process.env.NODE_ENV === 'production';

module.exports = {
  context: `${__dirname}`,
  entry: [
    `${__dirname}/src/index.js`,
  ],
  output: {
    path: `${__dirname}/lib`,
    filename: 'index.js',
    publicPath: '/',
    libraryTarget: 'umd',
  },
  target: 'node',
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-router': {
      root: 'ReactRouter',
      commonjs2: 'react-router',
      commonjs: 'react-router',
      amd: 'react-router',
    },
    'react-router-dom': {
      root: 'ReactRouterDom',
      commonjs2: 'react-router-dom',
      commonjs: 'react-router-dom',
      amd: 'react-router-dom',
    },
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
    contentBase: `${__dirname}`,
    output: {
      filename: 'bundle.js',
      publicPath: '/',
    },
  },
  devtool: !prod ? 'source-map' : false,
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
