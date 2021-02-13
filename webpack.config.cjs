const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');
const ESLintPlugin = require('eslint-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
  },
  watchOptions: {
    aggregateTimeout: 600,
    poll: 3000
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    host: '0.0.0.0',
    port: 9876,
    disableHostCheck: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
      target: 'http://192.168.178.12:14265',
      secure: false
      }
    }
  },
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify")
    }
  },
  plugins: [
    new ESLintPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'IOTA ES6 Peer manager DEV-version',
      template: './src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new Dotenv({
      path: './pmij.env', // load this now instead of the ones in '.env'
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: false, // hide any errors
      defaults: false // load '.env.defaults' as the default values if empty.
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader',
        ],
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader',
        ],
      },
    ],
  },
};
