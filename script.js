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
