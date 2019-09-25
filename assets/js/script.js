$(document).ready(function () {
    //Global Variables
    const flippedCards = [];
    const matchedCards = [];
    const cards = document.querySelector(".deck");
    var seconds = document.querySelector("#seconds"[0].innerHTML);
    var minutes = document.querySelector("#minutes"[0].innerHTML);
    var hours = document.querySelector("#hours"[0].innerHTML);
    var moves = document.querySelector("#moves"[0].innerHTML)

    /**
     * Credit for this function goes to user Alexey Lebedev on Stack Overflow
     */
    function startGame() {
        for (var i = cards.children.length; i >= 0; i--) {
            cards.appendChild(cards.children[Math.random() * i | 0]);
        }
    }

    /**
     * Targets the HTML element with ID of restart 
     * When this element is clicked it runs the startGame() function
     * And removes any matched and disable classes from any elements with the class card
     * And sets the move counter back to 0
     */
    $("#restart").click(function () {
        startGame();
        $(".game-card").removeClass("matched");
        $(".game-card").removeClass("disable");
        $(".game-card").removeClass("flip");
        flippedCards.length = 0;
        $("#moves")[0].innerHTML = 0;
    })

    /**
     * Targets all elements with class game-card
     * When they are clicked apply the classes flip and disable
     * Push the element to the flippedCards array and run the checkMatch() function
     */
    $(".game-card").click(function () {
        $(this).toggleClass("flip");
        $(this).toggleClass("disable");
        (flippedCards).push(this);
        checkMatch(flippedCards);
    })

    /**
     * Targets element with ID moves
     * When called this function increases the innerHTML value by 1
     */
    function moved() {
        $("#moves")[0].innerHTML++;
    }

    /**
     * When called this function will check if the length of the flippedCards array is 2
     * If this return true it will call the moved() function to add 1 to the move counter
     * It then checks the objects Data in the flippedCards array
     * If they match it will add the class matched and remove flip
     * If they dont match it will add the not-match class and remove the flip class
     * As well as adding the disable class to all elements with the game-card class
     * it will then wait 1100 miliseconds before removing not-match and disable from all cards
     * Then reapply disable to any cards with the class matched
     * Finally it will reset the flippedCards length to 0
     */
    function checkMatch(flippedCards) {
        if (flippedCards.length == 2) {
            moved();
            if (flippedCards[0].dataset.type == flippedCards[1].dataset.type) {
                $(flippedCards).addClass("matched");
                $(flippedCards).removeClass("flip");
                $(matchedCards).push(flippedCards);
            } else {
                $(flippedCards).addClass("not-match");
                $(flippedCards).removeClass("flip");
                $(".game-card").addClass("disable");
                setTimeout(function () {
                    $(".game-card").removeClass("not-match");
                    $(".game-card").removeClass("disable");
                    $(".matched").addClass("disable");
                }, 1100);
            }
            flippedCards.length = 0;
        }
    }

    if (moves = 1) {
        seconds.innerHTML++;
        if (seconds = 60) {
            minutes++;
            seconds = 0;
            if (minutes = 60) {
                hours++;
                minutes = 0;
            }
        }
    }

    if (matchedCards.length == [16]) {
        console.log("winner!");
    }

    startGame();
})



