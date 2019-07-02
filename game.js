$(document).ready(function() {

    var yourNumber = 0;
    var randomNum = randomNumGen();
    var wins = 0;
    var losses = 0;
    var crystals;
    function randomNumCrystals() {
      return {
        red: {
          follows: Math.floor(Math.random() * 12) + 1,
          imageUrl: "red.jpg"
        },
        blue: {
          follows: Math.floor(Math.random() * 12) + 1,
          imageUrl: "blue.jpg"
        },
        yellow: {
          follows: Math.floor(Math.random() * 12) + 1,
          imageUrl: "yellow.jpg"
        },
        purple: {
          follows: Math.floor(Math.random() * 12) + 1,
          imageUrl: "purple.jpg"
        }
      };
    }
  
    function randomNumGen() {
        return Math.floor(Math.random() * 120) + 20;
    }
  
    function resetGame() {
        yourNumber = 0;
        crystals = randomNumCrystals();
        randomNum = randomNumGen();
        $("#random-number").text(randomNum);
    }
  
    function updateScore(userWin) {
        $("#win-counter").empty();

        if (userWin === true) {
            $("#win-counter").append($("<p>").text("You WIN!!"));
            resetGame();
            matchingNumber();
        }

        else if (userWin === false) {
            $("#win-counter").append($("<p>").text("You LOSE!!"));  
            resetGame();
            matchingNumber();
        }
  
        var wSpan = $("<span>").text(wins);
        var lSpan = $("<span>").text(losses);
        var playerWins = $("<p>").text("Wins: ");
        var playerLosses = $("<p>").text("Losses: ");
  
        playerWins.append(wSpan);
        playerLosses.append(lSpan);
  
        $("#win-counter").append(playerWins);
        $("#win-counter").append(playerLosses);
    }
  
    function generateCrystals() {
        for (var key in crystals) {
            var crystalDiv = $("<div class='crystals' data-name='" + key + "'>");
            var crystalPic = $("<img alt='image' class='crystal-picture'>").attr("src", crystals[key].imageUrl);
            crystalDiv.append(crystalPic);
            $("#crystal-area").append(crystalDiv);
        }
    }
  
    function updateMatchingNumber(crystal) {
        yourNumber += crystals[crystal.attr("data-name")].follows;
    }
  
    function matchingNumber() {
        var scoreNumber = $("<div id='score-number'>").text(yourNumber);
        $("#score-area").html();
        $("#score-area").html(scoreNumber);
    }
  
    resetGame();
    updateScore();
    generateCrystals();
    matchingNumber();
  

    $(".crystals").on("click", function(event) {
      updateMatchingNumber($(this));
      matchingNumber();
  
      
        if (yourNumber === randomNum) {
            wins++;
            resetGame();
            updateScore(true);
        }

      
        else if (yourNumber > randomNum) {
            losses++;
            resetGame();
            updateScore(false);
        }
    });
  
});  