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

    /**
     * When an element with the class buttons is clicked difficulty is set with the ID of the child element that was clicked
     */
    $(".buttons").click(function () {
        difficulty(this.children[0].id);
    });

    /**
     * If difficulty is set with the value of "easy" the restart() and easyDifficulty() functions are run
     * selectedDifficulty is set to "easy" and the function ends
     * If difficulty is set with the value of "medium" the restart(), countdownTimer() and mediumDifficulty() functions are run
     * selectedDifficulty is set to "medium" and the function ends
     * If difficulty is set with the value of "hard" the restart(), countdownTimer() and hardDifficulty() functions are run
     * selectedDifficulty is set to "hard" and the function ends
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
     * And removes any matched, disable and flip classes from any elements with the class game-card
     * Sets the move counter, seconds, minutes and hours of the timer back to 0, the countDown timer back to 60 and lives back to 4
     * Then stops the interval used in the time() and timerDown() functions
     */
    $("#restart").click(restart);

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
     * And call the time() function to start the timer
     * It then checks if the selectedDifficulty variable is set with the value "medium" or "hard"
     * If it is then it runs the timerDown() function to start the countdown timer
     * It then checks the objects Data in the flippedCards array
     * If they match it will run the functions match() complete() and lifeUp()
     * If they dont match it will run the functions notMatch() and lifeDown()
     * If lives value is 0 the lifeLoser() function is called
     * Finally it will reset the flippedCards length to 0
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
                if (lives < 3) {
                    $("#lives").addClass("beat");
                }
                if (lives == 0) {
                    lifeLoser();
                }
            }
            flippedCards.length = 0;
        }
    };

    /**
     * When called this function will check if moves has the value of 1
     * if it does an interval is set so that the variable countdown has 1 taken away from it every 1000 miliseconds
     * If the countDown variable has the value of 30 the element with the ID countdown changes to a yellow color
     * If the countDown variable has the value of 10 the element with the ID countdown changes to a red color
     * If the countDown variable has the value of 0 the timeLoser() function will run
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
        $(".game-card").addClass("disable");
    };

    /**
    * When this function is called the interval set in the downTimer() function is cleared
    * The modal with ID lifeLoser is shown
    * And all elements with the class game-card are given the class disable
    */
    function lifeLoser() {
        clearInterval(diffTimer);
        $("#lifeLoser").modal("show");
        $(".game-card").addClass("disable");
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
     * When this function is called the elements in the flippedCards array are given the not-match class and lose the flip class
     * All elements with the game-card class are given the disable class
     * A timeout function is set to wait 1100 miliseconds
     * Then all eleements with the game-card class have the not-match and disable classes removed
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

    /**
     * When called this function checks if the matchedCards array's length is 8
     * If it is the modal with ID congratulations is shown
     * The intervals set in the functions time() and downTimer() are cleared
     * The element with the ID finish-seconds inner HTML is set to the variable seconds value
     * The element with the ID finish-minutes inner HTML is set to the variable minutes value
     * The element with the ID finish-hours inner HTML is set to the variable hours value
     * The element with the ID finish-moves inner HTML is set to the variable moves value
     * Then the record() function is run and finally matchedCards length is set to 0
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
     * When this function is called it checks if the variables recordMoves, recordHours, recordMinutes and recordSeconds is not a number
     * If they return NaN the functions setMoves(), setHours(), setMinutes() and setSeconds() are called
     * If recordMoves returns a number it checks if the variable moves is less than the variable recordMoves
     * If so the function setMoves() is called
     * If recordHours returns a number it checks if the variable hours is less than the variable recordHours
     * If so the functions setHours(), setMinutes() and setSeconds() are called
     * if hours is not less than recordHours it checks if they are equal and if the varaible minutes is less than the variable recordMinutes
     * If so the functions setMinutes() and setSeconds() are called
     * If hours is not equal to recordHours and minutes is not less than recordMinutes
     * It checks if hours is equal to recordHours, minutes is equal to recordMinutes and seconds is less that recordSeconds
     * If so the function setSeconds() is called
     *  
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
     * recordMoves is then set by calling the Id recMove from local storage and parseing the string to an interger
     * The element wil ID record-moves then has it's innerHTML set to the value of the variable recordMoves
     */
    function setMoves() {
        window.localStorage.setItem("recMove", moves);
        recordMoves = parseInt(window.localStorage.getItem("recMove"));
        $("#record-moves")[0].innerHTML = recordMoves;
    };

    /**
    * When this function is called the value of variable hours is saved to local storage with the ID rechour
    * recordHours is then set by calling the Id rechour from local storage and parseing the string to an interger
    * The element wil ID record-hours then has it's innerHTML set to the value of the variable recordHours
    */
    function setHours() {
        window.localStorage.setItem("recHour", hours);
        recordHours = parseInt(window.localStorage.getItem("recHour"));
        $("#record-hours")[0].innerHTML = recordHours;
    };

    /**
    * When this function is called the value of variable minutes is saved to local storage with the ID recMin
    * recordMinutes is then set by calling the Id recMin from local storage and parseing the string to an interger
    * The element wil ID record-minutes then has it's innerHTML set to the value of the variable recordMinutes
    */
    function setMinutes() {
        window.localStorage.setItem("recMin", minutes);
        recordMinutes = parseInt(window.localStorage.getItem("recMin"));
        $("#record-minutes")[0].innerHTML = recordMinutes;
    };

    /**
    * When this function is called the value of variable seconds is saved to local storage with the ID recSec
    * recordSeconds is then set by calling the Id recSec from local storage and parseing the string to an interger
    * The element wil ID record-seconds then has it's innerHTML set to the value of the variable recordSeconds
    */
    function setSeconds() {
        window.localStorage.setItem("recSec", seconds);
        recordSeconds = parseInt(window.localStorage.getItem("recSec"));
        $("#record-seconds")[0].innerHTML = recordSeconds;
    };

    /**
     * When the element with the class replay is clicked the modals with IDs congratualtions, lifeLoser and timeLoser are hidden
     * And the restart() function is called
     */
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