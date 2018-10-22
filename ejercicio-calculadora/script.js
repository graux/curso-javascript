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
  var op1Val = this.getOp1Value()
  var op2Val = this.getOp2Value()
  if (!isNaN(op1Val) && !isNaN(op2Val)) {
    var opResult = 0
    switch (this.getOperator()) {
      case 'plus':
        opResult = op1Val + op2Val
        break
      case 'minus':
        opResult = op1Val - op2Val
        break
      case 'mult':
        opResult = op1Val * op2Val
        break
      case 'divi':
        opResult = op1Val / op2Val
        break
    }
    Calculadora.result.value = opResult
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
  return Number(this.op1.value)
}

Calculadora.getOp2Value = function () {
  return Number(this.op2.value)
}

Calculadora.getOperator = function () {
  return Calculadora.operator.value
}

window.onload = initCalculator
