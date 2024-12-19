/*
    While this Odin Project assignment explicitly says to run the game in the console, I've decided to ignore that
    instruction as I want to practice more with HTML and its interaction with JavaScript. Plus, given that the game is
    running in a browser, it didn't make sense to me to not use a UI I had access to. For the same reason, I don't use
    alert() or prompt()- plus a lot of browsers will see the frequent use of alert() as annoying, given that you can
    suppress alerts.

    Unlike the Landing Page assignment, I've commented this code as heavily as possible, since it's reasonable of me to
    expect newbies to programming to view this assignment as well. There are some things in this assignment that won't
    make sense to a newbie, especially if they've only read Odin Project, but a veteran will see these tricks from a
    mile away.

    Yes, I'm a back-end developer, how could you tell?
*/

/*
    This is Javascript's implementation of an Enumeration, or just Enum- it lets me set constant values that have an
    alias. For example, console.log(handEnum.ROCK) will output "rock" into the console. It's a lot easier than copying
    and comparing the same string a thousand times, and generally a lot safer to use in other languages.
    - Side note, enums aren't usually defined with the name "xEnum", that's just something I did here for clarity.
*/ 
const handEnum = {
    ROCK: "rock",
    PAPER: "paper",
    SCISSORS: "scissors",
    UNKNOWN: "unknown"
}

// Initialize both the human player's score and the computer's score, plus the current game being played.
var humanScore = 0;
var computerScore = 0;
var gameCount = 0; // We're zero-indexing this to be safe; once the counter hits 5, declare a winner.

/*
    Using math.random(), the computer selects rock, paper, or scissors.
    Instead of trying to go "okay, check if the result of math.random() is below 0.333" it's easier to multiply the
    output by 3 and just check if the resulting output is below 1 or 2. 1 / 3 ~= 0.333 (approximately) after all, and
    the math works in reverse. It's how you set a maximum value using math.random().
    - side note, if you want to set a minimum value, add your minimum value to the result AFTER multiplying.
      example: (math.random() * 3) + 1 will generate a value between 1 and 4.
    
    For this function, any value below 1 is Rock, any value below 2 is Paper, and any other possible value is Scissors;
    no point in checking if the value is less than or equal to 3, since math.random() never returns 1.
*/
function computerSelects() { 
    var computerChoice = Math.random() * 3;
    if (computerChoice < 1) {
        return handEnum.ROCK;
    } else if (computerChoice < 2) {
        return handEnum.PAPER;
    } else {
        return handEnum.SCISSORS;
    }
}

/*
    Using getElementById I can query a specific HTML tag (in this case an input) for its value. I then do hard
    string comparisons against it and return a specific enum.
    If the user put in something that isn't rock, paper, or scissors, I return an unknown value- throwHand() knows to
    warn the user to input proper values.
    I could have used radio buttons to simplify this but I already had a text box and didn't want to fiddle with
    radio buttons yet. It does mean I have to warn the user when they're inputting bad data though.
*/
function humanSelects() {
    var humanChoice = document.getElementById("input").value;
    console.log("Human input " + humanChoice);
    if (humanChoice === "rock") {
        return handEnum.ROCK;
    } else if (humanChoice === "paper") {
        return handEnum.PAPER;
    } else if (humanChoice === "scissors") {
        return handEnum.SCISSORS;
    } else {
        return handEnum.UNKNOWN;
    }
}

/*
    This is the function that actually plays each round. Normally there'd be a loop or something here, but instead I'm
    triggering each move based on the user clicking the "Throw Hand" button, so that's a natural loop right there, just
    at human speed instead of CPU speed.
*/
function throwHand() {
    var computerChoice = computerSelects();
    var humanChoice = humanSelects();

    var result = "";

    // First, check a few cases before actually determining the winner.
    if (humanChoice === handEnum.UNKNOWN) {
        // User gave bad input- warn the player. Do not increment score or game counter.
        result = "Bad input detected! Please insert one of the following values: ['rock', 'paper', 'scissors']";
    } else if (humanChoice === computerChoice) {
        // Draw - since both are the same, no winner. Do not increment score but DO increment game counter.
        result = "Draw!";
        gameCount += 1; // x += 1 is shorthand for x = x + 1.
    } else {
        /*
            Any cases outside of win or lose have been covered above, so now determine the winner, output the result,
            and increment the winner's score.
            Since each of the human inputs has a distinct CPU input for victory (e.g. rock beats scissors) we're going
            to simply check if the CPU generated a state where it lost- otherwise, assume the CPU wins (draw was handled
            in a previous if condition).
            There's probably a better way of handling the checks below- this was the fastest solution to implement I
            could think of.
        */
        if (computerChoice == handEnum.ROCK && humanChoice == handEnum.PAPER
            || computerChoice == handEnum.PAPER && humanChoice == handEnum.SCISSORS
            || computerChoice == handEnum.SCISSORS && humanChoice == handEnum.ROCK
        ) {
            result = "You win!";
            humanScore += 1;
        } else {
            result = "You lose!";
            computerScore += 1;
        }
        gameCount += 1;
    }

    /*
        Let's update the UI all in the same place for code simplicity- this way we don't have to copy the same code
        half a dozen times.
    */
    document.getElementById("cpu_choice").innerText = "CPU picked: " + computerChoice;
    document.getElementById("res").innerText = result;
    document.getElementById("game_count").innerText = "This is game " + gameCount;
    document.getElementById("human_score").innerText = "Your score: " + humanScore;
    document.getElementById("cpu_score").innerText = "CPU score: " + computerScore;
}