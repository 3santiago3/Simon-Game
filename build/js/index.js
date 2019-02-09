'use strict'

var order = [] // the order of the lights on how they are going to flash

var playerOrder = [] // the order that the player is pressing the lights in

var flash // the number of flashes, it means how many times should the lights flash

var turn // what turn we are on

var good // whether the player is doing well or not

var compTurn // whether it's the computer's turn or the player's turn

var intervalId
var strict = false // has the strict button been checked

var noise = true
var on = false // has the power button been checked (if the program has been turned on), if on equals true, the player can start pressing color buttons 

var win
var turnCounter = document.querySelector('#turn')
var topLeft = document.querySelector('#topleft')
var topRight = document.querySelector('#topright')
var bottomLeft = document.querySelector('#bottomleft')
var bottomRight = document.querySelector('#bottomright')
var strictButton = document.querySelector('#strict')
var onButton = document.querySelector('#on')
var startButton = document.querySelector('#start')
strictButton.addEventListener('change', function () {
  strict = strictButton.checked
})
onButton.addEventListener('change', function () {
  on = onButton.checked

  if (on) {
    turnCounter.innerHTML = '-'
  } else {
    turnCounter.innerHTML = ''
    clearColor()
    clearInterval(intervalId)
  }
})
startButton.addEventListener('click', function () {
  if (on || win) {
    play()
  }
})

function play() {
  win = false
  order = []
  playerOrder = []
  flash = 0
  intervalId = 0
  turn = 1
  turnCounter.innerHTML = 1
  good = true // the player hasn't hit anything incorrect yet

  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1)
  }

  compTurn = true
  intervalId = setInterval(gameTurn, 800)
}

function gameTurn() {
  // whenever on equals false the player cannot click any of these color buttons
  on = false // if the number of times the lights have flashed equals the turn that we're on that means the computer's turn is over

  if (flash == turn) {
    clearInterval(intervalId)
    compTurn = false
    clearColor()
    on = true
  }

  if (compTurn) {
    clearColor()
    setTimeout(function () {
      switch (order[flash]) {
      case 1:
        one()
        break

      case 2:
        two()
        break

      case 3:
        three()
        break

      case 4:
        four()
        break
      }

      flash++
    }, 200)
  }
}

function one() {
  if (noise) {
    var audio = document.getElementById('clip1')
    audio.play()
  }

  noise = true
  topLeft.style.backgroundColor = 'lightgreen'
}

function two() {
  if (noise) {
    var audio = document.getElementById('clip2')
    audio.play()
  }

  noise = true
  topRight.style.backgroundColor = 'tomato'
}

function three() {
  if (noise) {
    var audio = document.getElementById('clip3')
    audio.play()
  }

  noise = true
  bottomLeft.style.backgroundColor = 'yellow'
}

function four() {
  if (noise) {
    var audio = document.getElementById('clip4')
    audio.play()
  }

  noise = true
  bottomRight.style.backgroundColor = 'lightskyblue'
}

function clearColor() {
  topLeft.style.backgroundColor = 'darkgreen'
  topRight.style.backgroundColor = 'darkred'
  bottomLeft.style.backgroundColor = 'goldenrod'
  bottomRight.style.backgroundColor = 'darkblue'
}

topLeft.addEventListener('click', function () {
  if (on) {
    playerOrder.push(1)
    check()
    one()

    if (!win) {
      setTimeout(function () {
        clearColor()
      }, 300)
    }
  }
})
topRight.addEventListener('click', function () {
  if (on) {
    playerOrder.push(2)
    check()
    two()

    if (!win) {
      setTimeout(function () {
        clearColor()
      }, 300)
    }
  }
})
bottomLeft.addEventListener('click', function () {
  if (on) {
    playerOrder.push(3)
    check()
    three()

    if (!win) {
      setTimeout(function () {
        clearColor()
      }, 300)
    }
  }
})
bottomRight.addEventListener('click', function () {
  if (on) {
    playerOrder.push(4)
    check()
    four()

    if (!win) {
      setTimeout(function () {
        clearColor()
      }, 300)
    }
  }
})

function check() {
  // 你点击的那一项，就是 playerorder 的最后一项
  // playerorder 的最后一项的数字不等于 order 对应的那一项的数字
  // 将 good 设置为 false
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
    good = false
  }

  if (playerOrder.length == 3 && good) {
    winGame()
  }

  if (good == false) {
    flashColor()
    turnCounter.innerHTML = 'NO!'
    setTimeout(function () {
      turnCounter.innerHTML = turn
      clearColor()

      if (strict) {
        play()
      } else {
        compTurn = true
        flash = 0
        playerOrder = []
        good = true
        intervalId = setInterval(gameTurn, 800)
      }
    }, 800)
    noise = false
  }

  if (turn == playerOrder.length && good && !win) {
    turn++
    playerOrder = []
    compTurn = true
    flash = 0
    turnCounter.innerHTML = turn
    intervalId = setInterval(gameTurn, 800)
  }
}

function winGame() {
  flashColor()
  turnCounter.innerHTML = 'WIN!'
  on = false
  win = true
}

function flashColor() {
  topLeft.style.backgroundColor = 'lightgreen'
  topRight.style.backgroundColor = 'tomato'
  bottomLeft.style.backgroundColor = 'yellow'
  bottomRight.style.backgroundColor = 'lightskyblue'
}