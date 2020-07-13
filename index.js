var equationText = document.querySelector("#equation").textContent;
var scoreboard = document.querySelector("#scoreboard");
var highScoreDisplay = document.querySelector("#high-score");
var countdownDisplay = document.querySelector("#time-remaining span");
var countdownDiv = document.querySelector("#time-remaining");
var currentAnswer = "";
var equationAnswer;
var playerScore = 0;
var highScore = 0;
var secondsRemaining = 10;

// 1. randomNumber - function to generate random number for equation
var randomNumber = function (limit) {
  var number = Math.floor(Math.random() * limit);
  return number;
};

// 2. generateEquation - function to generate two random numbers and return the answer
var generateEquation = function () {
  // Generate two random integers between 0 and 9
  var num1 = randomNumber(10);
  var num2 = randomNumber(10);

  // Generate random selection from array of operands
  var operands = ["+", "-", "*", "/"];
  var randomOperand = operands[randomNumber(4)];

  // Generate answer to check for, rounded to a single decimal place in case of decimal
  var answer = Math.floor(eval(num1 + randomOperand + num2));
  console.log("sum:" + answer);
  // Filter out and avoid any any unreasonable equations
  // Avoid any questions that result in an answer of Infinity (i.e. dividing by 0)

  // Manipulate equation container to display generated equation
  var equationString = num1 + " " + randomOperand + " " + num2 + " = ";
  equationText = equationString;
  document.querySelector("#equation").textContent = equationString;

  return answer;
};

// 3. checkAnswer - function that will be triggered any time a change is detected in the input field and will return true when user puts in correct number
var checkAnswer = function () {
  // Set equation in DOM to correspond with current equation

  if (currentAnswer == equationAnswer) {
    document.querySelector(".equation-container input").value = "";
  }

  return equationAnswer;
};

// Event listener for keyup - checks user's answer every time a key is pressed
window.addEventListener("keyup", function () {
  currentAnswer = document.querySelector(".equation-container input").value;

  if (checkAnswer() == currentAnswer) {
    playerScore++;
    secondsRemaining++;

    // Update scoreboard and timer
    scoreboard.textContent = playerScore;
    countdownDisplay.innerHTML = secondsRemaining;
    equationAnswer = generateEquation();
    currentAnswer = "";
  }
});

// checkHighScore - function to check game score against saved high score
var checkHighScore = function (score) {
  if (playerScore > highScore) {
    highScore = playerScore;
    highScoreDisplay.textContent = highScore;
  }
};

// 4. countdown - function to countdown from 10
var countdown = null;

var stopCountdown = function () {
  window.clearInterval(countdown);
  countdown = null;
};

var startCountdown = function () {
  if (!countdown) {
    countdown = setInterval(function () {
      countdownDisplay.innerHTML = --secondsRemaining;

      if (secondsRemaining <= 0) {
        stopCountdown();
        document.querySelector(".equation-container input").disabled = true;
        countdownDiv.classList.add("game-over");
        countdownDiv.innerHTML =
          "<button class='btn-play-again'>Play Again</button></p>" +
          "<h1>Game Over!</h1>";
        // Add event listener to Play Again button to start a new round
        var playAgainButton = document.querySelector(".btn-play-again");
        playAgainButton.addEventListener("click", function () {
          countdownDiv.classList.remove("game-over");
          document.querySelector(".equation-container input").disabled = false;
          checkHighScore(playerScore);
          resetGame();
          countdownDisplay = document.querySelector("#time-remaining span");
          playGame();
        });
      }
    }, 1000);
  }
};

// 5. resetGame - function to reset scoreboard, timer, and input to default state
var resetGame = function () {
  playerScore = 0;
  secondsRemaining = 10;

  scoreboard.textContent = playerScore;
  countdown = null;
  countdownDiv.innerHTML =
    "Time Remaining:<br /><span>" + secondsRemaining + "</span> seconds";
  document.querySelector(".equation-container input").value = "";
};

// 6. playGame - function that acts as the index for the game and generates all above functions in order
var playGame = function () {
  answerInput = document.querySelector(".equation-container input");
  // Add event listener for keyup to commence game once user enters input
  answerInput.addEventListener("keyup", function () {
    startCountdown();
  });

  equationAnswer = generateEquation();
};

playGame();
