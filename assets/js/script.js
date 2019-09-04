let card = document.getElementsByClassName("Card");
let cards = [...card];

for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function(){
        this.classList.add(".flip-card")
    });
    }

