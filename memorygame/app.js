let cardArray = [
  {
    name: 'fries',
    img: 'images/fries.png',
  },
  {
    name: 'cheeseburger',
    img: 'images/cheeseburger.png',
  },
  {
    name: 'hotdog',
    img: 'images/hotdog.png',
  },
  {
    name: 'ice-cream',
    img: 'images/ice-cream.png',
  },
  {
    name: 'milkshake',
    img: 'images/milkshake.png',
  },
  {
    name: 'pizza',
    img: 'images/pizza.png',
  },
]
  cardArray = cardArray.flatMap(i => [i,i]);
  cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
const cardChosen = new Set([])
const cardChosenIds = new Set([])
const boardCards = []

function createBoard() {
 for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement('img')
    card.setAttribute('src', 'images/blank.png')
    card.setAttribute('data-id', i)
    card.addEventListener('click', flipCard)
    boardCards.push(card)
    gridDisplay.append(card)
 } 
}

createBoard()

function checkMatch() {
  if (cardChosen.size === 1) {
    alert('Right choose!')
    cardChosenIds.forEach( function(value){
      boardCards[value].removeEventListener('click', flipCard)
    })
  } else {
    cardChosenIds.forEach( function(value){
      boardCards[value].setAttribute('src', 'images/blank.png')
    })
  }
  cardChosen.clear();
  cardChosenIds.clear();
}

function flipCard() {
  const cardId = this.getAttribute('data-id')
  cardChosenIds.add(cardId)
  cardChosen.add(cardArray[cardId].name)
  this.setAttribute('src', cardArray[cardId].img)
  if (cardChosenIds.size === 2) {
    setTimeout(checkMatch, 500)
  }
}
