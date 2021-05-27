const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
 output: {
   path: path.join(__dirname, '/dist'),
   filename: 'index.bundle.js'
 },
 devServer: {
   port: 3000,
   watchContentBase: true
 },
 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /nodeModules/,
       use: {
         loader: 'babel-loader'
       }
     },
     {
       test: /\.(css|scss)$/,
       use: ['style-loader', 'css-loader', 'sass-loader']
     },
     {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    }
   ]
 },
 resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
 plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
}