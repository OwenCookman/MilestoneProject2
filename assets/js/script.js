$(document).ready(function () {
    //Global Variables
    const flippedCards = [];
    const matchedCards = [];
    const cards = document.querySelector(".deck");
    let selectedDificulty = "easy";
    let moves = 0;
    let timer = null;
    let timerDown = null;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let countDown = 60;
    let finishMoves = 0;
    let finishSeconds = 0;
    let finishMinutes = 0;
    let finishHours = 0;
    let recordSeconds = JSON.parse(window.localStorage.getItem("recSec"));
    let recordMinutes = JSON.parse(window.localStorage.getItem("recMin"));
    let recordHours = JSON.parse(window.localStorage.getItem("recHour"));
    let recordMoves = JSON.parse(window.localStorage.getItem("recMoves"));


    /**
     * Credit for this function goes to user Alexey Lebedev on Stack Overflow
     */
    function startGame() {
        for (let i = cards.children.length; i >= 0; i--) {
            cards.appendChild(cards.children[Math.random() * i | 0]);
        };
    }
    $(".buttons").click(function() {
        difficulty(this.children[0].id);
    });

    function difficulty(value) {
        switch (value) {
            case 'easy':
                easyDifficulty();
                selectedDificulty = "easy";
                break;
            case 'medium':
                countdownTimer();
                selectedDificulty = "medium";
                break;
            case 'hard':
                countdownTimer();
                hardDifficulty();
                selectedDificulty = "hard";

            default:
                break;
        }
    };

    function countdownTimer() {
        $(".timer").addClass("hidden");
        $("#countdown").removeClass("hidden");
    };

    $("#countdown")[0].innerHTML = countDown;

    function hardDifficulty() {
        $("#lives").removeClass("hidden");
    };

    function easyDifficulty() {
        $(".timer").removeClass("hidden");
        $("#countdown").addClass("hidden");
        $("#lives").addClass("hidden");
    };
 

    /**
     * Targets the HTML element with ID of restart 
     * When this element is clicked it runs the startGame() function
     * And removes any matched, disable and flip classes from any elements with the class game-card
     * Sets the move counter back to 0 and the seconds, minutes and hours of the timer back to 0
     * Then stops the interval used in the time() function
     */
    $("#restart").click(restart);

    function restart() {
        startGame();
        $(".game-card").removeClass("matched");
        $(".game-card").removeClass("disable");
        $(".game-card").removeClass("flip");
        flippedCards.length = 0;
        moves = 0;
        $("#moves")[0].innerHTML = moves;
        seconds = 0;
        $("#seconds")[0].innerHTML = seconds;
        minutes = 0;
        $("#minutes")[0].innerHTML = minutes;
        hours = 0;
        $("#hours")[0].innerHTML = hours;
        clearInterval(timer);
    };

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
    });

    /**
     * When called this function increases the variable moves value by 1
     * And displays the variables value in the inner HTML of the the element with the ID moves
     */
    function moved() {
        moves++;
        $("#moves")[0].innerHTML = moves;
    };

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
            time();
            if (selectedDificulty == "medium" || "hard") {
                    timerDown = setInterval(function () {
                        countDown--;
                    }, 1000);
            if (flippedCards[0].dataset.type == flippedCards[1].dataset.type) {
                match();
                complete();
            } else {
                notMatch();
            }
            flippedCards.length = 0;
        }
    };

    function match() {
        $(flippedCards).addClass("matched");
        $(flippedCards).removeClass("flip");
        (matchedCards).push(flippedCards);
    };

    function notMatch() {
        $(flippedCards).addClass("not-match");
        $(flippedCards).removeClass("flip");
        $(".game-card").addClass("disable");
        setTimeout(function () {
            $(".game-card").removeClass("not-match");
            $(".game-card").removeClass("disable");
            $(".matched").addClass("disable");
        }, 1100);
    };

    /**
     * When called this function checks if the variable moves is = to 1
     * If so the variable seconds has 1 added to its value every 1000 milliseconds
     * And displays in the inner HTML of the element with ID seconds
     * If seconds value reaches 60 the variable minutes adds 1 to its value
     * And displays in the inner HTML of the element with ID minutes
     * If minutes value reaches 60 the variable hours adds 1 to its value
     * And displays in the inner HTML of the element with ID hours
     */
    function time() {
        if (moves == 1) {
            timer = setInterval(function () {
                seconds++;
                $("#seconds")[0].innerHTML = seconds;
                if (seconds == 60) {
                    minutes++;
                    $("#minutes")[0].innerHTML = minutes;
                    seconds = 0;
                    $("#seconds")[0].innerHTML = seconds;
                    if (minutes == 60) {
                        hours++;
                        $("#hours")[0].innerHTML = hours;
                        minutes = 0;
                        $("#minutes")[0].innerHTML = minutes;
                    }
                }
            }, 1000);
        }
    };

    function complete() {
        if (matchedCards.length == [8]) {
            $("#congratulations").modal("show");
            clearInterval(timer);
            $("#finish-seconds")[0].innerHTML = seconds;
            $("#finish-minutes")[0].innerHTML = minutes;
            $("#finish-hours")[0].innerHTML = hours;
            $("#finish-moves")[0].innerHTML = moves;
            finishSeconds = seconds;
            finishMinutes = minutes;
            finishHours = hours;
            finishMoves = moves;
            record()
            matchedCards.length = 0;
        }
    };

    function record() {
        if (finishMoves < recordMoves) {
            window.localStorage.setItem("recMove", moves);
        } else {
        }
        if (finishHours <= recordHours) {
            window.localStorage.setItem("recHour", hours);
        } if (finishMinutes <= recordMinutes) {
            window.localStorage.setItem("recMin", minutes);
        } if (finishSeconds <= recordSeconds) {
            window.localStorage.setItem("recSec", seconds);
        } else {
        }
        $("#record-seconds")[0].innerHTML = recordSeconds;
        $("#record-minutes")[0].innerHTML = recordMinutes;
        $("#record-hours")[0].innerHTML = recordHours;
        $("#record-moves")[0].innerHTML = recordMoves;
    };

    $("#replay").click(function () {
        $("#congratulations").modal("hide");
        restart();
    });

    startGame();
});



