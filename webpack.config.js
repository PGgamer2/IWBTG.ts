const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/Main.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src-js'),
  },
};