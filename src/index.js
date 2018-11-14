// ******************** Variables ********************
const cardContainer = document.querySelector('#container')
let cardArray = [];
let gameArray = [];
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
let i = 0
let match = 0;
let interval;
// let stopTime;
let currentGameId;
const form = document.querySelector('form')
const player = document.querySelector('#player')
const welcomeBoard = document.querySelector('#index-banner')
const counter = document.querySelector('#counter')
const scoreboardContainer = document.querySelector('#scoreboard')


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
  if (firstCat.id === secondCat.id && firstEvent !== secondEvent) {
    secondCard.style.visibility='hidden'
    firstCard.style.visibility='hidden'
    match=match+1
    if (match ===1) {
      gameEnd()
    }
  } else {
    firstEvent.src = firstCat.image_back
    secondEvent.src = secondCat.image_back
  }
}

function formEventHandler(event){
  event.preventDefault()
  let name = event.target.querySelector('#input_text').value
  fetch('http://localhost:3000/api/v1/games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      player: name,
      time: 0,
    })
  }).then((response)=>{
    return response.json()
  }).then((json)=>{
    player.innerText= `${json.player}'s Game`
    currentGameId=json.id
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
  startStart()
}

function startStart(){
  setTimeout (start, 1000);
}

function start(){
  interval = setInterval(increment, 1000);
}

function increment(){
  if (i<Infinity) {
    i++
    renderSeconds(i)
  }
}

function renderSeconds(i){
  counter.innerText = `Timer: ${i}`
}

function gameEnd(){
  clearInterval(interval)
  let stopTime = i
  i=0
  sendPatchForEndGame(stopTime)
}

function sendPatchForEndGame(stopTime){
  fetch(`http://localhost:3000/api/v1/games/${currentGameId}`, {
    method: "PATCH",
    headers: {
            "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      time: stopTime
    })
  })
}

function fetchGames(){
  fetch('http://localhost:3000/api/v1/games')
  .then(response=>response.json())
  .then((json)=>{
    gamesArray = json
    addGamesToDom(gamesArray)
  })
}

function addGamesToDom(gamesArray){
  gamesArray.forEach((game)=>{
    addSingleGameToDom(game)
  })
}

function addSingleGameToDom(game){
  scoreboardContainer.innerHTML+= `
  <tr data-id=${game.id}>
    <td>${game.player}</td>
    <td>${game.time}</td>
  </tr>
  `
}




fetchGames()
fetchCards()
