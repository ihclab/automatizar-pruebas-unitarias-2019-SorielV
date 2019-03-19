const {
  isNullOrUndefined,
  importData,
  exportData
} = require('./utils')

// TODO: Add examples
// TODO: Lint, Prettier

const Path = require('path')
const exportResults = process.env.EXPORT_RESULTS || false
const exportPath = process.env.EXPORT_PATH || process.env.PWD

const Methods = require('./Medias')
const Tester = require('./Tester')
const Validators = {
  mediaAritmetica(args) {
    if (args.some(arg => isNaN(arg))) {
      if (args[0] === 'NULL') {
        return null
      }
      throw new Error('Argumentos no validos')
    }
    return args.map(arg => Number(arg))
  },
  raizEnesima(args) {
    if (args.some(arg => isNaN(arg)) || args.length < 2) {
      throw new Error('Argumentos no validos')
    }
    return [Number(args[0]), Number(args[1])]
  },
  mediaGeometrica(args) {
    if (args.some(arg => isNaN(arg))) {
      if (args[0] === 'NULL') {
        return null
      }
      throw new Error('Argumentos no validos')
    }
    return args.map(arg => Number(arg))
  },
  mediaArmonica(args) {
    if (args.some(arg => isNaN(arg))) {
      if (args[0] === 'NULL') {
        return null
      }
      throw new Error('Argumentos no validos')
    }
    return args.map(arg => Number(arg))
  }
}

const Test = async (testFile, Methods, Validators) => {
  const data = await importData(testFile)
  const test = new Tester(Methods, Validators)
  test.createTestsFromData(data)
  test.runTest()
  test.printResults()

  if (exportResults) {
    await exportData(exportPath, test.getResults())
    console.log('Archivo generado')
  }
}

Test('./CasosPrueba.txt', Methods, Validators)
  .then(console.log)
  .catch(console.error)
