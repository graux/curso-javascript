
function fib (num) {
  if (num < 2) {
    return num
  }
  return fib(num - 1) + fib(num - 2)
}

var fibAsync = function (num) {
  return new Promise(function (resolve, reject) {
    if (num < 0) {
      reject(Error('El parámetro tiene que ser mayor o igual a cero'))
    } else {
      resolve(fib(num))
    }
  })
}

function mostrarResultado (num, res) {
  console.log('El resultado de fib(' + num + '): ' + res)
}

mostrarResultado(29, fib(20))

var miNum = 30
fibAsync(miNum).then(
  function (resultado) {
    mostrarResultado(miNum, resultado)
  }).catch(
  function (err) {
    console.log('ERROR: ', err)
  })

mostrarResultado(31, fib(21))
