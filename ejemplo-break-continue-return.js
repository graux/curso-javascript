function testEjemploBreakContinueReturn (arr) {
  var total = 0
  for (var index = 0; index < arr.length; index++) {
    if (arr[index] === 0) { // Si el elemento vale 0, dejará de sumar, saldrá del bucle, pero no de la función.
      break
    } else if (arr[index] === 99) { // Si el elemento vale 99, saldrá de la función con el valor 99
      return 99
    } else if (arr[index] < 0) { // Si el elemento es negativo, salta a la siguiente iteración sin sumarlo
      continue
    }
    total += arr[index] // Suma el valor positivo que no es 0 ni 99.
  }
  return total // Devuelve el valor de la suma hasta que: a) el bucle termina por si mismo, b) se ejecuta un break en el bucle
}

var myArr = [1, 2, -1, 3, -6, 4, 5, -4, 2, 0, -10, 10]
var total = testEjemploBreakContinueReturn(myArr)
console.log('Total Positivos hasta 0: ' + total)
myArr.splice(1, 0, 99)
total = testEjemploBreakContinueReturn(myArr)
console.log('Test con Break: ' + total)

// ITERACIONES PRIMERA LLAMADA:
// Iteración 1: 1
// Iteración 2: 3
// Iteración 3: 3 continue (-1)
// Iteración 4: 6
// Iteración 5: 6 continue (-6)
// Iteración 6: 10
// Iteración 7: 15
// Iteración 8: 15 continue (-4)
// Iteración 9: 17
// Iteración 10: 17 break (0)
