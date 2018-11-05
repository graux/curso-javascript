window.addEventListener('load', initValidacion)
moment.locale('es')
function initValidacion () {
  var inputs = document.getElementsByTagName('input')
  for (var index in inputs) {
    if (inputs[index].type === 'text' || inputs[index].type === 'password') {
      inputs[index].addEventListener('input', onInputChange)
    }
  }
  document.querySelector('form').addEventListener('submit', onFormSubmit)
}

function onInputChange () {
  var valido = false
  switch (this.id) {
    case 'txtNombre':
      valido = validarNombre(this)
      break
    case 'txtContrasenya':
      valido = validarContrasenya(this)
      break
    case 'txtUsuario':
      valido = validarUsuario(this)
      break
    case 'txtEmail':
      valido = validarEmail(this)
      break
    case 'txtDNI':
      valido = validarDNI(this)
      break
    case 'txtDoB':
      valido = validarDoB(this)
      break
    case 'txtNumCaracteres':
      valido = validarNumCaracteres(this)
      break
  }
  console.log('Valido ' + this.id + ': ', valido)
  var inputClassList = this.classList
  var rightIcon = this.parentElement.querySelector('.icon.is-right')
  var rightIconClassList = rightIcon.classList
  var errorMessage = this.parentElement.parentElement.querySelector('.help.is-danger')
  var okMessage = this.parentElement.parentElement.querySelector('.help.is-success')
  inputClassList.remove('is-warning', 'is-success', 'is-danger')
  rightIconClassList.remove('has-text-warning', 'has-text-success', 'has-text-danger')
  errorMessage.classList.add('is-hidden')
  okMessage.classList.add('is-hidden')
  var newIcon = document.createElement('i')
  if ((this.value.length === 0)) {
    newIcon.classList.add('fas', 'fa-check')
  } else {
    if (valido === undefined) {
      inputClassList.add('is-warning')
      rightIconClassList.add('has-text-warning')
      newIcon.classList.add('fas', 'fa-exclamation-triangle')
    } else if (valido) {
      inputClassList.add('is-success')
      rightIconClassList.add('has-text-success')
      okMessage.classList.remove('is-hidden')
      newIcon.classList.add('fas', 'fa-check')
    } else {
      inputClassList.add('is-danger')
      rightIconClassList.add('has-text-danger')
      errorMessage.classList.remove('is-hidden')
      newIcon.classList.add('fas', 'fa-exclamation')
    }
  }
  rightIcon.innerHTML = ''
  rightIcon.appendChild(newIcon)
}

function validarNombre (input) {
  // TODO Debe validar que hayan al menos dos palabras de tres o más carácteres.
  // Sin números ni símbolos, a excepción del punto
  return /^[a-zÀ-ÿ]{3,}(\s[a-zÀ-ÿ]{3,})+$/i.test(input.value.trim())
}
function validarContrasenya (input) {
  // TODO Validar que tenga al menos 1 mayuscula, 1 minúscula, 1 número y 1 símbolo. Longitud mínima 6 carácteres
  return /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[_?\-=\+\*!\$]).{6,20})$/.test(input.value.trim())
}
function validarUsuario (input) {
  // TODO Sólo se permiten minúsculas, números y guiones bajos. No se permiten acentos ni espacios
  return /^[a-z0-9_]{3,20}$/.test(input.value)
}
function validarEmail (input) {
  // Validar que es una dirección de email válida
  document.querySelector('#campoLengthEmail input').dispatchEvent(new Event('input'))
  return /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/.test(input.value)
}
function validarDNI (input) {
  // TODO Validar que es un DNI válido. 8 dígitos, guión (opcional) y letra.
  // Si no tiene guión, añadir un evento blur al campo y añadirlo
  var valid = /^\d{8}-?[A-Z]$/i.test(input.value)
  // Sin evento
  if (valid && input.value.length !== 10) {
    input.value = input.value.substring(0, 8) + '-' + input.value.substring(8, 9).toUpperCase()
  }
  return valid
}
function validarDoB (input) {
  // TODO Validar que es una fecha real, en el pasado y en el formato YYYY-MM-DD
  return moment(input.value, 'YYYY-MM-DD', 'en', true).isValid()
}
function validarNumCaracteres (input) {
  // TODO Tiene que ser un número entero y que sea igual a la longitud de la dirección de email
  return Number(input.value) === document.querySelector('#campoEmail input').value.length
}

function onFormSubmit (ev) {
  // TODO Evitar que se envie el formulario si hay errores en cualquier campo
  if (document.querySelectorAll('input.is-danger').length > 0 || document.querySelectorAll('input.input:not(.is-success)').length !== 0) {
    ev.preventDefault()
    return false
  }
}
