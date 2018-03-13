const path = require('path')
const Plugins = require('./plugin')

module.exports = {
  context: path.resolve(__dirname, './src'),
  devtool: 'inline-source-map',
  entry: {
    index: './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.html', '.js', '.less']
  },
  plugins: [
    new Plugins()
  ]
}
