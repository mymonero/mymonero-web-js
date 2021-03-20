const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './local_modules/MainWindow/Views/index.browser.js',
  output: {
    path: path.resolve(__dirname, 'local_modules'),
    filename: 'bundle.js',
    publicPath: 'local_modules'
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process',
      Buffer: ['buffer', 'Buffer']
    })
  ],
  resolve: {
    alias: {
      process: 'process/browser'
    },
    fallback: {
      fs: false,
      util: require.resolve('util/'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify')
    }
  }
}
