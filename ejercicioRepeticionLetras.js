function letrasUnicas (arrLetras) {
  var dicLetras = {} // Nos preparamos un objeto/diccionario para separar las letras únicas
  var letra = null // Variable para leer cada letra
  var indiceLetra = 0 // Variable para el índice de la iteración
  for (indiceLetra in arrLetras) { // Recorremos el array de letras
    letra = arrLetras[indiceLetra].toLowerCase() // Guardamos en 'letra' la letra de la iteración en minúsculas
    if (!dicLetras.hasOwnProperty(letra)) { // Si la letra no está en el diccionario
      dicLetras[letra] = 0 // La añadimos como clave/propiedad y ponemos el contador a 0
    }
    dicLetras[letra]++ // Siempre incrementamos el contador para cada letra
  }
  var arrLetrasUnicas = Object.keys(dicLetras) // Obtenemos solo las claves/propiedades del dicionario, es decir las letras
  arrLetrasUnicas.sort(function (letra1, letra2) { // Las ordenamos
    if (letra1 < letra2) { // Si la letra 1 es menor que 2 devolvemos -1
      return -1
    }
    if (letra2 > letra1) { // Si la letra 1 es mayor que la 2, 1
      return 1
    }
    return 0 // Devolvemos 0 si son la misma (no debería ocurrir nunca)
  })
  var result = [] // Nos creamos un array para el resultado
  for (indiceLetra in arrLetrasUnicas) { // Recorremos el nuevo array de letras ordenadas
    letra = arrLetrasUnicas[indiceLetra] // Leemos la letra actual de la iteración
    result.push({ // Insertamos en el array del resultado un nuevo objeto...
      letra: letra, // ... con una propiedad 'letra' para la letra...
      ocurrencias: dicLetras[letra] // ... y buscamos cuantas ocurrencias habíamos sumado en el diccionario, y lo guardamos en la propiedad ocurrencias
    })
  }
  return result // Devolvemos el array de objetos con cada letra y sus ocurrencias, los objetos están ordenados por cada letra
}
var arrLetras = 'Parastratiosphecomyia Stratiosphecomyioides'.split('') // Genera un array de con cada carácter del texto, split con cadena vacía parte la string por cada carácter.
var letrasYOcurrencias = letrasUnicas(arrLetras) // Instanciamos la función y recogemos el resultado
console.log('LETRAS Y OCURRENCIAS: ', letrasYOcurrencias)
