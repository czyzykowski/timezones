var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/app.js',
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: 'static',
    filename: 'app.js',
    publicPath: '/static/',
  },
  resolve: {
    modulesDirectories: ['./src', 'node_modules'],
  },
  devServer: {
    host: 'localhost',
    hot: true,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|lib)/,
        loaders: ['react-hot', 'babel'],
      },
    ]
  }
};
