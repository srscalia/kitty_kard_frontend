// ******************** Variables ********************
const cardContainer = document.querySelector('#card-container')

// ******************** Event listeners**************




// ******************** Helper functions **************
function fetchCards(){
  fetch('http://localhost:3000/api/v1/cards')
  .then(response=>response.json())
  .then((cards)=>{
    addCardsToDom(cards)
  })
}

function addCardsToDom(cards){
  cards.forEach((card)=>{
    addSingleCardToDom(card)
  })
}

function addSingleCardToDom(card){
  cardContainer.innerHTML +=  `
  <div class='card'>${card.name}</div>
  <img src=${card.image_back} alt="cat logo">
  `
}


fetchCards()
