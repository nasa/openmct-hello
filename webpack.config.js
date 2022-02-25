/* eslint-env node */

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/HelloPlugin.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "openmct-hello.js",
    library: "HelloPlugin",
    libraryTarget: "umd"
  },
  mode: process.env.NODE_ENV || 'production',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: './index.html',
        transform: function (content) {
          return content.toString().replace(/^dist\//, '');
        }
      }]
    })],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      }
    ]
  },
  devtool: "inline-source-map",
  devServer: {
    static: ['./'],
    hot: true,
  }
};
