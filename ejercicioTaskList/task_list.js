window.onload = initTaskList
var userID = null
var user = null
var timeoutTareas = null
var prefijoAPI = 'https://tasklist.kydemy.com:9192/api/'
// var prefijoAPI = 'http://localhost:9192/api/'

function initTaskList() {
  // TODO Comprobar y asignar el userID, mediante window.location.search
  var userIDStr = /user_id=(\d+)/.exec(window.location.search.toString())
  if (userIDStr !== null && userIDStr.length >= 2) {
    userID = parseInt(userIDStr[1])
    if (!userID) {
      window.location = 'index.html'
    } else {
      cargarTareas()
      cargarUsuariosConectados()
      cargarUsuario()
    }
  } else {
    window.location = 'index.html'
  }
}

function cargarUsuario() {
  axios.get(prefijoAPI + 'users/' + userID + '/')
    .then(
      function (response) {
        user = response.data
        // Cada minuto le decimos al servidor que el usuario sigue en uso
        setInterval(mantenerUsuarioBloqueado, 1000 * 60)
      }
    )
    .catch(
      function (error) {
        console.log('No se pudo cargar el usuario', error)
      }
    )
}

function mantenerUsuarioBloqueado() {
  user.active = true
  axios.put(prefijoAPI + 'users/' + userID + '/', user)
    .then(
      function () {
        cargarUsuariosConectados()
      })
    .catch(
      function (error) {
        console.log('No se pudo bloquear el usuario', error)
      }
    )
}

function cargarTareas() {
  axios.get(prefijoAPI + 'tasks/')
    .then(
      function (response) {
        if (response.data.length > 0) {
          var task = null
          var contenedorTareas = document.getElementById('contenedorTareas')
          contenedorTareas.querySelectorAll('.column:not(#plantillaTarea)').forEach(t => contenedorTareas.removeChild(t))
          for (var index in response.data) {
            task = response.data[index]
            crearElementoTarea(task)
          }
        }
        if (timeoutTareas) {
          clearTimeout(timeoutTareas)
          timeoutTareas = null
        }
        timeoutTareas = setTimeout(cargarTareas, 60 * 1000)
      }
    )
    .catch(
      function (error) {
        console.log('Error cargando tareas', error)
      }
    )
}

function cargarUsuariosConectados() {
  axios.get(prefijoAPI + 'users/')
    .then(
      function (response) {
        if (response.data.length > 0) {
          var user = null
          var itemLi = null
          var contenedorUl = document.getElementById('contenedorUsuarios')
          contenedorUl.innerHTML = ''
          for (var index in response.data) {
            user = response.data[index]
            if (user.active) {
              itemLi = document.createElement('li')
              itemLi.innerText = user.name
              contenedorUl.appendChild(itemLi)
            }
          }
          setTimeout(cargarUsuariosConectados, 1000 * 60)
        }
      }
    )
    .catch(
      function (error) {
        console.log('Error cargando usuarios', error)
      }
    )
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

function editarTarea(boton) {
  var seccion = boton.parentNode.parentNode
  var tarea = seccion.parentNode.parentNode.parentNode.tarea
  tarea.editor_id = userID
  axios.put(prefijoAPI + 'tasks/' + tarea.id + '/?user_id=' + userID, tarea)
    .then(function () {
      seccion.querySelector('.grupoBotonesEdicion').classList.remove('is-hidden')
      seccion.querySelector('.grupoBotonesNormal').classList.add('is-hidden')
      var spanDesc = seccion.parentNode.querySelector('.task-description span')
      var inputDesc = seccion.parentNode.querySelector('.task-description input.input-editor')
      inputDesc.classList.remove('is-hidden')
      spanDesc.classList.add('is-hidden')
      inputDesc.value = spanDesc.innerText
      inputDesc.focus()
    })
    .catch(function (error) {
      console.log('Error editando tarea', error)
      cargarTareas()
    })
}

function cancelarEditarTarea(boton) {
  var seccion = boton.parentNode.parentNode.parentNode
  seccion.querySelector('.grupoBotonesEdicion').classList.add('is-hidden')
  seccion.querySelector('.grupoBotonesNormal').classList.remove('is-hidden')
  var spanDesc = seccion.parentNode.querySelector('.task-description span')
  var inputDesc = seccion.parentNode.querySelector('.task-description input.input-editor')
  inputDesc.classList.add('is-hidden')
  spanDesc.classList.remove('is-hidden')

  var tarea = seccion.parentNode.parentNode.parentNode.tarea
  tarea.editor_id = null
  axios.put(prefijoAPI + 'tasks/' + tarea.id + '/?user_id=' + userID, tarea)
    .then(function () { cargarTareas() })
    .catch(function (error) {
      console.log('Error des-editando tarea', error)
      cargarTareas()
    })
}

function crearTarea(boton) {
  // TODO
  // Conseguir la descripción de la tarea
  // Crear la nueva tarea mediante POST / REST
  // Recargar la lista de tareas
  // Animación Carga?
  var taskDescInput = document.querySelector('.task-description input.input')
  var taskDesc = taskDescInput.value.trim()
  var newTask = {
    description: taskDesc,
    done: false,
    owner_id: userID,
    editor_id: null
  }
  axios.post(prefijoAPI + 'tasks/', newTask)
    .then(function () {
      taskDescInput.value = ''
      taskDescInput.dispatchEvent(new Event('input'))
      cargarTareas()
    })
    .catch(function (error) {
      console.log('Error creando tarea', error)
    })
}

function guardarTarea(boton) {
  // TODO
  // Conseguir el ID y realizar la petición REST
  // Animación Carga?
  var col = boton.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
  var tarea = col.tarea
  tarea.description = col.querySelector('input.input').value.trim()
  axios.put(prefijoAPI + 'tasks/' + tarea.id + '/?user_id=' + userID, tarea)
    .then(function () { cargarTareas() })
    .catch(function (error) { console.log('Error editando tarea', error) })
}

function borrarTarea(boton) {
  // TODO
  // Conseguir el ID y realizar la petición REST
  // Animación Carga?
  var tarea = boton.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.tarea
  axios.delete(prefijoAPI + 'tasks/' + tarea.id + '/?user_id=' + userID)
    .then(function () { cargarTareas() })
    .catch(function (error) { console.log('Error borrando tarea', error) })
}

function toggleTarea(cbx) {
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
  var tarea = col.tarea
  tarea.done = !completed
  axios.put(prefijoAPI + 'tasks/' + tarea.id + '/?user_id=' + userID, tarea)
    .then(function () {
      cargarTareas()
    })
    .catch(function (error) {
      console.log('Error cambiando estado tarea', error)
    })
}

function cerrarEditorTareas() {
  // TODO Actualizar el usuario para "liberarlo"
  // Redirigir al index.html
  user.active = false
  axios.put(prefijoAPI + 'users/' + userID + '/', user)
    .then(function () {
      window.location = 'index.html'
    })
    .catch(function (error) {
      console.log('Error desbloqueando usuario', error)
    })
}

function crearElementoTarea(tarea) {
  var plantilla = document.getElementById('plantillaTarea').innerHTML
  var nuevoElemento = document.createElement('div')
  nuevoElemento.classList.add('column', 'is-12')
  nuevoElemento.innerHTML = plantilla
  document.getElementById('contenedorTareas').append(nuevoElemento)

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
  nuevoElemento.querySelector('input.is-checkradio').checked = tarea.done
  if (tarea.done) {
    nuevoElemento.classList.add('is-completed')
  }
  if (tarea.editor_id !== null) {
    if (tarea.editor_id === userID) {
      nuevoElemento.querySelector('.botonEditar .button').dispatchEvent(new Event('click'))
    } else {
      nuevoElemento.querySelector('.botonEditar').classList.add('is-hidden')
      nuevoElemento.querySelector('.tagEditando').classList.remove('is-hidden')
    }
  }
  // TODO completar el contenido de la tarea
  nuevoElemento.querySelector('.task-description span').innerText = tarea.description
}

function validarDescripcion(input) {
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
