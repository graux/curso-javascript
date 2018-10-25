// Letra DNI
function calcularLetraDNI (numeroDNI) {
  var resto = numeroDNI % 23
  var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E']
  var letraDNI = letras[resto]
  return numeroDNI + '-' + letraDNI
}
var dni = 44123456
console.log('El DNI con Letra es: ' + calcularLetraDNI(dni))
