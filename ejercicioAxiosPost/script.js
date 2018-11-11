window.addEventListener('load', initForm)

function initForm () {
  initValidacion()
  document.querySelector('form').addEventListener('submit', onFormSubmit)
}

function initValidacion () {
  var inputs = document.getElementsByTagName('input')
  for (var index in inputs) {
    if (inputs[index].type === 'text' || inputs[index].type === 'password') {
      inputs[index].addEventListener('input', onInputChange)
    }
  }
  document.querySelector('form').addEventListener('submit', onFormSubmit)
}

function validateInput (inputid, value) {
  var valido = false
  switch (inputid) {
    case 'txtTitulo':
      valido = /\w{3,}/.test(value.trim())
      break
    case 'txtContenido':
      valido = /\w{3,}/.test(value.trim())
      break
  }
  return valido
}

function onInputChange () {
  var valido = validateInput(this.id, this.value)
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

function onFormSubmit (event) {
  event.preventDefault()
  var button = document.querySelector('input.button')
  button.classList.add('is-loading')
  var titulo = document.querySelector('#txtTitulo').value.trim()
  var contenido = document.querySelector('#txtContenido').value.trim()

  if (titulo !== '' && contenido !== '') {
    if (validateInput('txtTitulo', titulo) && validateInput('txtContenido', contenido)) {
      var objeto = {
        title: titulo,
        body: contenido,
        userId: 5
      }
      axios.post('https://jsonplaceholder.typicode.com/posts', objeto)
        .then(function (response) {
          document.getElementById('tagStatus').innerText = response.status
          document.getElementById('tagLocation').innerText = response.headers.location
          document.querySelector('div.message').classList.add('is-success')
          document.getElementById('responseBody').innerText = JSON.stringify(response.data)
          console.log(response)
          button.classList.remove('is-loading')
        })
        .catch(function (error) {
            console.log('ERROR', error)
          document.getElementById('tagStatus').innerText = error.response.status
          document.getElementById('tagLocation').innerText = '--'
          document.querySelector('div.message').classList.add('is-danger')
          document.getElementById('responseBody').innerText = '--'
          button.classList.remove('is-loading')
        })
    }
  }
}
