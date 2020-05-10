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
    return "draw";
  } else if ((uc == "rock" && cc == "paper") || (uc == "paper" && cc == "scissors") || (uc == "scissors" && cc == "rock")) { // user loses
    return "user lost";
  } else { // user wins
    return "user won";
  }
}

var options = ["rock", "paper", "scissors"];
var randomIndex = Math.floor(Math.random() * 3);
var computersChoice = options[randomIndex];

$("#rock-button, #paper-button, #scissors-button").click(function(event) {
  // hide choose sequence container
  $(".choose-sequence-container").css("display", "none");
  // display results container
  $(".result-container").css("display", "flex");

  // needed to create new div and image file path
  var usersChoice = convertButtonIdToChoice(event.currentTarget.id);

  // create user-chosen button div inside user container
  createChosenButton("user", usersChoice);
  // create computer-chosen button div insider computer container
  createChosenButton("computer", computersChoice);

  // add result message container after user container
  $(".user-container").after("<p>hello</p>");

  // game logic
  var win = whoWon(usersChoice, computersChoice);
  console.log("Results: " + win);

  // Console Logs
  console.log("Your choice: " + event.currentTarget.id);
  console.log("Computer's choice: " + options[randomIndex]);
});
