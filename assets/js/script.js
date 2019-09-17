$(document).ready(function () {
    //Global Variables
    var flippedCards = [];
    var cards = document.querySelector("ul");

    /**
     * Credit for this function goes to user Alexey Lebedev on Stack Overflow
     */
    function startGame() {
        for (var i = cards.children.length; i >= 0; i--) {
            cards.appendChild(cards.children[Math.random() * i | 0]);
        }
    }

    /**
     * targets the HTML element with ID of restart 
     * When this element is clicked it runs the startGame() function
     * and removes any matched and disable classes from any elements with the class card
     * and sets the move counter back to 0
     */
    $("#restart").click(function() { 
        startGame();
        $(".card").removeClass("matched");
        $(".card").removeClass("disable");
        $("#moves")[0].innerHTML = 0;
    })

    /**
     * Targets all <li> that are children of <ul> elements
     * when they are clicked apply the classes flip and disable
     * Push the element to the flippedCards array and run the checkMatch() function
     */
    $("ul>li").click(function () {
        $(this).toggleClass("flip");
        $(this).toggleClass("disable");
        (flippedCards).push(this);
        checkMatch(flippedCards);
    })

    /**
     * targets element with ID moves
     * when called this function increases the innerHTML value by 1
     */
    function moved() {
        $("#moves")[0].innerHTML ++;
    }

    /**
     * When called this function will check if the length of the flippedCards array is 2
     * If this return true it will call the moved() function to add 1 to the move counter
     * It then checks the objects types in the flippedCards array
     * If they match it will add the class matched and remove flip
     * If they dont match it will add the not-match class and remove the flip class
     * As well as adding the disable class to all elements with the card class
     * it will then wait 1100 miliseconds before removing not-match and disable from all cards
     * Then reapply disable to any cards with the class matched
     * Finally it will reset the flippedCards length to 0
     */
    function checkMatch(flippedCards) {
        if (flippedCards.length == 2) {
            moved();
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



