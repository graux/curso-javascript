window.onload = initTaskList
var userID = null

function initTaskList () {
  // TODO Comprobar y asignar el userID, mediante window.location.search
  if (!userID) {
    window.location = 'index.html'
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
