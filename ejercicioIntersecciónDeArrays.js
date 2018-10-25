function intersectArrays1 (arr1, arr2) {
  var arr3 = []
  for (var indexArr1 in arr1) {
    for (var indexArr2 in arr2) {
      if (arr1[indexArr1] === arr2[indexArr2]) {
        arr3.push(arr1[indexArr1])
      }
    }
  }
  return arr3
}
var myArr1 = ['a', 'b', 'c', 'd', 'e', 'f']
var myArr2 = ['z', 'e', 'b', 'r', 'a']
var interseccion = intersectArrays1(myArr1, myArr2)
console.log('Intersección 1: ', interseccion)

function intersectArrays2 (arr1, arr2) {
  var arr3 = []
  for (var indexArr1 in arr1) {
    if (arr2.indexOf(arr1[indexArr1]) >= 0) {
      arr3.push(arr1[indexArr1])
    }
  }
  return arr3
}

interseccion = intersectArrays2(myArr1, myArr2)
console.log('Intersección 1: ', interseccion)

function diffArrays (arr1, arr2) {
  var arr3 = []
  for (var indexArr1 in arr1) {
    if (arr2.indexOf(arr1[indexArr1]) < 0) {
      arr3.push(arr1[indexArr1])
    }
  }
  return arr3
}

var diff = diffArrays(myArr1, myArr2)
console.log('Diferencia Arrays: ', diff)
