var Calculadora = {
  op1: null,
  op1Error: null,
  op1Ok: null,
  op2: null,
  op2Error: null,
  op2Ok: null,
  operator: null,
  result: null
}

Calculadora.updateResult = function () {
  var op1Val = this.getOp1Value() // Leemos el valor numérico del op1
  var op2Val = this.getOp2Value() // Leemos el valor numérico del op2
  if (!isNaN(op1Val) && !isNaN(op2Val)) { // Comprobamos que son números válidos
    var opResult = 0 // Declaramos una variable para guardar el valor del resultado
    switch (this.getOperator()) { // Obtenemos el tipo de operación y comprobamos cuál es.
      case 'plus':
        opResult = op1Val + op2Val // Se ejecuta una suma
        break
      case 'minus':
        opResult = op1Val - op2Val // Se ejecuta una resta
        break
      case 'mult':
        opResult = op1Val * op2Val // Se ejecuta una multiplicación
        break
      case 'divi':
        opResult = op1Val / op2Val // Se ejecuta una división
        break
    }
    Calculadora.result.value = opResult // Actualizamos el campo HTML result, utilizando su propiedad value.
  }
}

function initCalculator () {
  // Inicializar Elementos
  Calculadora.op1 = document.getElementById('op1')
  Calculadora.op2 = document.getElementById('op2')
  Calculadora.operator = document.getElementById('selOp')
  Calculadora.result = document.getElementById('result')

  Calculadora.op1Error = document.getElementById('op1IconError')
  Calculadora.op1Ok = document.getElementById('op1IconOk')
  Calculadora.op2Error = document.getElementById('op2IconError')
  Calculadora.op2Ok = document.getElementById('op2IconOk')
  // console.log('Elementos Inicializados', Calculadora)

  // Inicializar Eventos
  Calculadora.op1.addEventListener('input', Calculadora.onOpChange)
  Calculadora.op2.addEventListener('input', Calculadora.onOpChange)
  Calculadora.operator.addEventListener('change', Calculadora.onOperatorChange)
}

Calculadora.onOpChange = function (ev) {
  var opVal = parseFloat(this.value)
  var opIconError = this === Calculadora.op1 ? Calculadora.op1Error : Calculadora.op2Error
  var opIconOk = this === Calculadora.op1 ? Calculadora.op1Ok : Calculadora.op2Ok
  console.log('ID', this.id, ev.currentTarget.id, this.value)
  if (ev.currentTarget.value.length === 0) {
    if (opIconError.className.indexOf('is-hidden') < 0) {
      opIconError.className += ' is-hidden'
    }
    if (opIconOk.className.indexOf('is-hidden') < 0) {
      opIconOk.className += ' is-hidden'
    }
  } else {
    if (isNaN(opVal)) {
      if (opIconError.className.indexOf('is-hidden') > 0) {
        opIconError.className = opIconError.className.replace(' is-hidden', '')
      }
      if (opIconOk.className.indexOf('is-hidden') < 0) {
        opIconOk.className += ' is-hidden'
      }
    } else {
      if (opIconOk.className.indexOf('is-hidden') > 0) {
        opIconOk.className = opIconOk.className.replace(' is-hidden', '')
      }
      if (opIconError.className.indexOf('is-hidden') < 0) {
        opIconError.className += ' is-hidden'
      }
      ev.currentTarget.value = opVal.toString()
    }
  }
  Calculadora.updateResult()
}

Calculadora.onOperatorChange = function () {
  Calculadora.updateResult()
}

Calculadora.getOp1Value = function () {
  return Number(this.op1.value) // Number() o parseFloat() o parseInt() pueden ser usados.
}

Calculadora.getOp2Value = function () {
  return Number(this.op2.value) // Hay que darse cuenta que se usa this. ya que nos encontramos dentro de un objeto y accedemos a sus propiedades
  // Además this.op1 o this.op2 son objetos HTML del DOM (Elemen o InputElement mejor dicho) y necesitamos acceder a su valor mediante .value
}

Calculadora.getOperator = function () {
  return Calculadora.operator.value
}

window.onload = initCalculator
