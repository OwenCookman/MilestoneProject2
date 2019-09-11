//Global variables
let card = document.getElementsByClassName("card");
let cards = [...card];
let flippedCards = [];
let matchedCard = document.getElementsByClassName("match");
let moves = 0;
let counter = document.querySelector(".moves");
let restart = document.getElementById("restart");

const deck = document.querySelector(".deck");

/**
 * Adds classes when a card is selected
 */
function flipCard() {
    this.classList.toggle("flip");
    this.classList.toggle("disable");
}

/**
 * Adds flipped cards to a seperate Array and checks for match
 */
function cardFlipped() {
    flippedCards.push(this);
    let len = flippedCards.length;
    if (len === 2) {
        moveCounter();
        if (flippedCards[0].type === flippedCards[1].type) {
            matched();
        } else {
            notMatched();
        }
    }
};

/**
 * Adds and removes classes from matched cards and empties flippedCards array
 */
function matched() {
    flippedCards[0].classList.add("matched");
    flippedCards[1].classList.add("matched");
    flippedCards[0].classList.remove("flip");
    flippedCards[1].classList.remove("flip");
    flippedCards = [];
}

/**
 * Adds and removes classes from cards that don't match and empties flippedCards array
 */
function notMatched() {
    flippedCards[0].classList.add("not-match");
    flippedCards[1].classList.add("not-match");
    //Temporarily disables cards
    disable();
    setTimeout(function () {
        flippedCards[0].classList.remove("flip", "not-match");
        flippedCards[1].classList.remove("flip", "not-match");
        enable();
        flippedCards = [];
    }, 1100);
}

/**
 * Disables cards
 */
function disable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add('disable');
    });
}

/**
 * Enables unmatched cards and keeps matched cards disabled 
 */
function enable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disable');
        for (let i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disable");
        }
    });
}

//Adds event listeners to all cards
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", flipCard);
    cards[i].addEventListener("click", cardFlipped);
}

/**
 * Shuffles cards in to a random order
 */
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/**
 * Adds 1 to the move counter every time the function is called
 */
function moveCounter() {
    moves++;
    counter.innerHTML = moves;
}

/**
 * Shuffles the cards and resets move counter
 */
function startGame() {
    let shuffledCards = shuffle(cards);
    for (let i = 0; i < shuffledCards.length; i++) {
        [].forEach.call(shuffledCards, function (item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("flip", "matched", "disable");
     }
     //Restarts the move counter
     moves = 0;
        counter.innerHTML = moves;
    }
  
//Runs the startGame function when the window has loaded
window.onload = startGame();