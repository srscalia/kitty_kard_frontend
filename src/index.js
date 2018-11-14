// ******************** Variables ********************
const cardContainer = document.querySelector('#container')
let cardArray = [];
const row1 = document.querySelector('#row1')
const row2 = document.querySelector('#row2')
const row3 = document.querySelector('#row3')
const row4 = document.querySelector('#row4')
let firstCat;
let secondCat;
let firstCard;
let secondCard;
let firstEvent;
let secondEvent;
let flipCount = 0
const form = document.querySelector('form')
const player = document.querySelector('#player')
const welcomeBoard = document.querySelector('#index-banner')


// ******************** Event listeners**************

  cardContainer.addEventListener('click', function(event){
    if (event.target.localName === "img") {
      flipCard(event)
    }
  })

  form.addEventListener('submit', function(event){
    formEventHandler(event)
  })
// ******************** Helper functions **************
function fetchCards(){
  fetch('http://localhost:3000/api/v1/cards')
  .then(response=>response.json())
  .then((cards)=>{
    cardArray = cards
    cardArray = cardArray.concat(cardArray)
    shuffleArray(cardArray)
    addCardsToDom(cardArray)
  })
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function addCardsToDom(cardArray){
  cardArray.slice(0,4).forEach((card)=>{
    row1.innerHTML +=  `
    <div data-id='${card.id}' class='cardd'>
      <div class="card-image">
        <img src=${card.image_back} alt="cat logo">
      <div>
    </div>
    `
  })
  cardArray.slice(4,8).forEach((card)=>{
    row2.innerHTML +=  `
    <div data-id='${card.id}' class='cardd'>
      <div class="card-image">
        <img src=${card.image_back} alt="cat logo">
      <div>
    </div>
    `
  })
  cardArray.slice(8,12).forEach((card)=>{
    row3.innerHTML +=  `
    <div data-id='${card.id}' class='cardd'>
      <div class="card-image">
        <img src=${card.image_back} alt="cat logo">
      <div>
    </div>
    `
  })
  cardArray.slice(-4).forEach((card)=>{
    row4.innerHTML +=  `
    <div data-id='${card.id}' class='cardd'>
      <div class="card-image">
        <img src=${card.image_back} alt="cat logo">
      <div>
    </div>
    `
  })
}

function flipCard(event){
  flipCount=flipCount+1
  if (flipCount === 1) {
    let firstId = event.target.parentElement.parentElement.dataset.id
    firstCard = event.target.parentElement.parentElement
    firstEvent = event.target

    firstCat = cardArray.find((cat)=>{
      return cat.id == firstId
    })
    event.target.src = firstCat.image_front
  } else if (flipCount === 2) {
    let secondId = event.target.parentElement.parentElement.dataset.id
    secondCard = event.target.parentElement.parentElement
    secondEvent = event.target

    secondCat = cardArray.find((cat)=>{
      return cat.id == secondId
    })
    event.target.src = secondCat.image_front
    flipCount = 0
    setTimeout(function() { checkForMatch(); }, 500);
  }
}

function checkForMatch(){
  if (firstCat.id === secondCat.id) {
    secondCard.style.visibility='hidden'
    firstCard.style.visibility='hidden'
  } else {
    firstEvent.src = firstCat.image_back
    secondEvent.src = secondCat.image_back
  }
}

function formEventHandler(event){
  event.preventDefault()
  let name = event.target.querySelector('#input_text').value
  fetch('http://localhost:3000/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: name,
      wins: 0,
      losses: 0
    })
  }).then((response)=>{
    return response.json()
  }).then((json)=>{
    player.innerText= `${json.name}'s Game`
    form.reset()
    hideForm()
    revealGame()
  })
}

function hideForm(){
  welcomeBoard.style.display = 'none';
}

function revealGame(){
  cardContainer.style.display = 'flex';
}

setTimeout (start, 1000);
let i = 0

function start(){
  setInterval(increment, 1000);
}

function increment(){
  if (i<100) {
    i++
    console.log(i);
  }
}

fetchCards()
