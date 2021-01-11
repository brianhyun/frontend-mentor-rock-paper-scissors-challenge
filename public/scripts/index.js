// Rules Scripts
// To show rules modal--for desktop and mobile version
$('.rules-button').click(function () {
    $('.rules-popup-container').css('display', 'flex');
});

// To hide rules modal--for desktop version
$('.rules-close').click(function () {
    $('.rules-popup-container').hide();
});

// To hide rules modal--for mobile version
$('.rules-card:last-child').click(function () {
    $('.rules-popup-container').hide();
});

let x = window.matchMedia('(max-width: 375px)');
let title_count = 0;

// Results Sequence Script
function createChosenButton(userOrComp, option, winCssStyling = false) {
    // This function will append a div to the .user-container or .computer-container, whether it's for the user or computer depends on the argument passed into the function, that shows what choice that was selected ("rock", "paper", or "scissors").
    if (winCssStyling == true) {
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

    // This function, createChosenButton, will be executed twice, one for the user and the other for the computer.
    // We want to remove the 1440px Desktop styling and incorporate the mobile styling, where the "you-picked" text is below the chosen buttons as opposed to above.
    // I created a variable to make sure the if-statement is only executed twice, one for each player and reset the variable count in the main game function.
    if (x.matches && title_count <= 1) {
        $('.' + userOrComp + '-container p').remove();
        if (userOrComp == 'user') {
            $('.' + userOrComp + '-container').append(
                "<p class='container-title'>You Picked</p>"
            );
        } else {
            $('.computer-container').append(
                "<p class='container-title'>The House Picked</p>"
            );
        }
    }
}

function whoWon(usersChoice, computersChoice) {
    /* 
		Return the winner of the game. 
		Input: 0 = paper, 1 = scissors, 2 = rock
		Output: 0 = draw, -1 = computer won, 1 = user won 
	*/
    if (usersChoice == computersChoice) {
        return 0;
    } else if (
        (usersChoice == 2 && computersChoice == 0) ||
        (usersChoice == 0 && computersChoice == 1) ||
        (usersChoice == 1 && computersChoice == 2)
    ) {
        return -1;
    } else {
        return 1;
    }
}

function playAgain() {
    $('.play-again-button').click(function () {
        // remove .result-message-container
        $('.result-message-container').remove();

        // remove circle-result-divs from user & comp containers so new ones can be created in the next round
        $('.result-container .btn-result').remove();

        // remove .circle-styling-box for winners
        $('.circle-styling-box').remove();

        // hide .result-container
        $('.result-container').css('display', 'none');

        // show .choose-sequence-container
        $('.choose-sequence-container').css('display', 'flex');
    });
}

function showChosenButtons(winner, usersChoice, computersChoice) {
    /* 
		Display the buttons chosen by each player. 
		Input: 
			winner = 1, user won
			winner = -1, computer won 
			winner = 0, draw
	*/
    if (winner == 1) {
        // append user circle-div in user container
        createChosenButton('user', usersChoice, true);
        // append computer circle-div in computer container
        createChosenButton('computer', computersChoice);
    } else if (winner == -1) {
        createChosenButton('user', usersChoice);
        createChosenButton('computer', computersChoice, true);
    } else {
        createChosenButton('user', usersChoice);
        createChosenButton('computer', computersChoice);
    }
}

function showResultMessage(winner) {
    /* 
		Append the result message at the proper location. 

		If the screen size is 375px or less, then:
			(1) attach the results message and play again button after the game-container and 
			(2) remove paragraph items (you picked and the house picked) from the top and move them to the bottom.
		Otherwise, attach after the user-container.
	*/
    let message = '';

    if (winner === 0) {
        message = 'Draw';
    } else if (winner === -1) {
        message = 'You Lose!';
    } else if (winner === 1) {
        message = 'You Win!';
    }

    const result_message = `<div class='result-message-container'> <p class='result-message'>${message}</p> <div class='play-again-button'> <p>Play Again</p> </div> </div>`;
    $('.user-container').after(result_message);
}

function adjustScore(winner) {
    /*
		Adjust the score based off the winner. 

		Input:
			winner = 0, draw 
			winner = 1, user won  
			winner = -1, computer won 
	*/
    score += winner;
    $('.score-number').text(score.toString());
}

// Game Logic
let score = 0;

$('.btn').click(function (event) {
    // Hide choose sequence container.
    $('.choose-sequence-container').css('display', 'none');
    // Display results container.
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

    // reset title-count
    title_count = 0;

    // play again sequence
    playAgain();
});
