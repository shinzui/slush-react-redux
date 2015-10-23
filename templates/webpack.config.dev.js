var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var ROOT_PATH = path.resolve(__dirname)

module.exports = {
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'app/index.jsx')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.tpl.html',
      title: '<%= htmlTitle %>',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    preLoaders: [{
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        include: path.resolve(ROOT_PATH, 'app'),
        exclude: /node_modules/
    }],

    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      include: path.resolve(ROOT_PATH, 'app'),
      loader: 'babel'
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.(otf|eot|png|gif|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=8192'
    }] 
  }
}
