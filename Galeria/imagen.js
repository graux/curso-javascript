// Al cargar la página, llamamos a inicializarDetallesImagen
// TODO

// Inicializamos variables globales
var imgID = null
var token = null
var userID = null
var userName = null
var animacionCarga = null
var marcoImagen = null
var btnLikeImage = null
var datosImagen = null
var nuevoComentario = null
var timeoutCargarDetalles = null

/**
 * Se ejecuta una vez al cargar la página.
 */
function inicializarDetallesImagen () {
  imgID = getImageID()
  // Si no existe o no es válido el ID de la imagen en la URL, se redirige a gallery.html
  if (isNaN(imgID) || imgID <= 0) {
    // TODO
  } else {
    // Se inicializan variables globales desde localStorage: token, userID y userName
    // TODO
    // TODO
    // TODO

    // Se inicializan variables DOM
    animacionCarga = document.querySelector('.loading')
    marcoImagen = document.querySelector('figure.image')
    btnLikeImage = document.getElementById('btnLikeImage')

    // Se inicializan Eventos
    btnLikeImage.addEventListener('click', onClickLike)

    // Se piden los detalles de la imagen al servidor
    cargarDetallesImagen()

    // Se pide al servidor si el usuario Likes la imagen
    comprobarUsuarioLikesImagen()

    // Se inicilizan los comentarios
    inicializarComentarios()
  }
}

/**
 * Esta función devuelve el ID de la image de la URL
 * ?image_id=1 devuelve el valor del parámetro de URL image_id, 1 como Number, no como string
 * Los parametros de la URL están en: window.location.search
 */
function getImageID () {
  // TODO Se puede implementar trabjando con strings
  // TODO o mediante expresiones regulares
}

/**
 * Solicitar al Servidor los detalles de la imagen
 */
function cargarDetallesImagen () {
  // Petición GET al servidor para recuperar los datos de la imagen
  // TODO
  // Petición OK
    // Los datos se recuperan y guardan en la variable global: datosImagen
    // TODO
    // Se oculta la animacionCarga
    animacionCarga.classList.add('is-hidden')
    // Se busca el elemento img de la página
    var img = marcoImagen.querySelector('img')
    // Se cambia el atributo SRC de la imagen con la url de la imagen
    img.setAttribute('src', null) // TODO, reemplazar null por la URL de la imagen
    // Se cambia el artributo ALT con la descripción de la imagen
    img.setAttribute('alt', null) // TODO, reemplazar null por la descripción de la imagen
    // Cargamos la descripción de la imagen en tagDescripcion
    document.getElementById('tagDescripcion').innerText = null // TODO, reemplazar null por la descripción de la imagen
    // Cargamos el número de likes en tagNumLikes
    document.getElementById('tagNumLikes').innerText = null // TODO, reemplazar null por el número de likes de la imagen
    // Cargamos el número de comentarios en tagNumComentarios
    // TODO, Buscar el elemento tag de número de comentarios y asignar el valor de número de comentarios de la imagen

    // Si existe un timeout de regarga, lo reseteamos
    if (timeoutCargarDetalles) {
      clearTimeout(timeoutCargarDetalles)
    }
    // Cargamos los detalles cada minuto
    timeoutCargarDetalles = // TODO
    
  // Petición Error
    // TODO
    // Si hay un error ocultamos la animación de carga
    // Habría que mostrar un mensaje de error de carga 
}

/**
 * Esta función pide al servidor si el usuario actual Likes la imagen abierta
 */
function comprobarUsuarioLikesImagen () {
  // Petición GET para recuperar el estado de Like
  // Si OK
  // Mostrar el corazón completo añadiendo al botón btnLikeImage la clase 'is-liked'
  // TODO

  // Si el código de estado de respuesta es 404, ocultar el corazón completo
  // TODO
  // Ocultar el corazón completo eliminando del botón btnLikeImage la clase 'is-liked'
  // TODO
  // Si es otro error, mostrar el error en consola
  // TODO
}

/**
 * Función que gestión los clicks del botón btnLikeImage
 */
function onClickLike () {
  // Si actualmente la imagen está Liked por el usuario actual, llamar a unLikeImagen()
  // TODO
  // Si no, es decir, la imagen no está Liked por el usuario actual, llamar a likeImagen()
  // TODO
}

/**
 * Esta función hace un POST al servidor para likear la imagen
 */
function likeImagen () {
  // Petición POST
  // TODO
  // Petición OK
  // Actualizar el estado del corazón y recargarlos detalles de la imagen.
  // TODO
  // Si error, mostrar el error en consola
  // TODO
}

/**
 * Esta función elimina el Like de la imagen del usuario actual mediante una petición DELETE
 */
function unLikeImagen () {
  // Petición DELETE
  // Si OK
  // Actualizar el estado del corazón y recargarlos detalles de la imagen.
  // TODO
  // Si error, mostrar el error en consola
  // TODO
}

/**
 * Inicializa los elementos para comentarios
 */
function inicializarComentarios () {
  // Inicializar variables con objetos del DOM
  nuevoComentario = null // TODO inicializar variable
  nuevoComentario.querySelector('.autorUsuario').innerText = userName
  nuevoComentario.querySelector('textarea').addEventListener('input', validarComentario)
  nuevoComentario.querySelector('button').addEventListener('click', onNuevoComentarioClick)
  // Cargar los comentarios
  cargarComentarios()
}

/**
 * Función que solicita y carga en pantalla los comentarios
 */
function cargarComentarios () {
  // Petición GET al servidor para cargar los comentarios
  // TODO
  // Inicializar los elementos necesarios del DOM
  var plantillaComentario = document.getElementById('plantillaComentario')
  var marcoComentarios = document.getElementById('marcoComentarios')
  // Elminamos los comentarios cargados anteriormente
  marcoComentarios.querySelectorAll('.comentario:not(#plantillaComentario)').forEach(c => c.remove())
  moment.locale('es')
  // Para cada comentario, generar un comentario.
  // TODO
    var datosComentario = null // TODO
    var newCom = document.createElement('article')
    newCom.classList.add('media', 'comentario')
    newCom.innerHTML = plantillaComentario.innerHTML
    newCom.querySelector('.contenido').innerText = null // TODO 
    newCom.querySelector('.tiempo').innerText = moment.duration(moment(datosComentario.datetime).diff(moment())).humanize()
    newCom.querySelector('.autorUsuario').innerText = null // TODO username
    newCom.querySelector('.autorUsuario').setAttribute('href', 'usuario.html?user_id=' + datosComentario.user_id)
    newCom.querySelector('.autorNombre').innerText = null // TODO fullname
    // Si el usuario actual es el autor del comentario...
    // TODO
    // mostrar el botón eliminar
    var btnEliminar = // TODO
    // guardamos la referencia a los datos del comentario en el botón de eliminar
    btnEliminar.comentario = // TODO
    // añadimos un evento click al botón para que llame a la función eliminarComentario si se hace click
    // TODO
    // Si no es el usuario actual el autor
    // TODO
    // Ocultar el botón eliminar
    // TODO
      
    // Se inserta el comentario en la lista de comentarios
    marcoComentarios.insertBefore(newCom, nuevoComentario)
    // Se recargan los comentarios cada minuto
    // TODO
  
  // Petición ERROR
  // Mostrar en consola el error de carga de comentarios
  // TODO
}

/**
 * Validación del TextArea del comentario
 * @param {HTMLTextAreaElement} input 
 */
function validarComentario (input) {
  // Si input es un evento...
  if (input instanceof Event) {
    // acceder al campo del evento
    input = input.target
  }
  // Validar que el contenido tiene entre 3 y 1000 carácteres
  var valido = null // TODO

  // Ocultamos los mensajes de validación
  nuevoComentario.querySelectorAll('.help').forEach(h => h.classList.add('is-hidden'))
  if (valido) {
    // Mostramos el mensaje de OK si la validación es satisfactoria
    // TODO
  } else {
    // Mostramos el mensaje de Error si la validación falla
    // TODO
  }

  // Devolvemos el resultado de la validación
  return valido
}

/**
 * Función para gestionar el click del botón de crear nuevo comentario
 */
function onNuevoComentarioClick () {
  // Inicializamos una variable con el textarea
  var areaComentario = nuevoComentario.querySelector('textarea')
  // Validamos el text area antes de continuar
  // TODO
  // Accedemos al botón del comentario y mostramos animación de carga
  var botonComentario = nuevoComentario.querySelector('button')
  // Mostrar animación de carga en el botón
  botonComentario.classList.add('is-loading')
  // Desactivar el textarea
  areaComentario.setAttribute('disabled', 'disabled')
  var comentario = areaComentario.value.trim()
  // Preparar el objeto comentario para enviarlo al servidor
  var datosComentario = null // TODO

  // Petición POST al servidor con los datos del comentario
  // TODO
  // Petición OK
  // TODO
  // Si la petición funciona
  // Reiniciar los campos del comentario: valor, activo y validación
  areaComentario.value = ''
  areaComentario.removeAttribute('disabled')
  // Quitar al botón la animación de carga
  botonComentario.classList.remove('is-loading')
  nuevoComentario.querySelectorAll('.help').forEach(h => h.classList.add('is-hidden'))
  // Cargar de nuevo los comentarios y los detalles de la imagen
  // TODO 
  // TODO

  // Petición ERROR
  // TODO
  // Si falla la petición, mostrar el error en consola
  console.log('Error creando comentario', error)
  // Habilitar de nuevo el campo y el botón
  areaComentario.removeAttribute('disabled')
  botonComentario.classList.remove('is-loading')
}

/**
 * Elemina un comentario del usuario actual
 */
function eliminarComentario () {
  // Extraer el ID del comentario a borrar
  // TODO
  // Petición DELETE para borrar el comentario
  // TODO
  // Si se elimina el comentario
  // Cargar de nuevo los comentarios y los detalles de la imagen
  // TODO

  // Si falla la petición, mostrar el error en consola
  // TODO
}
