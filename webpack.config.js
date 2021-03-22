const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/MainWindow/Views/index.browser.js',
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'bundle.js',
    publicPath: 'src'
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process',
      Buffer: ['buffer', 'Buffer']
    }),
    new CopyPlugin({
      patterns: [
        { from: "node_modules/@mymonero/mymonero-app-bridge/MyMoneroLibAppCpp_WASM.js", to: "../assets/MyMoneroLibAppCpp_WASM.js" },
        { from: "node_modules/@mymonero/mymonero-app-bridge/MyMoneroLibAppCpp_WASM.wasm", to: "../assets/MyMoneroLibAppCpp_WASM.wasm" }
      ]
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
