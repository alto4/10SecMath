var equationText = document.querySelector("#equation").textContent;
var scoreboard = document.querySelector("#scoreboard");
var currentAnswer = "";
var equationAnswer;
var playerScore = 0;
var secondsLeft = 10;

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
  var answer = Math.round(eval(num1 + randomOperand + num2));
  console.log("sum:" + answer);
  // Manipulate equation container to display generated equation
  var equationString = num1 + " " + randomOperand + " " + num2 + " = ";
  equationText = equationString;
  document.querySelector("#equation").textContent = equationString;

  return answer;
};

// Event listener for keyup - checks user's answer every time a key is pressed
window.addEventListener("keyup", function () {
  currentAnswer = document.querySelector(".equation-container input").value;

  if (checkAnswer() == currentAnswer) {
    playerScore++;
    secondsLeft++;

    // Update scoreboard and timer
    scoreboard.textContent = playerScore;
    equationAnswer = generateEquation();
    currentAnswer = "";
  }
});

// 3. checkAnswer - function that will be triggered any time a change is detected in the input field and will return true when user puts in correct number
var checkAnswer = function () {
  // Set equation in DOM to correspond with current equation

  if (currentAnswer == equationAnswer) {
    console.log("Nice one! You answered correctly");
    document.querySelector(".equation-container input").value = "";
  }

  return equationAnswer;
};

// 4. countdown - function to countdown from 10
var countdown = function () {};
// 5. resetGame - function to reset scoreboard, timer, and input to default state
var resetGame = function () {
  playerScore = 0;
  secondsLeft = 10;
  document.querySelector(".equation-container input").value = "";
  scoreboard.textContent = 0;
};

// 6. playGame - function that acts as the index for the game and generates all above functions in order
var playGame = function () {
  equationAnswer = generateEquation();
};

playGame();

// timer function to dynamically count down

// restart function that pauses timer and then starts new countdown upon change in input field
