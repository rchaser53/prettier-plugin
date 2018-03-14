const path = require('path')
const Plugins = require('./dist/plugin').default

module.exports = {
  context: path.resolve(__dirname, './src/__tests__'),
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
