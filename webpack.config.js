'use strict';

const Webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildDirectory = path.join(__dirname, 'build');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/app.js'
  },
  output: {
    filename: 'app.js',
    path: buildDirectory,
  },
  devtool: false,
  devServer: {
    static: buildDirectory,
    port: process.env.PORT || 8080
  },

  stats: {
    colors: true,
    reasons: true
  },

  plugins: [
    new HtmlWebpackPlugin({template: 'src/assets/index.html'}),
    new Webpack.EnvironmentPlugin({
      'NEO4J_URI': 'neo4j+s://demo.neo4jlabs.com',
      'NEO4J_DATABASE': 'movies',
      'NEO4J_USER': 'movies',
      'NEO4J_PASSWORD': 'movies',
      'NEO4J_VERSION': ''
    })
  ],

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|ico|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
};

