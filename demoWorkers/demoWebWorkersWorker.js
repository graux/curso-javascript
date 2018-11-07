var index = 0

function timedCount () {
  index++
  postMessage(index)
  setTimeout(timedCount, 50)
}

timedCount()
