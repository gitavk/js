const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')

let timeLeft = document.querySelector('#time-left')
let score = document.querySelector('#score')

let result = 0
let currentTime = 10

squares.forEach(square => (
  square.addEventListener('mousedown', () => {
    if (square.classList.contains('mole')){
      result++;
      score.textContent = result;
    }
  })
))

function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('mole')
  });

  let randomPosition = squares[Math.floor(Math.random() * squares.length)]
  randomPosition.classList.add('mole')
}

function clearClick() {
  squares.forEach(square => (
    square.removeEventListener('mousedown')
  ))
}

moveMole = setInterval(randomSquare, 1000)

function countDown(){
  currentTime--;
  timeLeft.textContent = currentTime;
  if (currentTime == 0) {
    clearInterval(countDownTimerId);
    clearInterval(moveMole)
  }
}

let countDownTimerId = setInterval(countDown, 1000)
