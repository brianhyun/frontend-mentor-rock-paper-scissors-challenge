// Rules Scripts
$('.rules-button').click(function () {
    $('.rules-popup-container').css('display', 'flex');
});

$('.rules-close').click(function () {
    $('.rules-popup-container').hide();
});

// Results Sequence Script
function createChosenButton(userOrComp, option, winStyles) {
    // This function will append a div to the .user-container or .computer-container, whether it's for the user or computer depends on the argument passed into the function, that shows what choice that was selected ("rock", "paper", or "scissors").
    if (winStyles == true) {
        // If you're the winner, then you will receive additional styling.
        $('.' + userOrComp + '-container').append(
            "<div class='circle-styling-box'> <div id='" +
                option +
                "-button-result' class='btn-result'> <div class='circle-result'> <img class='icon-result' src='images/icon-" +
                option +
                ".svg' alt='" +
                option +
                "icon'> </div> </div> <div class='winner-circle-styling small-circle'></div> <div class='winner-circle-styling medium-circle'></div> <div class='winner-circle-styling large-circle'></div> </div>"
        );
    } else {
        // if you're the loser, then you don't receive any additional styling.
        $('.' + userOrComp + '-container').append(
            "<div id='" +
                option +
                "-button-result' class='btn-result'> <div class='circle-result'> <img class='icon-result' src='images/icon-" +
                option +
                ".svg' alt='" +
                option +
                "icon'> </div> </div>"
        );
    }
}

/**
 * @desc convert each player's choice to text
 * @param usersChoice
 * @param computersChoice
 * @return text of user's choice, i.e. "rock", "paper", "scissors"
 */
function choiceToText(choice) {
    if (choice === 0) {
        return 'paper';
    } else if (choice === 1) {
        return 'scissors';
    } else if (choice === 2) {
        return 'rock';
    }
}

/**
 * @desc calls createChosenButton which creates the button displaying the player's choice
 * @param winner integer value representing winner of the round
 * @param usersChoice integer value of user's choice
 * @param computersChoice integer value of computer's choice
 * @return none
 */
function showChosenButtons(winner, usersChoice, computersChoice) {
    createChosenButton('user', choiceToText(usersChoice), userWin);
    createChosenButton('computer', choiceToText(computersChoice), compWin);
}

/**
 * @desc adds an event handler on the play again button refreshing the game
 * @param none
 * @return none
 */
function playAgain() {
    $('.play-again-button').click(() => {
        $('.result-message').empty();

        // remove circle-result-divs from user & comp containers so new ones can be created in the next round
        $('.result-container .btn-result').remove();

        // remove .circle-styling-box for winners
        $('.circle-styling-box').remove();

        $('.result-container').hide();
        $('.choose-sequence-container').css('display', 'flex');

        // reset userWin and compWin
        (userWin = 0), (compWin = 0);
    });
}

/**
 * @desc appends the appropriate result message in the proper location
 * @param int the winner as a numerical value
 * @return int - return 0 for draw, -1 for computer win, 1 for user win
 */
function showResultMessage(winner) {
    let message = '';

    if (winner === 0) {
        message = 'Draw';
    } else if (winner === -1) {
        message = 'You Lose!';
    } else if (winner === 1) {
        message = 'You Win!';
    }

    $('.result-message').text(message);
}

/**
 * @desc determines the winner of the round and sets userWinOrLose and compWinOrLose for later styling (1 for win, 0 for lose)
 * @param int usersChoice - the user's choice
 * @param int computersChoice - the computer's choice
 * @return int - return 0 for draw, -1 for computer win, 1 for user win
 */
function whoWon(usersChoice, computersChoice) {
    if (usersChoice == computersChoice) {
        return 0;
    } else if (
        (usersChoice == 2 && computersChoice == 0) ||
        (usersChoice == 0 && computersChoice == 1) ||
        (usersChoice == 1 && computersChoice == 2)
    ) {
        compWin = 1;
        return -1;
    } else {
        userWin = 1;
        return 1;
    }
}

/**
 * @desc adjusts the score text based off of the winner
 * @param int result from whoWon() function
 * @return void - changes text in score number element tag
 */
function adjustScore(winner) {
    score += winner;
    $('.header__score-number').text(score.toString());
}

// Game Logic
let score = 0,
    userWin = 0,
    compWin = 0;

$('.btn').click((event) => {
    // Display Results Container
    $('.choose-sequence-container').hide();
    $('.result-container').css('display', 'flex');

    // Determine Winner
    const computersChoice = Math.floor(Math.random() * 3);
    const usersChoice = parseInt(event.currentTarget.dataset.choice);
    const winner = whoWon(usersChoice, computersChoice);

    // Adjust Score Display
    adjustScore(winner);

    // create circle-result-divs that show the user's choice and the computer's choice inside game container
    showChosenButtons(winner, usersChoice, computersChoice);

    // add .result-message-container (includes win/loss message and play again button) after user container
    showResultMessage(winner);

    playAgain();
});
