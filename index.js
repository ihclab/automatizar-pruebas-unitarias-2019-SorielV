const {
  isNullOrUndefined,
  importData,
  exportData
} = require('./utils')

const Methods = require('./Medias')

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
