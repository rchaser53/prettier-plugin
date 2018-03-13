const HelloWorldPlugin = function (options) {}

HelloWorldPlugin.prototype.apply = function (compiler) {
  compiler.plugin('emit', function (compilation, callback) {
    compilation.fileDependencies.forEach((filePath) => {
      console.log(1, filePath, 2)
    })
  })
}

module.exports = HelloWorldPlugin
