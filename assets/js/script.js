$(document).ready(function () {
    var flippedCards = [];
    
    $("ul>li").click(function () {
        $(this).toggleClass("flip");
        $(this).toggleClass("disable");
        (flippedCards).push(this.type);
        console.log(flippedCards);
    })

    if (flippedCards.length == 2) {
        if (flippedCards[0] == flippedCards[1]) {
            $(flippedCards).addClass("matched");
            $(flippedCards).removeClass("flip");
        } else {
            $(flippedCards).addClass("not-match");
        }
        var flippedCards = [];
    }
})



