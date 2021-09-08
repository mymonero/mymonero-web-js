const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.browser.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process',
      Buffer: ['buffer', 'Buffer']
    }),
    new CopyPlugin({
      patterns: [
        { from: "node_modules/@mymonero/mymonero-app-bridge/MyMoneroLibAppCpp_WASM.js", to: "../assets/MyMoneroLibAppCpp_WASM.js" },
        { from: "node_modules/@mymonero/mymonero-app-bridge/MyMoneroLibAppCpp_WASM.wasm", to: "../assets/MyMoneroLibAppCpp_WASM.wasm" },
        { from: "icon*.png", to: "../dist/assets/img", context: path.resolve(__dirname, 'src', 'assets/img'), },
        { from: "*.svg", to: "../dist/assets/img", context: path.resolve(__dirname, 'src', 'assets/img'), }
      ]
    })
  ],
  resolve: {
    // alias: {
    //   process: 'process/browser'
    // },
    fallback: {
      fs: false,
      util: require.resolve('util/'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
      process: require.resolve('process/browser')
    }
  }
}
