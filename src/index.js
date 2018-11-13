// ******************** Variables ********************
const cardContainer = document.querySelector('#container')
let cardArray = []
const row1 = document.querySelector('#row1')
const row2 = document.querySelector('#row2')
const row3 = document.querySelector('#row3')
const row4 = document.querySelector('#row4')

console.log(row1, row2, row3, row4);

// ******************** Event listeners**************




// ******************** Helper functions **************
function fetchCards(){
  fetch('http://localhost:3000/api/v1/cards')
  .then(response=>response.json())
  .then((cards)=>{
    cardArray = cards
    console.log(cardArray);
    addCardsToDom(cards)
  })
}

function addCardsToDom(cards){
  cards.forEach((card)=>{
    addSingleCardToDom(card)
  })
}

function addSingleCardToDom(card){
  if (cardArray.slice(0,4).includes(card)) {
    row1.innerHTML +=  `
    <div class='card'>
      <div class="card-image">
        <img src=${card.image_back} alt="cat logo">
      <div>
    </div>
    `
  } else if (cardArray.slice(4,8).includes(card)) {
    row2.innerHTML +=  `
    <div class='card'>
      <div class="card-image">
        <img src=${card.image_back} alt="cat logo">
      <div>
    </div>
    `
  } else if (cardArray.slice(8,12).includes(card)) {
    row3.innerHTML +=  `
    <div class='card'>
      <div class="card-image">
        <img src=${card.image_back} alt="cat logo">
      <div>
    </div>
    `
  } else {
    row4.innerHTML +=  `
    <div class='card'>
      <div class="card-image">
        <img src=${card.image_back} alt="cat logo">
      <div>
    </div>
    `
  }
}


fetchCards()
