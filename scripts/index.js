// Rules Scripts
$(".rules-button").click(function() {
  $(".rules-popup-container").css("visibility", "visible");
});

$(".rules-close").click(function() {
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

function createChosenButton (userOrComp, option) {
  $("." + userOrComp + "-container").append("<div id='" + option + "-button-result' class='btn-result'> <div class='circle-result'> <img class='icon-result' src='images/icon-" + option + ".svg' alt='" + option + "icon'> </div> </div>");
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
    // remove result message container
    $(".result-message-container").remove();
    // remove circle-result-divs from user & comp containers so new ones can be created in the next round
    $(".result-container .btn-result").remove();
    // hide result container
    $(".result-container").css("display", "none");
    // show choose sequence container
    $(".choose-sequence-container").css("display", "flex");
  });
}

function showResultMessage(wonOrLostMessage) {
  $(".user-container").after("<div class='result-message-container'> <p class='result-message'>" + wonOrLostMessage + "</p> <div class='play-again-button'> <p>Play Again</p> </div> </div>");
}

var options = ["rock", "paper", "scissors"];

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

  // append user circle-div in user container
  createChosenButton("user", usersChoice);
  // append computer circle-div in computer container
  createChosenButton("computer", computersChoice);

  // game logic
  var wonOrLostMessage = whoWon(usersChoice, computersChoice);

  // add result message container after user container
  showResultMessage(wonOrLostMessage);

  // play again sequence
  playAgain();
});
