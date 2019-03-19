Array.prototype.sum = function(initValue = 0) {
  return this.reduce((a, b) => a + b, initValue)
}

Array.prototype.mul = function(initValue = 1) {
  return this.reduce((a, b) => a * b, initValue)
}

class Medias {
  static mediaAritmetica(args) {
    if (args === null) {
      return 0
    }
     
    return Number((args.sum() / args.length).toFixed(4))
  }

  static raizEnesima(x, n) {
    return Number(Math.pow(x, 1 / n).toFixed(4))
  }

  static mediaGeometrica(args) {
    if (args === null) {
      return 0
    }

    if (args.every(arg => arg === 0)) {
      if (args.length === 1 & args[0] === 0) {
        return 0
      }
      throw new Error('Valores no validos')
    }

    return Number(Math.pow(args.mul(), 1 / args.length).toFixed(4))
  }

  static mediaArmonica(args) {
    throw new Error('No implementado')
  }
}

module.exports = Medias