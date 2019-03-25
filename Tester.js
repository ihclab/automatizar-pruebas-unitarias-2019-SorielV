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
}

module.TestCase = TestCase
module.exports = Tester
