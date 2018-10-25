function clonarObjetosJSON (obj) {
  var objJsonStr = JSON.stringify(obj)
  return JSON.parse(objJsonStr)
}

var myObj1 = { nombre: 'Fran', coche: { marca: 'VW', modelo: 'Golf', revisiones: [2018, 2017, 2015, 2013, 2009] } }
var myObj2 = clonarObjetosJSON(myObj1)
console.log('Clonar JSON myObj1 en myObj2:', myObj1, myObj2)

function clonarObjetosRecursivo (obj) {
  if (typeof obj !== 'object') {
    return obj // Condición recursividad. Los tipos primitivos se pueden copiar directamente: string, bool, number, etc.
  }
  var clone = {} // nos creamos un objeto donde almacenar la copia
  for (var prop in obj) {
    if (typeof obj[prop] !== 'object') {
      clone[prop] = obj[prop] // Los tipos simples y funciones los copiamos directamente
    } else if (obj[prop] instanceof Array) {
      clone[prop] = []
      for (var index in obj[prop]) { // Copiamos cada elemento del array de forma recursiva por si contiene otros objetos/arrays
        clone[prop][index] = clonarObjetosRecursivo(obj[prop][index])
      }
    } else { // Es un objeto normal
      clone[prop] = clonarObjetosRecursivo(obj[prop])
    }
  }
  return clone
}
var myObj3 = clonarObjetosRecursivo(myObj1)
console.log('Clonar Recursivo myObj1 en myObj3:', myObj1, myObj3)
