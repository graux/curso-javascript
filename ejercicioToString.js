var myObj = { nombre: 'Fran', edad: 35, ciudad: 'Palma', DNI: '44123456-A' }
console.log('Sin función toString: ' + myObj)

myObj.toString = function () {
  return 'Hola, soy ' + this.nombre + ' con DNI: ' + this.DNI + ', tengo ' + this.edad + ' años y vivo en ' + this.ciudad + '.'
}
console.log('Con función toString: ' + myObj)
