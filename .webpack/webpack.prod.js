const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  externals: {
    // Exclude openmct core from the bundle
    openmct: "openmct",
  },
});

