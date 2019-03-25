/*
  Format => id:method:args:expected => '0001:mediaAritmetica:2 4 8:4.6667'
*/

const fs = require('fs')
const Path = require('path')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const isNullOrUndefined = el => el === null || el === undefined
const isEmptyEl = el => isNullOrUndefined(el) || !el.trim()

module.exports = {
  isNullOrUndefined,
  importData: async (
    file,
    line_separator = process.env.line_separator || '\r\n',
    field_separator = process.env.field_separator || ':',
    args_separator = process.env.args_separator || ' '
  ) => {
    return (await readFile(file, 'utf-8'))
      .split(line_separator)
      // .filter(line => !line || line.trim())
      .reduce((data, line, lineNumber) => {
        if (!line.trim()) {
          console.log(`Linea ${lineNumber} Omitida`)
          return data
        }
        const args = line.split(field_separator)
        if (args.length !== 4 || args.some(isEmptyEl)) {
          console.log(`Linea ${lineNumber} Omitida`)
          return data
        }

        const [id, method, raw_args, expected] = args
        data.push([id, method, raw_args.split(args_separator), expected])
        return data
      }, [])
  },
  exportData: (path, data) => writeFile(Path.resolve(path, `./ResultadosPrueba${Date.now()}.txt`) , data)
}
