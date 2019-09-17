$(document).ready(function () {
    var flippedCards = [];
    var cards = document.querySelector("ul");

    function startGame() {
        for (var i = cards.children.length; i >= 0; i--) {
            cards.appendChild(cards.children[Math.random() * i | 0]);
        }
    }

    $("#restart").click(function() { 
        startGame();
        $(".card").removeClass("matched");
        $(".card").removeClass("disable");
    })

    $("ul>li").click(function () {
        $(this).toggleClass("flip");
        $(this).toggleClass("disable");
        (flippedCards).push(this);
        checkMatch(flippedCards);
    })

    function checkMatch(flippedCards) {
        if (flippedCards.length == 2) {
            if (flippedCards[0].type == flippedCards[1].type) {
                $(flippedCards).addClass("matched");
                $(flippedCards).removeClass("flip");
            } else {
                $(flippedCards).addClass("not-match");
                $(flippedCards).removeClass("flip");
                $(".card").addClass("disable");
                setTimeout(function () {
                    $(".card").removeClass("not-match");
                    $(".card").removeClass("disable");
                    $(".matched").addClass("disable");
                }, 1100);
            }
            flippedCards.length = 0;
        }
    }
    window.onload = startGame();
})



