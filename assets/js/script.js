let card = document.getElementsByClassName("card");
let cards = [...card];

for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function () {
        this.classList.toggle("show")
        this.classList.toggle("flip")
        this.classList.toggle("disable")
    });
}