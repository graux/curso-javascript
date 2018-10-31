function demoRegExp () {
  console.log(/OL/.test('Hola'))
  console.log(/OL/i.test('Hola'))
  console.log(/OL/i.test('hello'))

  console.log(/\d+/.test('Tengo 35 años'))
  console.log(/^\d{8}-[A-Z]$/i.test('44123456-A')) // TRUE

  console.log('esto es un ejemplo'.match(/\be/g))
  console.log('2018-10-29 18:00'.replace(/[^\d]/g, ''))
  console.log('solo, quiero! las     palabras. de - la || String'.split(/[^\w]+/g))
  console.log('En qué posición se encuentra la palabra posición?'.search(/posición/ig)) // En la posición 7
  console.log('capi   cua'.replace(/(\w+)\s+(\w+)/, '$2 $1')) // cua capi
}
demoRegExp()

// Ejercicio 1
function isPalmaActivaEmail (emailAddress) {
  return /[\w\.\-\+]@palmaactiva.com/.test(emailAddress)
}
var direcciones = ['fran@kydemy.com', 'jtdarder@palmaactiva.com', 'grau.fran@gmai.com']
var email = null
for (var index in direcciones) {
  email = direcciones[index]
  console.log('Es ' + email + ' del dominio PalmaActiva: ' + isPalmaActivaEmail(email))
}

// Ejercicio 2
var parrafo = 'Y, viéndole don Quijote de aquella manera, con muestras de tanta tristeza, le dijo: Sábete, Sancho, que no es un hombre más que otro si no hace más que otro. Todas estas borrascas que nos suceden son señales de que presto ha de serenar el tiempo y han de sucedernos bien las cosas; porque no es posible que el mal ni el bien sean durables, y de aquí se sigue que, habiendo durado mucho el mal, el bien está ya cerca. Así que, no debes congojarte por las desgracias que a mí me suceden, pues a ti no te cabe parte dellas.Y, viéndole don Quijote de aquella manera, con muestras de tanta tristeza, le dijo: Sábete, Sancho, que no es un hombre más que otro si no hace más que otro. Todas estas borrascas que nos suceden son señales de que presto ha de serenar el tiempo y han de sucedernos bien las cosas; porque no es posible que el mal ni el bien sean durables, y de aquí se sigue que, habiendo durado mucho el mal, el bien está ya cerca. Así que, no debes congojarte por las desgracias que a mí me suceden, pues a ti no'
console.log('Bien aparece: ' + parrafo.match(/bien/gi).length + ' veces')

// Ejercicio 3
var colores = ['rojo', '#ff0000', '#fa56ba', '#FZXG23', '#Fa5Ab3', 'blue']
var color = null
var hexRegExp = /^#[a-f0-9]{6}$/i
for (var indexColores in colores) {
  color = colores[indexColores]
  console.log('El color "' + color + '" es Hexadecimal: ' + hexRegExp.test(color))
}

// Ejercicio 4
function elementInnerText (elementID) {
  var element = document.getElementById(elementID)
  if (element) {
    var innerHtml = element.innerHTML
    return innerHtml.replace(/<(.|\n)*?>/g, ' ')
  } else {
    console.log('No se encuentra el Elemento con ID: ' + elementID)
    return null
  }
}
// https://developer.mozilla.org/es/
console.log(elementInnerText('main-header'))

function elementInnerTextComplex (elementID) {
  var element = document.getElementById(elementID)
  if (element) {
    var innerHtml = element.innerHTML
    innerHtml = innerHtml.replace(/<\/?(h\d|p|div|article|aside|dl|dt|footer|form|li|ul|ol|section|nav)(\s?(.|\n)*?)?>/ig, '\n\n')
    return innerHtml.replace(/<(.|\n)*?>/g, ' ').replace(/(\s|\t)+\n/g, '\n').replace(/^\s+/gm, '')
  } else {
    console.log('No se encuentra el Elemento con ID: ' + elementID)
    return null
  }
}
// https://developer.mozilla.org/es/
console.log(elementInnerTextComplex('main-header'))
