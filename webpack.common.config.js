const VueLoaderPlugin = require("vue-loader").VueLoaderPlugin;
const path = require("path");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "plugin.js",
    library: {
      name: "HelloPlugin",
      type: "umd",
    },
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
