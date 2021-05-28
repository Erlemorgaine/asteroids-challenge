const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (_, { mode }) => ({
 output: {
   path: path.join(__dirname, '/dist'),
   filename: '[name].[chunkhash].js',
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
       use: [ mode === 'production'
         ? MiniCssExtractPlugin.loader
         : 'style-loader', 'css-loader', 'sass-loader']
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
 plugins: [
   new HtmlWebpackPlugin({ template: './src/index.html' }),
   new MiniCssExtractPlugin()
 ]
})
