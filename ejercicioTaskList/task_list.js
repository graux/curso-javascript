window.onload = initTaskList
var userID = null

function initTaskList () {
  // TODO Comprobar y asignar el userID, mediante window.location.search
  if (!userID) {
    window.location = 'index.html'
  }
}
