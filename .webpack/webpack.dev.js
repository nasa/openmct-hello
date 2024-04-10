const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const common = require("./webpack.common.js");
const path = require("path");

/** @type {import('webpack').Configuration} */
module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
  devServer: {
    client: {
      overlay: false,
    },
    static: [
      { directory: path.join(__dirname, "../dist") },
      { directory: path.join(__dirname, "../node_modules/openmct/dist") },
    ],
    compress: true,
    port: 9000,
  },
});
