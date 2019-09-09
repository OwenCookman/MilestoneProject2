let card = document.getElementsByClassName("card");
let cards = [...card];


function flipCard(){ 
    this.classList.toggle("flip");
    this.classList.toggle("disable");
}

function cardFlipped() {
    flippedCards.push(this);
    var len = flippedCards.length;
    if(len === 2){
        if(flippedCards[0].type === flippedCards[1].type){
            matched();
        } else {
            notMatched();
        }
    }
};

var flippedCards = [];
let matchedCard = document.getElementsByClassName("match");

function matched(){
    flippedCards[0].classList.add("matched");
    flippedCards[1].classList.add("matched");
    flippedCards[0].classList.remove("flip");
    flippedCards[1].classList.remove("flip");
    flippedCards = [];
}

function notMatched(){
    flippedCards[0].classList.add("not-match");
    flippedCards[1].classList.add("not-match");
    disable();
    setTimeout(function(){
        flippedCards[0].classList.remove("flip", "not-match");
        flippedCards[1].classList.remove("flip", "not-match");
        enable();
        flippedCards = [];
    },1100);
}

function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disable');
    });
}

function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disable');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disable");
        }
    });
}

for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", flipCard);
    cards[i].addEventListener("click", cardFlipped);
    }


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
function startGame() {
    var shuffledCards = shuffle(cards);
    for (var i = 0; i < shuffledCards.length; i++) {
        [].forEach.call(shuffledCards, function (item) {
            deck.appendChild(item);
        });
    }
}

window.onload = startGame();

