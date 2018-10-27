function generarLista () {
  var arrElementos = ['Uno', 'Dos', 'Tres', 'CUATRO', '5', 'Seis']
  var lista = document.getElementById('listaElementos')
  var elementoLista = null
  for (var index in arrElementos) {
    elementoLista = document.createElement('li')
    elementoLista.innerText = arrElementos[index]
    lista.appendChild(elementoLista)
  }
}
