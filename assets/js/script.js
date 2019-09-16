$(document).ready(function() {
    var flippedCards = [];
    $("ul>li").click(function() {
        $(this).toggleClass("flip");
        $(this).toggleClass("disable");
    })
    
})

