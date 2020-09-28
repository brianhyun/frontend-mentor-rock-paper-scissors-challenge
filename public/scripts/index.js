// Rules Scripts
// To show rules modal--for desktop and mobile version
$(".rules-button").click(function() {
  $(".rules-popup-container").css("visibility", "visible");
});

// To hid rules modal--for desktop version
$(".rules-close").click(function() {
  $(".rules-popup-container").css("visibility", "hidden");
});

// To hide rules modal--for mobile version
$(".rules-card:last-child").click(function() {
  $(".rules-popup-container").css("visibility", "hidden");
});

// Choose Sequence Script
function convertButtonIdToChoice(eventTargetId) {
  // parse event.currentTarget.id (e.g. "paper-button") and extract option (e.g. "paper")
  // return option as string value of "paper", "rock", or "scissors"
  var usersChoice = eventTargetId;
  if (usersChoice == "paper-button") {
    usersChoice = "paper";
  } else if (usersChoice == "scissors-button") {
    usersChoice = "scissors";
  } else { // usersChoice == "rock-button"
    usersChoice = "rock";
  }
  return usersChoice; // expected return values: "paper", "rock", or "scissors"
}

var title_count = 0;

// Results Sequence Script
function createChosenButton (userOrComp, option, winCssStyling = false) {
  // This function will append a div to the .user-container or .computer-container, whether it's for the user or computer depends on the argument passed into the function, that shows what choice that was selected ("rock", "paper", or "scissors").
  if (winCssStyling == true) { // if you're the winner, then you will receive additional styling
      $("." + userOrComp + "-container").append("<div class='circle-styling-box'> <div id='" + option + "-button-result' class='btn-result'> <div class='circle-result'> <img class='icon-result' src='images/icon-" + option + ".svg' alt='" + option + "icon'> </div> </div> <div class='winner-circle-styling small-circle'></div> <div class='winner-circle-styling medium-circle'></div> <div class='winner-circle-styling large-circle'></div> </div>");
  } else { // if you're the loser, then you don't receive any additional styling
      $("." + userOrComp + "-container").append("<div id='" + option + "-button-result' class='btn-result'> <div class='circle-result'> <img class='icon-result' src='images/icon-" + option + ".svg' alt='" + option + "icon'> </div> </div>");
  }

  // This function, createChosenButton, will be executed twice, one for the user and the other for the computer. We want to remove the 1440px Desktop styling and incorporate the mobile styling, where the "you-picked" text is below the chosen buttons as opposed to above. I created a variable to make sure the if-statement is only executed twice, one for each player and reset the variable count in the main game function.
  if (x.matches && title_count <= 1) {
    $("." + userOrComp + "-container p").remove();
    if (userOrComp == "user") {
      $("." + userOrComp + "-container").append("<p class='container-title'>You Picked</p>");
    } else {
      $(".computer-container").append("<p class='container-title'>The House Picked</p>");
    }
  }

}

function whoWon (uc, cc) {
  // uc = usersChoice, cc = computersChoice
  if (uc == cc) { // draw
    return "Draw";
  } else if ((uc == "rock" && cc == "paper") || (uc == "paper" && cc == "scissors") || (uc == "scissors" && cc == "rock")) { // user loses
    return "You Lose";
  } else { // user wins
    return "You Win";
  }
}

function playAgain() {
  $(".play-again-button").click(function() {
    // remove .result-message-container
    $(".result-message-container").remove();
    // remove circle-result-divs from user & comp containers so new ones can be created in the next round
    $(".result-container .btn-result").remove();
    // remove .circle-styling-box for winners
    $(".circle-styling-box").remove();
    // hide .result-container
    $(".result-container").css("display", "none");
    // show .choose-sequence-container
    $(".choose-sequence-container").css("display", "flex");
  });
}

function showChosenButtons(wonOrLostMessage, usersChoice, computersChoice) {
  if (wonOrLostMessage == "You Win") { // user wins
    // append user circle-div in user container
    createChosenButton("user", usersChoice, true);
    // append computer circle-div in computer container
    createChosenButton("computer", computersChoice);
    // increase user win count
    userWinCount++;
    // change the score displayed
    $(".score-number").text("" + userWinCount + "");
  } else if (wonOrLostMessage == "You Lose"){ // computer wins
    createChosenButton("user", usersChoice);
    createChosenButton("computer", computersChoice, true);
    // decrease user win count
    userWinCount--;
    // change the score displayed
    $(".score-number").text("" + userWinCount + "");
  } else { // draw
    createChosenButton("user", usersChoice);
    createChosenButton("computer", computersChoice);
  }
}

var x = window.matchMedia("(max-width: 375px)");

function showResultMessage(wonOrLostMessage) {
  // if screen size is 375px or less, then (1) attach the results message and play again button after the game container (2) and remove paragraph items (you picked and the house picked) from the top and move them to the bottom
  if (x.matches) {
    $(".game-container").after("<div class='result-message-container'> <p class='result-message'>" + wonOrLostMessage + "</p> <div class='play-again-button'> <p>Play Again</p> </div> </div>");
  } else {
    $(".user-container").after("<div class='result-message-container'> <p class='result-message'>" + wonOrLostMessage + "</p> <div class='play-again-button'> <p>Play Again</p> </div> </div>");
  }

}

// Start Game Sequence
var options = ["rock", "paper", "scissors"];
var userWinCount = 0;

$("#rock-button, #paper-button, #scissors-button").click(function(event) {
  // generate random number to index options array -- this will be computer's choice
  var randomIndex = Math.floor(Math.random() * 3);
  var computersChoice = options[randomIndex];

  // hide choose sequence container
  $(".choose-sequence-container").css("display", "none");
  // display results container
  $(".result-container").css("display", "flex");

  // needed to create new div and image file path
  var usersChoice = convertButtonIdToChoice(event.currentTarget.id);

  // game logic
  var wonOrLostMessage = whoWon(usersChoice, computersChoice);

  // create circle-result-divs that show the user's choice and the computer's choice inside game container
  showChosenButtons(wonOrLostMessage, usersChoice, computersChoice);

  // add .result-message-container (includes win/loss message and play again button) after user container
  showResultMessage(wonOrLostMessage);

  // reset title-count
  title_count = 0;

  // play again sequence
  playAgain();
});
