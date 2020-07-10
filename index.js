var equationText = document.querySelector("#equation").textContent;

// 1. randomNumber - function to generate random number for equation
var randomNumber = function () {
  var number = Math.floor(Math.random() * 10);
  return number;
};

// 2. generateEquation - function to generate two random numbers and return the answer
var generateEquation = function () {
  // Generate two random integers between 0 and 9
  var num1 = randomNumber();
  var num2 = randomNumber();

  // Generate answer to check for
  var sum = num1 + num2;

  // Manipulate equation container to display generated equation
  var equationString = num1 + " + " + num2 + " = ";
  equationText = equationString;
  document.querySelector("#equation").textContent = equationString;

  return sum;
};

// 3. checkAnswer - function that will be triggered any time a change is detected in the input field and will return true when user puts in correct number
var checkAnswer = function () {
  // Set equation in DOM to correspond with current equation
  var equationAnswer = generateEquation();

  var currentAnswer = document.querySelector(".equation-container input").value;

  if (currentAnswer == equationAnswer) {
    console.log("Nice one! You answered correctly");
  }
  console.log(equationText);
  console.log(currentAnswer);

  return currentAnswer == equationAnswer;
};

checkAnswer();

// 4. incrementScoreboard - when a correct answer is entered, add to scoreboard and increment timer

// 5. countdown - function to countdown from 10

// 6. playGame - function that acts as the index for the game and generates all above functions in order
