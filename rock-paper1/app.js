const computerChoiceDisplay = document.getElementById('computer-choice')
const userChoiceDisplay = document.getElementById('user-choice')
const resultDisplay = document.getElementById('result')

const possibleChoices = document.querySelectorAll('button')

let userChoice
let computerChoice
let result

possibleChoices.forEach(possibleChoice => {

  possibleChoice.addEventListener('click',  (e) => {
   userChoice = e.target.id 
   userChoiceDisplay.innerHTML = userChoice
   generateComuterChois()
   getResult()
  })
  
});

function generateComuterChois() {
  const randomNumber = Math.floor(Math.random() * possibleChoices.length)
  computerChoice = possibleChoices[randomNumber].id
  computerChoiceDisplay.innerHTML = computerChoice 
}

function getResult() {
  if (computerChoice === userChoice) {
    result = 'it a draw'
  }
  if (computerChoice === 'rock' && userChoice === 'paper') {
    result = 'user win'
  }
  if (computerChoice === 'rock' && userChoice === 'scissors') {
    result = 'user lost'
  }
  if (computerChoice === 'paper' && userChoice === 'rock') {
    result = 'user lost'
  }
  if (computerChoice === 'paper' && userChoice === 'scissors') {
    result = 'user win'
  }
  if (computerChoice === 'scissors' && userChoice === 'paper') {
    result = 'user lost'
  }
  if (computerChoice === 'scissors' && userChoice === 'rock') {
    result = 'user win'
  }
  resultDisplay.innerHTML = result
}
