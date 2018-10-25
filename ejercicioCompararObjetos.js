function sameValueObj1 (obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

var myObj1 = { nombre: 'Fran', edad: 35 }
var myObj2 = { nombre: 'Fran', edad: 35 }
var myObj3 = { nombre: 'Francisco', edad: 32 }

console.log('Tienen myObj1 y myObj2 los mismos valores (1): ', sameValueObj1(myObj1, myObj2))
console.log('Tienen myObj1 y myObj3 los mismos valores (1): ', sameValueObj1(myObj1, myObj3))

function sameValueObj2Simple (obj1, obj2) {
  for (var prop in obj1) {
    if (!obj2.hasOwnProperty(prop) || obj2[prop] !== obj1[prop]) {
      return false
    }
  }
  return true
}
console.log('Tienen myObj1 y myObj2 los mismos valores (2-Simple): ', sameValueObj2Simple(myObj1, myObj2))
console.log('Tienen myObj1 y myObj3 los mismos valores (2-Simple): ', sameValueObj2Simple(myObj1, myObj3))

// Con los siguientes objetos el método simple no funciona:
var myObj4 = { nombre: 'Fran', coche: { marca: 'VW', modelo: 'Golf' } }
var myObj5 = { nombre: 'Fran', coche: { marca: 'VW', modelo: 'Golf' } }
console.log('Tienen myObj4 y myObj5 los mismos valores (2-Simple): ', sameValueObj2Simple(myObj4, myObj5))
// No funciona porque compara que si las instancias de coche son el mismo objeto, y no son el mismo objeto, aunque tienen el mismo valor.
// Se necesita comprobar por tanto de forma recursiva:

function sameValueObj2Recursivo (obj1, obj2) {
  for (var prop in obj1) {
    if (!obj2.hasOwnProperty(prop)) {
      return false
    } else if (typeof obj2[prop] !== 'object') {
      if (obj2[prop] !== obj1[prop]) {
        return false
      }
    } else {
      if (!sameValueObj2Recursivo(obj1[prop], obj2[prop])) {
        return false
      }
    }
  }
  return true
}
console.log('Tienen myObj1 y myObj2 los mismos valores (2-Recursivo): ', sameValueObj2Recursivo(myObj1, myObj2))
console.log('Tienen myObj1 y myObj3 los mismos valores (2-Recursivo): ', sameValueObj2Recursivo(myObj1, myObj3))
console.log('Tienen myObj4 y myObj5 los mismos valores (2-Recursivo): ', sameValueObj2Recursivo(myObj4, myObj5))
