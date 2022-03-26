const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.score')

const blockWidth = 100
const blockHeight = 20
const ballDiameter = 25

const boardWidth = 560
const boardHeight = 300

const userStart = [230, 10]
let currentPosition = userStart
const ballStart = [250, 30]
let ballPosition = ballStart

let xdirection = 2
let ydirection = 2

let score = 0

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topLeft = [xAxis, yAxis + blockHeight]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
  }
}

const blocks = [
  new Block(10, 270), new Block(120, 270), new Block(230, 270), new Block(340, 270), new Block(450, 270),
  new Block(10, 240), new Block(120, 240), new Block(230, 240), new Block(340, 240), new Block(450, 240),
  new Block(10, 210), new Block(120, 210), new Block(230, 210), new Block(340, 210), new Block(450, 210),
]

function addBlock(){
  for (let index = 0; index < blocks.length; index++) {
    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = blocks[index].bottomLeft[0] + 'px'
    block.style.bottom = blocks[index].bottomLeft[1] + 'px'
    grid.appendChild(block)
    
  }
}

addBlock()

// Create user
const user = document.createElement('div')
drawUser()
user.classList.add('user')
grid.appendChild(user)

function drawUser() {
  user.style.left = userStart[0] + 'px'
  user.style.bottom = userStart[1] + 'px'
}

function moveUser(e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10
        drawUser()
      }
      break;
    case 'ArrowRight':
      if (currentPosition[0] < 460) {
        currentPosition[0] += 10
        drawUser()
      }
      break;
  }
}
document.addEventListener('keydown', moveUser)

function drawBall() {
  ball.style.left = ballStart[0] + 'px'
  ball.style.bottom = ballStart[1] + 'px'
}

// add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

function moveBall() {
  ballPosition[0] += xdirection;
  ballPosition[1] += ydirection;
  drawBall();
  checkForCollisions();
}

let timerId = setInterval(moveBall, 20)

function checkForCollisions() {
  if (
    ballPosition[0] >= boardWidth - ballDiameter ||
    ballPosition[0] <= 0
  ) {
    changeDirection('x')
  }
  if ( ballPosition[1] >= boardHeight - ballDiameter) {
    changeDirection('y')
  }
  if ( ballPosition[1] <= 0 ) {
    clearInterval(timerId)
    document.removeEventListener('keydown', moveUser)
    scoreDisplay.innerHTML = 'You lose'
  }
  blockCollisions() 
  userCollisions()
}

function blockCollisions() {
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (
      (ballPosition[0] > block.bottomLeft[0] && ballPosition[0] < block.bottomRight[0]) &&
      ((ballPosition[1] + ballDiameter) > block.bottomLeft[1] && ballPosition[1] < block.topLeft[1])

    ) {
      const allBlocks = Array.from(document.querySelectorAll('.block'))
      allBlocks[i].classList.remove('block')
      blocks.splice(i, 1)
      changeDirection()
      score++
      scoreDisplay.innerHTML = score
      if (blocks.length === 0 ) {
        scoreDisplay.innerHTML = 'YOU WIN'
        clearInterval(timerId);
        document.removeEventListener('keydown', moveUser);
      
      }
    }
  }
}


function userCollisions() {
  if (
    (ballPosition[0] > currentPosition[0] && ballPosition[0] < currentPosition[0] + blockWidth) &&
    (ballPosition[1] > currentPosition[1] && ballPosition[1] < currentPosition[1] + blockHeight )
  ) {
    changeDirection()
  }  
}

function changeDirection(axis) {
  if (axis === 'x') {
    xdirection = -1 * xdirection;
  } else {
    ydirection = -1 * ydirection;
  }
}
