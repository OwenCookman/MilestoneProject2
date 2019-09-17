$(document).ready(function () {
    var flippedCards = [];

    $("ul>li").click(function () {
        $(this).toggleClass("flip");
        $(this).toggleClass("disable");
        (flippedCards).push(this);
        checkMatch();
        console.log(flippedCards);
    })

    function checkMatch() {
        if (flippedCards.length == 2) {
            if (flippedCards[0] == flippedCards[1]) {
                $(flippedCards).addClass("matched");
                $(flippedCards).removeClass("flip");
            } else {
                $(flippedCards).addClass("not-match");
                $(".card").addClass("disable");
                setTimeout(function () {
                    $(flippedCards).removeClass("not-match");
                    $(".card").removeClass("disable");
                }, 1100);
            }
            var flippedCards = [];
        }
    }
})



