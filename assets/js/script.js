//Puts all cards in to an Array:
let card = document.getElementsByClassName("card");
let cards = [...card];

//Iterates through Array and applies CSS styles:
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function () {
        this.classList.toggle("flip")
        this.classList.toggle("disable")
    });
}

//Shufles all cards in to a random order:
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

const deck = document.querySelector(".deck");
function startGame(){
   var shuffledCards = shuffle(cards);
   for (var i= 0; i < shuffledCards.length; i++){
      [].forEach.call(shuffledCards, function(item){
         deck.appendChild(item);
      });
   }
}

window.onload = startGame();