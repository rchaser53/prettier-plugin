import * as fs from 'fs'
import * as prettier from 'prettier'

export interface Reader {
	(path: string): Promise<string>
}
export interface Writer {
	(path: string, data: string): Promise<void>
}
export interface DefaultLoader {
	(input: string): void
}

export default class {
  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      compilation.fileDependencies.forEach((filePath) => {
        const innerDefaultLoader = async () => {
          try {
            const data = await reader(filePath)
            const formattedData = prettier.format(data, this.addFormatToConfig({}, filePath))
  
            await writer(filePath, formattedData)
          } catch (err) {
            throw new Error(err)
          }
        }

        innerDefaultLoader()
          .catch((err) => {
            throw new Error(err)
          })
      })
    })
  }

  addFormatToConfig(configPrettier, targetPath: string) {
    switch (targetPath.replace(/^(\s|\S)*\./, '')) {
      case 'ts':
        return { ...configPrettier, parser: 'typescript' }
      case 'vue':
        return { ...configPrettier, parser: 'vue' }
      case 'md':
        return { ...configPrettier, parser: 'md' }
      case 'css':
        return { ...configPrettier, parser: 'css' }
      case 'json':
        return { ...configPrettier, parser: 'json' }
      default:
        return configPrettier
    }
  }
}

const reader = (targetPath: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		fs.readFile(targetPath, { encoding: 'utf8' }, (err, data) => {
			if (err) {
				reject(err)
				return
			}
			resolve(data)
		})
	})
}

const writer: Writer = (path, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(path, data, (err) => {
			if (err) {
				reject(err)
				return
			}
			resolve()
		})
	})
}
