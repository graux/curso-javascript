window.onload = function () {
  console.log('---> Página Cargada !!!')
}
console.log('Hello World - Console')

console.log('Tipos de Datos:')
console.log('#')

var vText = 'contenido'
console.log('# vText es de tipo: "' + typeof vText + '" y su valor: ' + vText)
console.log('#')

var vNum = 3
console.log('# vNum es de tipo: "' + typeof vNum + '" y su valor: ' + vNum)
console.log('#')

var vDec = 3.2
console.log('# vDec es de tipo: "' + typeof vDec + '" y su valor: ' + vDec)
console.log('#')

var vBool = true
console.log('# vBool es de tipo: "' + typeof vBool + '" y su valor: ' + vBool)
console.log('#')

var vArray = [1, 2, 3, 'cuatro']
console.log('# vArray es de tipo: "' + typeof vArray + '" y su valor: ' + vArray)
console.log('#')

var vObj = { nombre: 'Fran', apellido: 'Grau', num: 9 }
console.log('# vObj es de tipo: "' + typeof vObj + '" y su valor: ' + vObj)
vObj = null
console.log('# [NULL] vObj es de tipo: "' + typeof vObj + '" y su valor: ' + vObj)
vObj = undefined
console.log('# [UNDEFINED] vObj es de tipo: "' + typeof vObj + '" y su valor: ' + vObj)
vObj = { nombre: 'Fran', apellido: 'Grau', num: 9 }
console.log('#')

var vNaN = vNum / vObj.num
console.log('# vNaN es de tipo: "' + typeof vNaN + '" y su valor: ' + vNaN)
vNaN = vNum / vObj.apellido
console.log('# [DIVISIÓN] vNum es de tipo: "' + typeof vNum + '" y su valor: ' + vNum)

if (vNum > 3) {
  console.log('El valor es mayor de 3')
} else if (vNum === 3) {
  console.log('El valor es 3')
} else {
  console.log('El valor es menor que 3')
}

switch (vText) {
  case 'javascript':
    console.log('El Valor es JavaScript')
    break
  case 'contenido':
    console.log('El Valor es Contenido')
    break
  default:
    console.log('Era otro valor')
}

var total = 0
for (var index = 0; index < vArray.length; index++) {
  if (typeof vArray[index] === 'string') {
    continue
  }
  total += vArray[index]
}
console.log('El valor total es: ' + total)

var vData = { nombre: 'Fran', apellido: 'Grau', edad: 35, empresa: 'Kydemy' }
var resumen = ''
for (var prop in vData) {
  if (prop === 'edad' && vData[prop] < 18) {
    resumen = null
    break
  }
  resumen += prop + ' -> ' + vData[prop] + ' / '
}
if (resumen) {
  console.log(resumen)
} else {
  console.log('Menor de Edad')
}

var vStack = [3, -4, 52, -32, 12, -32, 4, 2, -51]
var val = null
var totalPos = 0
while (vStack.length > 0) {
  val = vStack.shift()
  if (val > 0) {
    totalPos += val
  }
}
console.log('El total de positivos es: ' + totalPos)

// FUNCTIONS
var showParameter = function (index, param) {
  console.log('Param index ' + index + ': ' + param)
}

function parametersToArray () {
  var params = []
  for (var index in arguments) {
    showParameter(index, arguments[index])
    params.push(arguments[index])
  }
  return params
}

var paramArray = parametersToArray('Esto', 'son', 4, 'parámetros')
console.log('Param Array: ', paramArray)
console.log('Funcion: ', showParameter)
console.log('Funcion Valor: ', showParameter(0, 'Console'))

var vTres = 3
function alCuadrado (valor) {
  valor = valor * valor
  return valor
}
console.log('vTres: ' + vTres + ' / alCuadrado: ' + alCuadrado(vTres))

var valores = [1, 1, 2, 3, 5]
function generarFibonacci (valoresFib, numNuevos) {
  var lastIndex = valoresFib.length - 1
  for (var index = 0; index < numNuevos; index++) {
    valores.push(valoresFib[lastIndex] + valoresFib[lastIndex - 1])
    lastIndex++
  }
  return valoresFib
}
var nuevosValores = generarFibonacci(valores, 5)
console.log('Valores:', valores, 'Nuevos Valores:', nuevosValores)

// METHODS
function Persona (nombre, apellido, edad, companyia) {
  this.nombre = nombre
  this.apellido = apellido
  this.edad = edad
  this.companyia = companyia
  this.saludar = function (lang) {
    var saludo = null
    switch (lang) {
      case 'en':
        saludo = 'Hello'
        break
      case 'ca':
        saludo = 'Uep'
        break
      default:
        saludo = 'Hola'
    }
    console.log(saludo + ' ' + this.nombre + ' ' + this.apellido)
  }
}
var per1 = new Persona('Fran', 'Grau', 35, 'Kydemy')
var per2 = new Persona('Juan Antonio', 'Darder', null, 'PalmaActiva')
per1.saludar()
per2.saludar('ca')
