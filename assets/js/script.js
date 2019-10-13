$(document).ready(function () {
    //Global Variables
    const flippedCards = [];
    const matchedCards = [];
    const cards = document.querySelector(".deck");
    let selectedDifficulty = "easy";
    let moves = 0;
    let timer = null;
    let diffTimer = null;
    let lives = 4;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let countDown = 60;
    let recordMoves = parseInt(window.localStorage.getItem("recMove"));
    let recordHours = parseInt(window.localStorage.getItem("recHour"));
    let recordMinutes = parseInt(window.localStorage.getItem("recMin"));
    let recordSeconds = parseInt(window.localStorage.getItem("recSec"));

    /**
     * Credit for this function goes to user Alexey Lebedev on Stack Overflow
     */
    function startGame() {
        for (let i = cards.children.length; i >= 0; i--) {
            cards.appendChild(cards.children[Math.random() * i | 0]);
        }
    };


    //When the element with the ID howtoPlay is clicked
    //This function will check what the variable selectedDifficulty is set to
    //then load the correct modal.
    $("#howtoPlay").click(function () {
        if (selectedDifficulty === "easy") {
            $("#easyInfo").modal("show");
        } else {
            if (selectedDifficulty === "medium") {
                $("#medInfo").modal("show");
            } else {
                if (selectedDifficulty === "hard") {
                    $("#hardInfo").modal("show");
                }
            }
        }
    });


    //When an element with the class buttons is clicked difficulty is set with the ID of the child element that was clicked
    $(".buttons").click(function () {
        difficulty(this.children[0].id);
    });

    /**
     * When difficulty is set with a value it will run the code associated with with that "case"
     */
    function difficulty(value) {
        switch (value) {
            case "easy":
                restart();
                easyDifficulty();
                selectedDifficulty = "easy";
                break;
            case "medium":
                restart();
                countdownTimer();
                mediumDifficulty();
                selectedDifficulty = "medium";
                break;
            case "hard":
                restart();
                countdownTimer();
                hardDifficulty();
                selectedDifficulty = "hard";
            default:
                break;
        }
    };

    /**
     * When called this function adds the class hidden to elements with the class timer
     * And removes the class hidden from the element with the ID countdown
     */
    function countdownTimer() {
        $(".timer").addClass("hidden");
        $("#countdown").removeClass("hidden");
    };

    /**
     * When called this function removes the class hidden from the element with the ID lives
     */
    function hardDifficulty() {
        $("#lives").removeClass("hidden");
    };

    /**
     * When called this function adds the class hidden to the element with the ID lives
     */
    function mediumDifficulty() {
        $("#lives").addClass("hidden");
    };

    /**
     * When called this function removes the class hidden from all elements with the class timer
     * And adds the class hidden to the elements with the IDs countdown and lives
     */
    function easyDifficulty() {
        $(".timer").removeClass("hidden");
        $("#countdown").addClass("hidden");
        $("#lives").addClass("hidden");
    };


    /**
     * Targets the HTML element with ID of restart 
     * When this element is clicked it runs the startGame() function
     * Returns all variables to their starting value
     * And stops any intervals
     */
    function restart() {
        startGame();
        $(".game-card").removeClass("matched");
        $(".game-card").removeClass("disable");
        $(".game-card").removeClass("flip");
        flippedCards.length = 0;
        matchedCards.length = 0;
        moves = 0;
        $("#moves")[0].innerHTML = moves;
        seconds = 0;
        $("#seconds")[0].innerHTML = seconds;
        minutes = 0;
        $("#minutes")[0].innerHTML = minutes;
        hours = 0;
        $("#hours")[0].innerHTML = hours;
        countDown = 60;
        $("#countdown")[0].innerHTML = countDown;
        $("#countdown").css("color", "#ffebcd")
        lives = 4;
        $(".life")[0].innerHTML = lives;
        clearInterval(diffTimer);
        clearInterval(timer);
    };

    $("#restart").click(restart);


    //Targets all elements with class game-card
    //When they are clicked apply the classes flip and disable
    //Push the element to the flippedCards array and run the checkMatch() function
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
     * It will add 1 to the move counter
     * On easy it will start the timer that counts up and on Medium or Hard it will start the timer that goes down
     * On Hard difficulty if the cards don't match the player loses a life and if they do match they gain one
     * If the players lives reach 0 the lifeLoser() function is called
     */
    function checkMatch(flippedCards) {
        if (flippedCards.length == 2) {
            moved();
            time();
            if (selectedDifficulty === "medium" || selectedDifficulty === "hard") {
                timerDown();
            }
            if (flippedCards[0].dataset.type == flippedCards[1].dataset.type) {
                match();
                complete();
                lifeUp();
            } else {
                notMatch();
                lifeDown();
                if (lives == 0) {
                    lifeLoser();
                }
            }
            flippedCards.length = 0;
        }
    };

    /**
     * When called this function will check if moves has the value of 1
     * If it does an interval is set so that the variable countdown has 1 taken away from it every 1000 milliseconds
     * If the timer reaches 0 the timeLoser() function is called
     */
    function timerDown() {
        if (moves == 1) {
            diffTimer = setInterval(function () {
                countDown--;
                $("#countdown")[0].innerHTML = countDown;
                if (countDown == 30) {
                    $("#countdown").css("color", "#ffbf00")
                }
                if (countDown == 10) {
                    $("#countdown").css("color", "#ff0000")
                }
                if (countDown == 0) {
                    timeLoser();
                }
            }, 1000);
        }
    };

    /**
     * When this function is called the interval set in the downTimer() function is cleared
     * The modal with ID timeLoser is shown
     * And all elements with the class game-card are given the class disable
     */
    function timeLoser() {
        clearInterval(diffTimer);
        $("#timeLoser").modal("show");
        setTimeout(function () {
            $(".game-card").addClass("disable");
        }, 1101);
    };

    /**
    * When this function is called the interval set in the downTimer() function is cleared
    * The modal with ID lifeLoser is shown
    * And all elements with the class game-card are given the class disable
    */
    function lifeLoser() {
        clearInterval(diffTimer);
        $("#lifeLoser").modal("show");
        setTimeout(function () {
            $(".game-card").addClass("disable");
        }, 1101);
    };

    /**
     * When this function is called the elements that are held in the flippedCards array are given the matched class
     * And have the flip class removed
     * the elements inside the flippedCards array are pushed in to the matchedCards array
     */
    function match() {
        $(flippedCards).addClass("matched");
        $(flippedCards).removeClass("flip");
        (matchedCards).push(flippedCards);
    };

    /**
     * When this function is called the elements in the flippedCards array are given the black class and lose the flip class
     * All elements with the game-card class are given the disable class
     * A timeout function is set to wait 1100 milliseconds
     * Then all elements with the game-card class have the black and disable classes removed
     * All elements with the matched class are given the disable class
     */
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
     * When called this function checks if the selectedDifficulty has the value of "hard"
     * If it does it adds 1 to the value of the variable lives
     * Then sets the inner HTML of the elements with the class life to the value of the variable lives
     */
    function lifeUp() {
        if (selectedDifficulty === "hard") {
            lives++;
            $(".life")[0].innerHTML = lives;
        }
    };

    /**
    * When called this function checks if the selectedDifficulty has the value of "hard"
    * If it does it decreases the value of the variable lives by 1
    * Then sets the inner HTML of the elements with the class life to the value of the variable lives
    */
    function lifeDown() {
        if (selectedDifficulty === "hard") {
            lives--;
            $(".life")[0].innerHTML = lives;
        }
    };

    /**
     * When called this function checks if the variable moves is = to 1
     * If so the timer begins counting up
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

    /**
     * When called this function checks if the matchedCards array's length is 8
     * If it is the modal with ID congratulations is shown
     * The timers are stopped and the finishing time and moves is displayed
     * The record() function is run and the matchedCards array is reset
     */
    function complete() {
        if (matchedCards.length == 8) {
            $("#congratulations").modal("show");
            clearInterval(timer);
            clearInterval(diffTimer);
            $("#finish-seconds")[0].innerHTML = seconds;
            $("#finish-minutes")[0].innerHTML = minutes;
            $("#finish-hours")[0].innerHTML = hours;
            $("#finish-moves")[0].innerHTML = moves;
            record()
            matchedCards.length = 0;
        }
    };

    /**
     * When this finction is called it will check if recordMoves, recordHours, recordMinutes and recordSeconds returns NaN
     * If they do it calls the setMoves/Hours/Minutes/Seconds functions
     * If they do return an integer it checks if moves are less than recordMoves, if so calls setMoves
     * It checks if hours is less than record hours, if so calls setHour/Minutes/Seconds
     * If not it checks if hours is equal to recordHours & if minutes is less than recordMinutes if so it calls the setMinutes/Seconds functions
     * If not it checks if hours is equal to recordHours & minutes is equal to reordMinutes & seconds are less than recordSeconds
     * If so it calls the setSeconds function  
     */
    function record() {
        if (isNaN(recordMoves)) {
            setMoves();
        }
        if (isNaN(recordHours)) {
            setHours();
        }
        if (isNaN(recordMinutes)) {
            setMinutes();
        }
        if (isNaN(recordSeconds)) {
            setSeconds();
        }
        if (moves < recordMoves) {
            setMoves();
        }
        if (hours < recordHours) {
            setHours();
            setMinutes();
            setSeconds();
        } else {
            if (hours == recordHours && minutes < recordMinutes) {
                setMinutes();
                setSeconds();
            } else {
                if (hours == recordHours && minutes == recordMinutes && seconds < recordSeconds) {
                    setSeconds();
                }
            }
        }
    };

    /**
     * When this function is called the value of variable moves is saved to local storage with the ID recMove
     * recordMoves is then set by calling the Id recMove from local storage and parsing the string to an integer
     * The element with ID record-moves then has it's innerHTML set to the value of the variable recordMoves
     */
    function setMoves() {
        window.localStorage.setItem("recMove", moves);
        recordMoves = parseInt(window.localStorage.getItem("recMove"));
        $("#record-moves")[0].innerHTML = recordMoves;
    };

    /**
    * When this function is called the value of variable hours is saved to local storage with the ID rechour
    * recordHours is then set by calling the Id rechour from local storage and parsing the string to an integer
    * The element with ID record-hours then has it's innerHTML set to the value of the variable recordHours
    */
    function setHours() {
        window.localStorage.setItem("recHour", hours);
        recordHours = parseInt(window.localStorage.getItem("recHour"));
        $("#record-hours")[0].innerHTML = recordHours;
    };

    /**
    * When this function is called the value of variable minutes is saved to local storage with the ID recMin
    * recordMinutes is then set by calling the Id recMin from local storage and parsing the string to an integer
    * The element with ID record-minutes then has it's innerHTML set to the value of the variable recordMinutes
    */
    function setMinutes() {
        window.localStorage.setItem("recMin", minutes);
        recordMinutes = parseInt(window.localStorage.getItem("recMin"));
        $("#record-minutes")[0].innerHTML = recordMinutes;
    };

    /**
    * When this function is called the value of variable seconds is saved to local storage with the ID recSec
    * recordSeconds is then set by calling the Id recSec from local storage and parsing the string to an integer
    * The element with ID record-seconds then has it's innerHTML set to the value of the variable recordSeconds
    */
    function setSeconds() {
        window.localStorage.setItem("recSec", seconds);
        recordSeconds = parseInt(window.localStorage.getItem("recSec"));
        $("#record-seconds")[0].innerHTML = recordSeconds;
    };

    //When the element with the class replay is clicked the modals with IDs congratulations, lifeLoser and timeLoser are hidden
    //And the restart() function is called
    $(".replay").click(function () {
        $("#congratulations").modal("hide");
        $("#lifeLoser").modal("hide");
        $("#timeLoser").modal("hide");
        restart();
    });

    /**
     * The startGame() function is called when the page has loaded so the game is ready to play
     */
    startGame();
});