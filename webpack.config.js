const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const path = require('path');

module.exports = {
  mode: 'development', // Set the mode to production to enable optimizations
  entry: './src/index.js', // Update the entry point to use the modern syntax
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'), // Use path.resolve for better path handling
    filename: 'openmct-hello.js',
    library: {
      name: 'HelloPlugin',
      type: 'umd', // Use the modern library target syntax
    },
    clean: true, // Clean the output directory before emit
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html', // Automatically generate an index.html file with your bundle
    }),
    new CleanWebpackPlugin(), // Clean the /dist folder before each build
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'node_modules/openmct/dist/**/*'), to: path.resolve(__dirname, 'dist'), context: 'node_modules/openmct/dist',
          globOptions: {
            ignore: [
              '**/index.html', // This pattern ignores index.html
            ],
            
          },
        }
      ]
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist') // Assuming 'dist' is where your intended index.html resides
    },
    compress: true,
    port: 9000,
  },
  // Since Webpack 5, the optimization of chunk splitting is enabled by default in production mode
};

