// Math
var animales = ['león', 'zebra', 'elefante', 'girafa', 'hipopotamo', 'mono', 'rinoceronte', 'gacela', 'tigre', 'avestruz']
function animalesAleatorios (numAnimales) {
  numAnimales = Math.ceil(Math.abs(numAnimales))
  var animalesSeleccionados = []
  var indiceAnimal = null
  for (var index = 0; index < numAnimales; index++) {
    indiceAnimal = Math.floor(Math.random() * animales.length)
    animalesSeleccionados.push(animales[indiceAnimal])
  }
  return animalesSeleccionados
}
var misAnimales = animalesAleatorios(-3.4)
console.log(misAnimales)
