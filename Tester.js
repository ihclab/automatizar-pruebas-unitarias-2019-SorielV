// Sync
class TestCase {
  constructor(id, method, args, excepted) {
    // base
    this.id = id
    this.method = method
    this.args = args
    this.methodName = method.name  
    this.excepted = excepted
    this.obtained = null
    this.result = null
    // end base

    // control
    this.tested = false
    this.time = 0
    this.errorMessage = null
    this.errorCode = null
    // end control
  }

  run() {
    this.tested = true
    try {
      const startTime = process.hrtime()
      const result = this.method(this.args)
      this.obtained = result
      this.time = process.hrtime(startTime)[1] / 1e6
    } catch(err) {
      this.obtained = 'Exception'
      this.errorMessage = err.message 
      this.errorCode = err.code || 0
    }
    // ===
    console.log(this.obtained, this.excepted)
    this.result =
      this.obtained == this.excepted || (this.excepted === 'Exception' && (this.errorMessage || this.errorCode))
      
  }

  getResult() {
    if (!this.tested) return {}

    return {
      id: this.id,
      method: this.methodName,
      excepted: this.excepted,
      obtained: this.obtained,
      time: this.time,
      result: this.result,
    }
  }

  getPlainResult() {
    let result =
      (this.result ? '✔' : '✖') +
      `Prueba: ${this.id} Calculado: ${this.obtained} Esperado: ${this.excepted} Tiempo ${this.time} ms`

    if (this.excepted === 'Exception' || (this.errorMessage || this.errorCode)) {
      result += `\nError
        \r\t\tCodigo: ${this.errorCode}
        \r\t\tMensaje: ${this.errorMessage}`
    }

    return result
  }

  printResult() {
    if (!this.tested) return ''
    // 1 red 2 green
    console.log(`\x1b[3${this.result + 1}m`, this.getPlainResult(), "\x1b[0m")
    return
  }
}

class Tester {
  constructor(Methods, Validators = {}) {
    if (!Methods) {
      console.log('Los metodos son requeridos')
    }
    this.Methods = Methods

    if (!Validators) {
      console.warn('Los validadores previenen excepciones y normalizan la informacion')
    }
    this.Validators = Validators
    this.testCases = []
    this.omited = 0
  }

  createTestsFromData(data) {
    data.forEach(([id, method, args, excepted]) => {
      let _args
      if (this.Validators[method]) {
        try {
          _args = this.Validators[method](args) 
        } catch(err) {
          console.log(`Prueba Id: ${id} omitida => ${err.message}`)  
        }
      }
      
      if (!this.Methods.hasOwnProperty(method)) {
        console.log(`Prueba Id: ${id} omitida => Funcion no encontrado`)
        this.omited++
        return
      }
      this.testCases.push(new TestCase(id, this.Methods[method], _args, excepted))
    })
  }

  runTest() {
    // TODO: Error log
    if (this.testCases.length <= 0) {
      return 
    }
    this.testCases.forEach(testCase => testCase.run())
  }

  printResults () {
    const result = [0,0]
    let notTested = 0
    this.testCases.forEach(testCase => {
      if (!testCase.tested) {
        notTested++
        return
      }
      testCase.printResult()
      result[Number(testCase.result)]++
    })

    console.log(
      `Exitosas(✔) ${result[1]}\tFallidas(✖) ${result[0]}\t Omitidas ${
        this.omited + notTested
      } [${this.omited}, ${notTested}]\t`
    )
  }

  getResults() {
    let sresult = ''
    const result = [0,0]
    let notTested = 0
    this.testCases.forEach(testCase => {
      if (!testCase.tested) {
        notTested++
        return
      }
      result[Number(testCase.result)]++
      sresult += testCase.getPlainResult() + '\n'
    })

    sresult += `Exitosas(✔) ${result[1]}\tFallidas(✖) ${result[0]}\t Omitidas ${
      this.omited + notTested
      } [${this.omited}, ${notTested}]\t`

    return sresult
  }
}

module.TestCase = TestCase
module.exports = Tester
