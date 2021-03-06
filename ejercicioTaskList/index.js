window.onload = initUserSelector
var usuarios = []
var loadingUsers
var contenedorUsuarios
var btnNuevoUsuario
var inputNuevoUsuario
// var prefijoAPI = 'http://localhost:9192/api/'
var prefijoAPI = 'https://tasklist.kydemy.com:9192/api/'

function initUserSelector () {
  loadingUsers = document.getElementById('loadingUsers')
  contenedorUsuarios = document.getElementById('contenedorUsuarios')
  btnNuevoUsuario = document.getElementById('btnNuevoUsuario')
  inputNuevoUsuario = document.getElementById('inputNuevoUsuario')

  btnNuevoUsuario.addEventListener('click', crearNuevoUsuario)
  inputNuevoUsuario.addEventListener('click', validarInputNuevoUsuario)

  getUsers()
}

function validarInputNuevoUsuario () {
  // TODO Validar el input.
  // Mostrar icono error y mensaje de error si el valor no es válido
  // Validar que el nombre no está en uso (comprobar sin importar minúsculas/mayúsculas)
  // Mostrar icono en verde y mensaje si el valor es OK
}

function crearNuevoUsuario () {
  // TODO Si es válido, crear el usuario
  // Petición POST a /api/users/
  // Si error, mostrar error
  // Si ok, vaciar el input, y volver a cargar la lista de usuarios para poder elegir el nuevo usuario
}

// Cargar todos los usuarios
function getUsers () {
  axios.get(prefijoAPI + 'users/').then(
    function (response) {
      loadUsers(response.data)
      loadingUsers.classList.add('is-hidden')
    }
  ).catch(
    function (err) {
      usuarios = []
      console.log('Error cargando usuarios: ', err)
      loadingUsers.classList.add('is-hidden')
    }
  )
}

function loadUsers (users) {
  usuarios = users
  console.log('Usuarios Cargados desde el Servidor/API: ' + users.length, users)
  var userBox = null
  var user = null
  for (var index in users) {
    user = users[index]
    userBox = generarBoxUsuario(user)
    userBox.addEventListener('click', userBoxClick)
    userBox.user = user
    contenedorUsuarios.appendChild(userBox)
  }
}

function generarBoxUsuario (user) {
  var elem = document.createElement('div')
  elem.classList.add('column', 'is-4')
  var box = document.createElement('div')
  box.classList.add('box', 'has-text-centered')
  var figure = document.createElement('figure')
  figure.classList.add('image', 'avatar', 'is-square')
  var inicial = document.createElement('span')
  inicial.innerText = user.name.substring(0, 1)
  figure.append(inicial)
  box.appendChild(figure)
  var tag = document.createElement('span')
  tag.classList.add('tag', 'is-medium')
  tag.innerText = user.name
  box.appendChild(tag)
  elem.appendChild(box)

  if (user.active) {
    box.classList.add('is-active')
    figure.style.background = '#CCC'
  } else {
    box.classList.add('is-available')
    figure.style.background = user.color
    tag.classList.add('is-dark')
  }

  return elem
}

function userBoxClick () {
  if (!this.classList.contains('is-available')) {
    var user = this.user
    user.active = true
    axios.put(prefijoAPI + 'users/' + user.id + '/', user)
      .then(
        function () {
          window.location = 'task_list.html?user_id=' + user.id
        }
      )
      .catch(
        function (error) {
          console.log('Error Selección usuario', error)
        }
      )
    // Primero: actualizar el estado del usuario 'active = true' en el servidor
    // Petición. PUT /api/users/
    // Segundo: redirigir al usuario al archivo task_list.html con el parámetro user_id.
    // El user_id tiene que ser el user_id del botón presionado: 'task_list.html?user_id=' + [ID]
  }
}
