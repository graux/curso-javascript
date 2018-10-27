var spanMouseX = document.getElementById('spanMouseX')
var spanMouseY = document.getElementById('spanMouseY')
var buttonGravity = document.getElementById('buttonGravity')
var ball = document.getElementById('ball')
ball.height = 60
ball.width = 60
ball.isPressed = false
Object.defineProperty(ball, 'posX', {
  set: function (x) {
    this.x = x
    this.style.left = x + 'px'
  },
  get: function () {
    return this.x
  }
})
Object.defineProperty(ball, 'posY', {
  set: function (y) {
    this.y = y
    this.style.top = y + 'px'
  },
  get: function () {
    return this.y
  }
})

Object.defineProperty(ball, 'bottom', {
  get: function () {
    return this.y + ball.height
  }
})
Object.defineProperty(ball, 'right', {
  get: function () {
    return this.x + ball.width
  }
})

ball.posX = 500
ball.posY = 100
ball.clickOffsetX = 0
ball.clickOffsetY = 0
ball.gravityInterval = null
ball.speedX = 0
ball.speedY = 0
ball.prevX = 0
ball.prevY = 0

ball.mouseDown = function (ev) {
  ball.style.backgroundColor = 'crimson'
  ball.isPressed = true
  ball.clickOffsetX = ev.offsetX
  ball.clickOffsetY = ev.offsetY
}

ball.mouseUp = function (ev) {
  ball.style.backgroundColor = 'brown'
  ball.isPressed = false
}

ball.mouseMove = function (ev) {
  spanMouseX.innerText = ev.clientX
  spanMouseY.innerText = ev.clientY
  if (ball.isPressed) {
    ball.posX = ev.clientX - ball.clickOffsetX
    ball.posY = ev.clientY - ball.clickOffsetY
  }
}
ball.toggleGravity = function (ev) {
  this.classList.toggle('is-active')
  if (this.classList.contains('is-active')) {
    ball.enableGravity()
  } else {
    ball.disableGravity()
  }
}
ball.enableGravity = function () {
  ball.prevX = ball.x
  ball.prevY = ball.y
  ball.gravityInterval = setInterval(ball.gravityStep, 20)
}
ball.disableGravity = function () {
  clearInterval(ball.gravityInterval)
  ball.gravityInterval = null
}
ball.gravityStep = function () {
  if (ball.isPressed) {
    if (ball.x !== ball.prevX) {
      ball.speedX = ball.x - ball.prevX
    }
    ball.prevX = ball.x
    if (ball.y !== ball.prevY) {
      ball.speedY = ball.y - ball.prevY
    }
    ball.prevY = ball.y
    return
  }
  ball.speedY += 9.81 * 0.2
  ball.speedX *= 0.98
  var newPosX = ball.x + ball.speedX
  var newPosY = ball.y + ball.speedY
  if (ball.bottom > window.innerHeight) {
    newPosY = window.innerHeight - ball.height
    ball.speedY *= -0.7
  }
  if (ball.posX < 0) {
    newPosX = 0
    ball.speedX *= -0.93
  } else if (ball.right > window.innerWidth) {
    newPosX = window.innerWidth - ball.width
    ball.speedX = ball.speedX * -0.93
  }
  if (ball.bottom >= window.innerHeight && Math.abs(ball.speedY) < 5) {
    ball.speedY = 0
  } else {
    ball.posY = newPosY
  }
  ball.posX = newPosX
}

ball.addEventListener('mousedown', ball.mouseDown)
document.addEventListener('mouseup', ball.mouseUp)
document.addEventListener('mousemove', ball.mouseMove)
buttonGravity.addEventListener('click', ball.toggleGravity)
