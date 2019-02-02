const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  mode: 'development',
  target: 'web',
  watchOptions: {
    ignored: /node_modules/
  },
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
  	path: path.resolve(__dirname, '../dist'),
	  filename: 'captrue_mouse.js',
	  library: 'captrue_mouse',
  },
  module: {
	  rules: [{
		  test: /\.js$/,
		  exclude: /node_modules/,
		  use: ['babel-loader', 'eslint-loader'],
	  }, {
		  test: /\.(css|scss)$/,
		  use: ['style-loader', 'css-loader', 'sass-loader']
	  }],
  },
  devtool: 'source-map',
  devServer: {
  	contentBase: path.resolve(__dirname, '../dist'),
  	compress: false,
	  historyApiFallback: false,
	  hot: true,
	  port: 7001
  },
  plugins: [
  	new CleanWebpackPlugin([path.resolve(__dirname, '../dist')]),
  	new webpack.HotModuleReplacementPlugin(),
	  new HtmlWebpackPlugin({
		  template: path.resolve(__dirname, '../src/index.html')
	  })
  ]
}
