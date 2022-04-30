// webpack.config.js

const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const serverlessWebpack = require('serverless-webpack');

const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
  context: __dirname,
  entry: serverlessWebpack.lib.entries,
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts'],
    alias: {
      '~': SRC_DIR,
    },
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [SRC_DIR],
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
