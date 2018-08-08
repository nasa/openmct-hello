/* eslint-env node */

var path = require('path');

module.exports = {
  entry: './src/HelloPlugin',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "openmct-hello.js",
    library: "HelloPlugin",
    libraryTarget: "umd"
  }
};
