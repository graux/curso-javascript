window.onload = initTaskList
var userID = null

function initTaskList () {
  // TODO Comprobar y asignar el userID, mediante window.location.search
  if (!userID) {
    // window.location = 'index.html'
  }
}

// TODO Obtener la lista de usuarios y mostrar los activos.
// TODO Obtener la lista de tareas y mostrar las tareas por completar y en otra lista las completadas:
//  - Recuperar las tareas cada x segundos.
//  - Mostrar de otra forma las tareas que están siendo editadas por otros usuarios (y deshabilitar la edición.
// TODO Permitir crear nuevas tareas.
// TODO Permitir editar tarea:
//  - Al editar hacer petición PUT cambiado el valor de editor_id al usuario actual. PUT /api/tasks/[id]/
//  - Al editar una tarea mostrar opciones:guardar, cancelar o eliminar.
//  - Si se elige eliminar, realizar petición DELETE /api/tasks/[id]/
// TODO Opción para salir/desactivar usuario:
//  - Cambiar el valor de active a false: PUT /api/users/[id]/
//  - Redirigir a la pantalla anterior window.location = 'index.html'

function editarTarea (boton) {
  var seccion = boton.parentNode.parentNode
  seccion.querySelector('.grupoBotonesEdicion').classList.remove('is-hidden')
  seccion.querySelector('.grupoBotonesNormal').classList.add('is-hidden')
  var spanDesc = seccion.parentNode.querySelector('.task-description span')
  var inputDesc = seccion.parentNode.querySelector('.task-description input.input-editor')
  inputDesc.classList.remove('is-hidden')
  spanDesc.classList.add('is-hidden')
  inputDesc.value = spanDesc.innerText
  inputDesc.focus()
}

function cancelarEditarTarea (boton) {
  var seccion = boton.parentNode.parentNode.parentNode
  seccion.querySelector('.grupoBotonesEdicion').classList.add('is-hidden')
  seccion.querySelector('.grupoBotonesNormal').classList.remove('is-hidden')
  var spanDesc = seccion.parentNode.querySelector('.task-description span')
  var inputDesc = seccion.parentNode.querySelector('.task-description input.input-editor')
  inputDesc.classList.add('is-hidden')
  spanDesc.classList.remove('is-hidden')
}

function crearTarea (boton) {
  // TODO
  // Conseguir la descripción de la tarea
  // Crear la nueva tarea mediante POST / REST
  // Recargar la lista de tareas
  // Animación Carga?
}

function guardarTarea (boton) {
  // TODO
  // Conseguir el ID y realizar la petición REST
  // Animación Carga?
}

function borrarTarea (boton) {
  // TODO
  // Conseguir el ID y realizar la petición REST
  // Animación Carga?
}

function toggleTarea (cbx) {
  var col = cbx.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
  var completed = false
  if (col.classList.contains('is-completed')) {
    completed = true
    cbx.classList.remove('has-background-color')
    col.classList.remove('is-completed')
  } else {
    cbx.classList.add('has-background-color')
    col.classList.add('is-completed')
  }

  // TODO Obtener el ID de la tarea
  // PUT de la tarea para cambiar el estado.
  // Recargar la lista de tareas si la petición es OK
  // Mostrar animación carga?
}

function cerrarEditorTareas () {
  // TODO Actualizar el usuario para "liberarlo"
  // Redirigir al index.html
}

function crearElementoTarea (tarea) {
  var plantilla = document.getElementById('plantillaTarea').innerHTML
  var nuevoElemento = document.createElement('div')
  nuevoElemento.classList.add('column', 'is-12')
  nuevoElemento.innerHTML = plantilla
  document.getElementById('contenedorTareas').prepend(nuevoElemento)

  // Actualizamos el ID para que sea único, y el for del label para que apunte al nuevo ID
  var cbx = nuevoElemento.querySelector('input.is-checkradio')
  var label = nuevoElemento.querySelector('label')
  cbx.id = 'cbx_' + tarea.id
  label.attributes.for.value = cbx.id

  // Puedo guardar una tarea en una propiedad nueva del elemento
  nuevoElemento.tarea = tarea
  // O también puedo guardar el ID en un elemento oculto
  nuevoElemento.querySelector('input.inputTaskID').value = tarea.id

  // TODO marcar la tarea como completada si está completada
  nuevoElemento.querySelector('input.is-checkradio').checked = false
  // TODO completar el contenido de la tarea
  nuevoElemento.querySelector('.task-description span')
}

function validarDescripcion (input) {
  var valido = /^.{3,100}$/.test(input.value.trim())
  console.log('Valido ' + input.id + ': ', valido)
  var inputClassList = input.classList
  var rightIcon = input.parentElement.querySelector('.icon.is-right')
  var rightIconClassList = rightIcon.classList
  var errorMessage = input.parentElement.parentElement.querySelector('.help.is-danger')
  var okMessage = input.parentElement.parentElement.querySelector('.help.is-success')
  inputClassList.remove('is-warning', 'is-success', 'is-danger')
  rightIconClassList.remove('has-text-warning', 'has-text-success', 'has-text-danger')
  errorMessage.classList.add('is-hidden')
  okMessage.classList.add('is-hidden')
  var newIcon = document.createElement('i')
  if ((input.value.length === 0)) {
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
