var mathGame = function () {
  // DOM Variable Declarations
  var scoreboard = document.querySelector("#scoreboard");
  var highScoreDisplay = document.querySelector("#high-score");
  var countdownDisplay = document.querySelector("#time-remaining span");
  var countdownDiv = document.querySelector("#time-remaining");
  var currentAnswer = "";

  var secondsRemaining = 10;
  var equationAnswer;
  var playerScore = 0;
  var highScore = 0;

  // randomNumber function - generates a random number for equation
  var randomNumber = function (limit) {
    var number = Math.floor(Math.random() * limit);
    return number;
  };

  // generateEquation function - generates two random numbers and return the answer for comparison
  var generateEquation = function () {
    // Generate two random integers between 0 and 9
    var num1 = randomNumber(10);
    var num2 = randomNumber(10);

    // Generate random selection from array of operands
    var operands = ["+", "-", "*", "/"];
    var randomOperand = operands[randomNumber(4)];

    // Filter out invalid equations to ensure the answer is always a positive integer
    // If num1 is smaller than num2 and operand is subtract, flip numbers around 
    if (randomOperand === operands[1] && num1 < num2) {
      var temp = num1;
      num1 = num2;
      num2 = temp;
    }

    // If division operator is selected, ensure that equation returns a positive integer once evaluated
    if (randomOperand === operands[3]) {
      // Filter out the possibility of 0 as num1 or num2
      if (num1 < 1) {
        num1 = 1;
      }

      if (num2 < 1) {
        num2 = 1;
      }

      // Calculate a new number to replace num1 in division equation
      var num3 = num1 * num2;

      // Swap number values for equation evaluation and display in DOM
      num2 = num1;
      num1 = num3;
    }

    // Generate answer 
    var answer = eval(num1 + randomOperand + num2);

    // Manipulate equation container to display generated equation
    var equationString = num1 + " " + randomOperand + " " + num2 + " = ";
    equationText = equationString;
    document.querySelector("#equation").textContent = equationString;

    return answer;
  };

  // checkAnswer function - will be triggered any time a change is detected in the input field and will return true when user puts in correct number
  var checkAnswer = function () {
    // Check if user input is correct
    if (currentAnswer == equationAnswer) {
      document.querySelector(".equation-container input").value = "";
    }

    return equationAnswer;
  };

  // Event listener for keyup - checks user's answer every time a keyup event occurs
  window.addEventListener("keyup", function () {
    // Retrieve the value inputted by user
    currentAnswer = document.querySelector(".equation-container input").value;

    // If the user's answer is correct, increment the score and seconds remaining by 1
    if (checkAnswer() == currentAnswer) {
      playerScore++;
      secondsRemaining++;

      // Update DOM scoreboard and timer and generate a new equation
      scoreboard.textContent = playerScore;
      countdownDisplay.innerHTML = secondsRemaining;
      equationAnswer = generateEquation();
      currentAnswer = "";
    }
  });

  // checkHighScore function - checks game score against saved high score
  var checkHighScore = function (score) {
    // If the user's score is greater than the existing high score, replace the high score
    if (playerScore > highScore) {
      highScore = playerScore;

      // Display updated high score in the DOM
      highScoreDisplay.textContent = highScore;
    }
  };

  // countdown functions
  var countdown = null;

  // stopCoundown function - clears the current timer
  var stopCountdown = function () {
    window.clearInterval(countdown);
    countdown = null;
  };

  // startCountdown function - begins a countdown timer by decrementing from the number of seconds remaining
  var startCountdown = function () {
    // Ensure that there is not another timer already running
    if (!countdown) {
      countdown = setInterval(function () {
        // Display timer updates dynamically in the DOM
        countdownDisplay.innerHTML = --secondsRemaining;

        // When the timer reaches 0 the game is over
        if (secondsRemaining <= 0) {
          stopCountdown();

          // Disable the input field and show the user a button to click if they wish to play again
          document.querySelector(".equation-container input").disabled = true;
          countdownDiv.classList.add("game-over");
          countdownDiv.innerHTML =
            "<button class='btn-play-again'>Play Again</button></p>" +
            "<h1>Game Over!</h1>";

          // Add event listener to Play Again button to start a new round
          var playAgainButton = document.querySelector(".btn-play-again");
          playAgainButton.addEventListener("click", function () {
            // Once the button is clicked, remove it from the DOM by toggling class and enable input field
            countdownDiv.classList.remove("game-over");
            document.querySelector(
              ".equation-container input"
            ).disabled = false;

            // Check for a new high score, reset all variables and DOM to default state, and start a new game
            checkHighScore(playerScore);
            resetGame();
            countdownDisplay = document.querySelector("#time-remaining span");
            playGame();
          });
        }
        // Interval of 1 second
      }, 1000);
    }
  };

  // resetGame function - resets scoreboard, timer, and input to default state
  var resetGame = function () {
    // Reset gameplay variables to default state
    playerScore = 0;
    secondsRemaining = 10;

    // Update DOM to show variables that have been reset and a new timer
    scoreboard.textContent = playerScore;
    countdown = null;
    countdownDiv.innerHTML =
      "Time Remaining:<br /><span>" + secondsRemaining + "</span> seconds";
    document.querySelector(".equation-container input").value = "";
  };

  // playGame function - listens for the initial keyup event to start the countdown timer and begin generating random equations
  var playGame = function () {
    answerInput = document.querySelector(".equation-container input");

    // Add event listener for keyup to start timer once user begins typing an answer
    answerInput.addEventListener("keyup", function () {
      startCountdown();
    });

    equationAnswer = generateEquation();
  };

  // Initiate game
  playGame();
};

mathGame();