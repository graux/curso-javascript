// Invertir String
function invertirString1 (texto) {
  var resultado = ''
  for (var index in texto) {
    resultado = texto.charAt(index) + resultado
  }
  return resultado
}
var texto = 'Hola, esto es un ejercicio'
console.log('invertirString1: El texto \'' + texto + '\' invertido es \'' + invertirString1(texto) + '\'')

// Invertir String 2
function invertirString2 (texto) {
  var resultado = []
  for (var index in texto) {
    resultado.unshift(texto[index])
  }
  return resultado.join('')
}
console.log('invertirString2: El texto \'' + texto + '\' invertido es \'' + invertirString2(texto) + '\'')

// Invertir String 3
function invertirString3 (texto) {
  var textoEnArray = texto.split('')
  textoEnArray.reverse()
  return textoEnArray.join('')
}
console.log('invertirString3: El texto \'' + texto + '\' invertido es \'' + invertirString3(texto) + '\'')
