window.onload = inicializarEventos

/**
 * Se inicializan los eventos de la página
 */
function inicializarEventos () {
  // Cargamos los inputs/campos en valiables
  var inputsLogin = document.querySelectorAll('#formLogin input.input')
  var inputsRegistro = document.querySelectorAll('#formRegistro input.input')

  // forEach Sintáxis ES5.
  // Arrow Functions ES2015
  // Añadimos evento 'input' a cada campo
  inputsLogin.forEach(input => {
    input.addEventListener('input', onInputChange)
  })
  inputsRegistro.forEach(input => {
    input.addEventListener('input', onInputChange)
  })

  // Añadimos los eventos a cada formulario
  document.getElementById('formLogin').addEventListener('submit', loginUsuario)
  document.getElementById('formRegistro').addEventListener('submit', registrarUsuario)
}

/**
 * Validación de cada input de la página
 * @param {HTMLInputElement} input
 */
function validarInput (input) {
  return new Promise(function (resolve, reject) {
    var valid = false
    switch (input.id) {
      case 'txtLoginUsuario':
        // Se valida el nombre de usuario del login: minúsculas y números, de 3 a 20 carácteres
        valid = null // TODO
        break
      case 'txtLoginContrasenya':
      case 'txtContrasenya':
        // Se validan las contraseñas: 1 mayuscula, 1 minúscula, 1 número y 1 símbolo. Longitud de 6 a 20 carácteres
        valid = null // TODO
        if (input.id === 'txtContrasenya') {
          validarInput(document.getElementById('txtConfirmacion')).catch(
            () => { /* No hacer nada */ }
          )
        }
        break
      case 'txtUsuario':
        // Se valida el nombre de usuario del login: minúsculas y números, de 3 a 20 carácteres
        var valido = null // TODO
        if (valido) {
          // Si es válido, se pide al servidor si el usuario está en uso y valid se asigna a null
          validarUsuarioEnUso(input, resolve, reject)
          valid = null
        } else {
          // Si no es válido se asigna false a valid
          valid = false
        }
        break
      case 'txtConfirmacion':
        //  Se comprueba que txtContrasenya y txtConfirmacion tienen el mismo valor
        valid = null // TODO
        break
      case 'txtNombre':
        // Se valida que el nombre tenga al menos dos palabras de 3 o más carácteres. No se permiten números ni símbolos
        valid = null // TODO
        break
    }
    if (valid === true) {
      // Si valid === true, resolver la promesa con true
      // TODO
    } else if (valid === false) {
      // Si valid === false, rechazar la promesa con un: new Error('texto error')
      // TODO
    }
    // Si valid es null no se hace nada (la promesa no acaba, acabará más adelante en otra función)
  })
}

/**
 * Evento cuando un input es modificado
 */
function onInputChange () {
  // Crearmos variables con los mensajes de error y el de ok
  var msgsError = this.parentNode.parentNode.querySelectorAll('.help.is-danger')
  var msgOk = this.parentNode.parentNode.querySelector('.help.is-success')
  // Reiniciamos el estado del input
  this.classList.remove('is-success', 'is-danger')
  // Ocultamos todos los mensajes de error y el de OK
  msgOk.classList.add('is-hidden')
  msgsError.forEach(msg => msg.classList.add('is-hidden'))

  // TODO
  // Si No tiene contenido, cambiamos el icono y actualizamos estado botones
  updateIcon(this, 'fa-ellipsis-h', null)
  actualizarEstadosBotones()
  // TODO
  // Si tiene contenido, mostramos una animación de carga mientras se resuelve la promesa de validación
  updateIcon(this, 'loading', null)
  // y validamos el input mediante la funcion/promesa validarInput
  validarInput(this).then(
    () => {
      // Si la validación has ido correcta mostramos el campo en verde, mensaje de Ok y ponemos el icono de Check
      this.classList.add('is-success')
      msgOk.classList.remove('is-hidden')
      updateIcon(this, 'fa-check', 'has-text-success')
      // Actualizamos los botones invocando actualizarEstadosBotones
      // TODO
    }
  ).catch(
    (codigoError) => {
      // Si hay un error de validación
      this.classList.add('is-danger')
      if (typeof codigoError === 'number') {
        // Mostramos el error asociado al código de error recibido
        this.parentNode.parentNode.querySelector('.help.is-danger.status_' + codigoError).classList.remove('is-hidden')
      } else {
        // Si no mostramos el primer error
        msgsError[0].classList.remove('is-hidden')
      }
      updateIcon(this, 'fa-exclamation', 'has-text-danger')
      // Actualizamos los botones
      // Actualizamos los botones invocando actualizarEstadosBotones
      // TODO
    }
  )
}

/**
 * Comprueba si hay algún error en cada FORM y desactiva el botón si es así
 */
function actualizarEstadosBotones () {
  // Se extraen el número de campos OK del Login
  var inputsLoginOK = document.querySelectorAll('#formLogin input.input.is-success').length
  // Se extraen el número total de campos del Login
  var inputsLogin = document.querySelectorAll('#formLogin input.input').length

  // Como se hace arriba para el login, ahora para el registro:
  // Se extraen el número de campos OK del Registro
  // TODO
  // Se extraen el número total de campos del Registro
  // TODO

  if (inputsLoginOK === inputsLogin) {
    // Si hay el mismo número de campos OK que el total, el botón se habilita
    document.querySelector('#formLogin .button').removeAttribute('disabled')
  } else {
    // Si existen menos campos OK, hay alguno en error o incompleto. Se deshabilita el botón
    document.querySelector('#formLogin .button').setAttribute('disabled', 'disabled')
  }

  // TODO Gestionar botón Registro
  // Si hay el mismo número de campos OK que el total, el botón se habilita
  // TODO
  // Si existen menos campos OK, hay alguno en error o incompleto. Se deshabilita el botón

  // Ocultamos el mensaje de error de Login por si se había mostrado
  document.getElementById('msgErrorLogin').classList.add('is-hidden')
}

/**
 * Se solicita al servidor si el nombre usuario está disponible
 * @param {HTMLInputElement} input
 * @param {function} resolve
 * @param {function} reject
 */
function validarUsuarioEnUso (input, resolve, reject) {
  // TODO Se hace una petición GET para validar el nombre del usuario en el input
  // TODO Si el usuario está disponible resolvemos con true
  // TODO Si existe un error, pasamos a reject el código del error: error.response.status
}

/**
 * Esta función gestiona el evento del envio del formulario de Login
 * @param {Event} event
 */
function loginUsuario (event) {
  // Cancelamos que el FORM se envíe de forma normal
  event.preventDefault()
  // Deshabilitamos inputs y mostrarmos animación de carga en el botón
  this.querySelectorAll('input.input').forEach(input => input.setAttribute('disabled', 'disabled'))
  this.querySelector('.button').classList.add('is-loading')

  // Extraemos los valores del nombre de usuario y contraseña
  var usernamePlain = document.getElementById('txtLoginUsuario').value.trim().toLowerCase()
  var passwordPlain = document.getElementById('txtLoginContrasenya').value.trim()

  // Ciframos los valores antes de su envío (la API lo necesita de esta forma)
  var hash = new jsSHA('SHA-256', 'TEXT')
  hash.update(usernamePlain)
  var usernameSha256Base64 = hash.getHash('B64')
  hash = new jsSHA('SHA-256', 'TEXT')
  hash.update(passwordPlain)
  var passwordSha256Base64 = hash.getHash('B64')

  // Creamos el objeto de datos para su envío
  var datosLogin = {
    username: usernameSha256Base64,
    password: passwordSha256Base64
  }
  var form = this
  // TODO  Realizamos la solicitud POST al servidor con los datosLogin
  // TODO Login con éxito.
  // Guardamos los datos del servidor del usuario para futuras peticiones.
  localStorage.setItem('token', response.data.token)
  localStorage.setItem('id', response.data.id)
  localStorage.setItem('user', response.data.username)
  // Rediriginos a galería.html
  // TODO

  // TODO Login erroneo
  console.log('Login error: ', err)
  // Mostramos el mensaje de error del login
  document.getElementById('msgErrorLogin').classList.remove('is-hidden')
  // Volvemos a habilitar el botón y los campos para volverlos a utilizar
  form.querySelector('.button').classList.remove('is-loading')
  form.querySelectorAll('input.input').forEach(input => input.removeAttribute('disabled'))
}

/**
 * Esta función gestiona el evento del envio del formulario de Registro
 * @param {Event} event
 */
function registrarUsuario (event) {
  // Cancelamos que el FORM se envíe de forma normal
  // TODO
  var form = this
  // Deshabilitamos los campos y mostramos animación en el botón de registro
  form.querySelector('.button').classList.add('is-loading')
  form.querySelectorAll('input.input').forEach(input => input.setAttribute('disabled', 'disabled'))

  // Ocultamos los mensajes de registro OK y error
  document.querySelector('#mensajes-registro .is-success').classList.add('is-hidden')
  document.querySelector('#mensajes-registro .is-danger').classList.add('is-hidden')

  // Ciframos la contraseña para su envío (Requisito de la API)
  var passwordPlain = document.getElementById('txtContrasenya').value.trim()
  var hash = new jsSHA('SHA-256', 'TEXT')
  hash.update(passwordPlain)
  var passwordSha256Base64 = hash.getHash('B64')

  // Preparamos el objeto con los datos del registro
  var datosRegistro = {
    username: null // TODO 
    password: passwordSha256Base64,
    fullname: null // TODO
  }

  // Realizamos la petición POST para crear el usuario en el servidor
  // TODO
  .then(
    () => {
      // Registro correcto
      // Reiniciamos el formulario: habilitar campos, quitar contenido y reiniciar la validación
      form.querySelectorAll('input.input').forEach(input => {
        input.removeAttribute('disabled')
        input.value = ''
        input.dispatchEvent(new Event('input'))
      })
      // Quitamos la animación del botón
      form.querySelector('.button').classList.remove('is-loading')
      // Mostramos el mensaje de registro OK
      document.querySelector('#mensajes-registro .is-success').classList.remove('is-hidden')
      // Actualizamos botones para que se desactive el botón de registro de nuevo
      actualizarEstadosBotones()
    }
  ).catch(
    err => {
      // Error de registro
      console.log('Error POST:', err)
      // Quitamos la animación de carga del botón
      form.querySelector('.button').classList.remove('is-loading')
      // Volvemos a habilitar los campos
      form.querySelectorAll('input.input').forEach(input => input.removeAttribute('disabled'))
      // Mostramos el mensaje de error de registro
      document.querySelector('#mensajes-registro .is-danger').classList.remove('is-hidden')
    }
  )
}
