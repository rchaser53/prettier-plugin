export default class {
  apply(compiler) {
    compiler.plugin('emit', function(compilation, callback) {
      compilation.fileDependencies.forEach((filePath) => {
        console.log(1, filePath, 2)
      })
    })
  }
}