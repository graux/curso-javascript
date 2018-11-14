window.onload = inicializarGaleria
var token = null
var userID = null
var userName = null
var animacionCarga = null
var msgNoImagenes = null
var msgErrorImagenes = null
var galeria = null
var btnSignOut = null
var inputFoto = null
var nuevaImagen = null
var timeoutRecargaGaleria = null

/**
 * Se inicializa la galería al cargar la página
 */
function inicializarGaleria() {
  // Recuperamos los datos de localStorage para futuras peticiones
  token = null // TODO
  userID = null // TODO
  userName = null // TODO

  // TODO
  // Si no hay token redirigir a index.html
  // Si hay token, inicializar elementos DOM
  animacionCarga = document.querySelector('.loading')
  msgNoImagenes = document.getElementById('msgNoImagenes')
  msgErrorImagenes = document.getElementById('msgErrorImagenes')
  galeria = document.getElementById('galeria')
  btnSignOut = document.getElementById('btnSignOut')
  inputFoto = document.querySelector('input[type=file]')
  var modal = document.getElementById('modalNuevaImagen')
  // Añadimos eventos a los botones de cierre del modal
  modal.querySelectorAll('.cerrar-modal').forEach(
    btn => btn.addEventListener('click', function () {
      modal.classList.remove('is-active')
    })
  )
  // Añadimos los eventos de click al botón del modal
  modal.querySelector('button.is-success').addEventListener('click', postImagen)
  // Añadimos el evento al input del modal
  modal.querySelector('input.input').addEventListener('input', validarInputDescripcion)

  // Añadimos el evento al boton para cerrar y salir de la galería -> cerrarGaleria
  // TODO

  // Añadimos el evento para crear la imagen
  inputFoto.addEventListener('change', onFileUpload)

  // Cargamos las imágenes de la galería
  cargarImagenesGaleria()
}

/**
 * Carga la información de las imágenes desde el servidor
 */
function cargarImagenesGaleria() {
  // Se hace la petición GET al servidor
  // TODO
  // Petición OK
  // Si no hay imágenes, mostrar msgNoImagenes
  // TODO
  // Si ha imágenes mostrarlas
  mostrarImagenes(response.data)
  // Ocultar la animación de carga
  animacionCarga.classList.add('is-hidden')

  // Si existe un timeout de regarga, lo reseteamos
  if (timeoutRecargaGaleria) {
    clearTimeout(timeoutRecargaGaleria)
  }
  // Cargamos las imágenes cada 30 segundos, por si nuevas imágenes se suben
  timeoutRecargaGaleria = null // TODO

  // Petición ERROR
  // TODO
  // TODO Mostramos por consola el error
  // Ocultamos la animación de carga
  animacionCarga.classList.add('is-hidden')
  // Mostrar el mensaje de error de carga de imágenes msgErrorImagenes
  msgErrorImagenes.classList.remove('is-hidden')
}

/**
 * Función que genera las imágenes en HTML usando un array con los datos de las imágenes
 * @param {Array} imagenes
 */
function mostrarImagenes(imagenes) {
  var img = null
  // Vaciamos la Galería
  galeria.innerHTML = ''
  // Recorremos los cada una de las imágenes
  // TODO
  // Se genera el HTML para cada imagen: div.column, div.box, figure.image, img y nav.level
  img = null // TODO img es la variable para cada elemento del array imagenes
  var divCol = document.createElement('div')
  divCol.classList.add('column', 'is-3')
  var box = document.createElement('div')
  box.classList.add('box')
  var figure = document.createElement('figure')
  figure.classList.add('image')
  var image = document.createElement('img')
  image.setAttribute('title', img.description)
  image.setAttribute('src', img.lowres_url)
  // Extraemos el número de likes y número de comentarios de img
  var numLikes = null // TODO
  var numComments = null // TODO
  var bottomBar = createLevel(
    createIconTags('fa-heart', numLikes, 'is-danger', 'is-dark'),
    createIconTags('fa-comment', numComments, 'is-info', 'is-dark')
  )
  bottomBar.classList.add('bottom-bar')

  figure.appendChild(image)
  box.appendChild(figure)
  box.appendChild(bottomBar)
  divCol.appendChild(box)
  galeria.appendChild(divCol)
  // Guardamos los datos de la imagen en una propiedad del box
  box.imagen = img
  // Se añade el evento click al Box -> clickImagen
  // TODO
}

/**
 * Función para gestionar los clicks en las imágenes
 */
function clickImagen() {
  // Se redirige a image.html pasando como parámetro la ID de la imagen con el parámentro en URL: image_id
  // TODO
}

/**
 * Función para cerrar y salir de la Galería
 */
function cerrarGaleria() {
  // Borrar localStorage
  // TODO
  // Redirigir a index.html
  // TODO
}

/**
 * Función para gestionar la subida de una nueva imagen
 * @param {Event} event
 */
function onFileUpload(event) {
  // Si se ha elegido una imagen
  if (this.files && this.files[0]) {
    // Declarar variables del modal
    var modalNuevaImagen = document.getElementById('modalNuevaImagen')
    var img = modalNuevaImagen.querySelector('img')
    // Se extrae la imagen
    nuevaImagen = this.files[0]
    var reader = new FileReader()
    // Evento de que la imagen se cargue en el navegador
    reader.onload = function (e) {
      // Al cargarse la imagen, mostrar la imagen en la vista previa
      img.setAttribute('src', e.target.result)
      // Mostrar el modal
      modalNuevaImagen.classList.add('is-active')
    }
    // Cargar la imagen en el Navegador
    reader.readAsDataURL(nuevaImagen)
  }
}

/**
 * Función de validación del Input de la descripción de la imagen
 * @param {HTMLInputElement} input
 */
function validarInputDescripcion(input) {
  // Extraer el input del evento, si es un evento
  if (input instanceof Event) {
    input = input.target
  }
  // Extraer la descripción
  var desc = null // TODO
  // Declarar la Expresión de validación
  var regEx = null // TODO
  var parent = input.parentNode.parentNode
  // Ocultar todos los mensajes de validación
  parent.querySelectorAll('.help').forEach(h => h.classList.add('is-hidden'))
  var resultado = null
  if (desc.length === 0) {
    // Si no tiene contenido, mostrar un icono
    updateIcon(input, 'fa-ellipsis-h')
    // Asignar el resultado de la validación
    resultado = false
  } else if (regEx.test(desc)) {
    // Si la validación es correcta, mostrar el mensaje e icono de validación correcta
    parent.querySelector('.help.is-success').classList.remove('is-hidden')
    updateIcon(input, 'fa-check', 'has-text-success')
    // Asignar el resultado de la validación
    resultado = null // TODO
  } else {
    // Si la validación NO es correcta, mostrar el mensaje e icono de error de validación
    parent.querySelector('.help.is-danger').classList.remove('is-hidden')
    updateIcon(input, 'fa-exclamation', 'has-text-danger')
    // Asignar el resultado de la validación
    resultado = null // TODO
  }
  // TODO Devolver el resultado de la validación
}

/**
 * Función encargada de llamar al servidor y publicar una nueva imagen
 */
function postImagen() {
  // Accedemos al modal y a la descripción
  var modal = document.querySelector('#modalNuevaImagen')
  var descInput = modal.querySelector('input.input')
  // Comprobar que existe una imagen y una descripción
  if (nuevaImagen && validarInputDescripcion(descInput)) {
    // Desactivar el input
    descInput.setAttribute('disabled', 'disabled')
    var btnCrearImagen = this
    // Mostrar animación en el botón
    btnCrearImagen.classList.add('is-loading')
    // Hacer la petición POST al servidor con la imagen y la descripción como parámetro en la URL. La petición no es JSON
    axios.post(apiPrefix + 'gallery/images/?token=' + token + '&account_id=' + userID + '&description=' + descInput.value.trim(), nuevaImagen,
      {
        headers: {
          'Content-Type': nuevaImagen.type
        }
      })
      .then(
        function () {
          // La imagen se ha creado correctamente
          // Reiniciar el input de descripción: activo, contenido y errores.
          // TODO quitar atributo disabled de descInput
          // TODO borrar el contenido de descInput
          descInput.dispatchEvent(new Event('input'))
          // Quitar la animación del botón
          btnCrearImagen.classList.remove('is-loading')
          // Quitar la animación de carga general
          animacionCarga.classList.remove('is-hidden')
          // Ocultar el Modal
          modal.classList.remove('is-active')
          // Regargar las imagenes de la galería, para mostrar la nueva imagen
          // TODO
        }
      )
      .catch(
        function (err) {
          // Error creando la imagen
          console.log(err)
          // Habilitar el input y botón
          descInput.removeAttribute('disabled')
          btnCrearImagen.classList.remove('is-loading')
          animacionCarga.classList.add('is-hidden')
        }
      )
  }
}
