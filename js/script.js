const numberInput = document.querySelector(".number-input"); //INPUT BOX FOR PLAYER'S GUESS
const mysteryNumber = document.querySelector(".mystery-number"); //PLACEHOLDER FOR COM'S RANDOM NUMBER
const clues = document.querySelector(".clues"); //UL THAT HOLDS COM'S CLUES
const guessesLeft = document.querySelector(".guesses-left"); //SPAN THAT DISPLAYS HOW MANY GUESSES USER HAS LEFT
const lastGuess = document.querySelector(".last-guess"); //DIV THAT SHOWS OR HIDES PLAYER'S LAST GUESS
const guessedNumber = document.querySelector(".guessed-number"); //UL THAT DISPLAYS PLAYER'S GUESS
const submitGuess = document.querySelector(".submit-guess"); //SUBMIT BUTTON FOR PLAYER'S GUESS
const playAgain = document.querySelector(".play-again"); //BUTTON FOR RESTARTING THE GAME
const message = document.querySelector(".message"); //LABEL THAT DISPLAYS FEEDBACK IF USER INPUT IS WRONG

//VARIABLES FOR STATS SECTION
const totalRounds = document.querySelector(".total-rounds"); //SPAN THAT DISPLAYS TOTAL NUMBER OF ROUNDS USER HAS PLAYED
const wins = document.querySelector(".wins"); //SPAN THAT DISPLAYS TOTAL NUMBER OF ROUNDS USER HAS PLAYED
const losses = document.querySelector(".losses"); //SPAN THAT DISPLAYS TOTAL NUMBER OF ROUNDS USER HAS PLAYED
const timeSpent = document.querySelector(".time-spent"); //SPAN THAT DISPLAYS TOTAL NUMBER OF ROUNDS USER HAS PLAYED

let msgClue = [];
let numberOfGuesses = 10;


//COM GENERATES RANDOM NUMBER
const getRandomNumber = function () {
    const randomNumbersArray = [];  //THIS ARRAY WILL HOLD RANDOM DIGITS
    // COM GENERATES 3 RANDOM DIGITS BETWEEN 0 TO 9
    for (let i=0; i<3; i++) {
        let randomDigit = Math.floor(Math.random() * 10);
        randomNumbersArray.push(randomDigit.toString());
    };
    //IF FIRST RANDOM DIGIT IS "0", COM REPLACES IT WITH ANOTHER DIGIT BETWEEN 1 TO 9
    if (randomNumbersArray[0] === "0") {
        let firstDigit = Math.floor(Math.random() * 8 + 1);
        randomNumbersArray[0] = firstDigit.toString();
    };
    console.log(`COM'S GUESS: ${randomNumbersArray}`);
    console.log(randomNumbersArray);
    return randomNumbersArray;
};


//COM GETS AND VALIDATES PLAYER INPUT
const verifyUserInput = function (newInput) {
    if (isNaN(newInput)) {
        message.classList.add("warning");
        message.innerText = "Your guess is not a number. Please, enter a 3-digit number to continue.";
    } else if (newInput < 100 || newInput > 999) {
        message.classList.add("warning");
        message.innerText = "Your guess is not a 3-digit number. Please, enter a 3-digit number to continue.";
    };
};

const getPlayerInput = function () {
    clues.innerHTML = "";
    msgClue = [];
    const newInput = numberInput.value;
    numberInput.value = "";
    verifyUserInput(newInput);
    const playerGuess = newInput.toString().split("");
    console.log(`Player's Guess: ${playerGuess}`);
    console.log(playerGuess);
    return playerGuess;
};


//CHECK WIN OR LOSS
const checkWinOrLoss = function () {
    const rightGuess = ["Fermi", "Fermi", "Fermi"];
    console.log(`Your guess: ${msgClue}`);
    console.log(`The right guess: ${rightGuess}`)
    
    
    if (guessesLeft.innerText === "1") {
        message.innerText = "You have run out of guesses! Sorry.";
        guessesLeft.innerText = "0";
        submitGuess.classList.add("hide");
        playAgain.classList.remove("hide");
        numberInput.classList.add("hide");
    } else if (JSON.stringify(msgClue) === JSON.stringify(rightGuess)) {
        message.innerText = "You guessed the correct number! Good job!!!";
        submitGuess.classList.add("hide");
        playAgain.classList.remove("hide");
    } else {
        message.innerText = "Wrong guess. Try again?";
        numberOfGuesses -= 1;
        guessesLeft.innerText = numberOfGuesses;
        console.log(`number of guesses: ${numberOfGuesses}`);
    };
};


//DISPLAY COM'S CLUES AFTER PLAYER'S GUESS
const displayClues = function () {
    for (let item of msgClue) {
        let clue = item;
        console.log(clue);
        let li = document.createElement("li");
        li.innerText = clue;
        clues.append(li);
    };
};


//CHECK IF PLAYER ENTRY MATCHES THE RANDOMLY-GENERATED NUMBER
const checkMatch = function (newGuess, mysteryDigits) {
    
    mysteryDigits.forEach(function (element, index) {
        //let msgClue = [];
        console.log(element);
        console.log(newGuess[index]);
        if (mysteryDigits[index] === newGuess[index]) {
            msgClue.push("Fermi");
        } else if (newGuess.includes(element)) {
            msgClue.push("Pico");
        };
    });

    if (msgClue.length < 1) {
        msgClue.push("Bagels");
    };

    console.log(msgClue);

    checkWinOrLoss();
    displayClues();
};




//THE GAME SEQUENCE
let mysteryDigits = getRandomNumber();
submitGuess.addEventListener("click", function (e) {
    e.preventDefault();
    if (message.classList.contains("warning")) {
        message.classList.remove("warning");
        message.innerText = "";
    };
    const newGuess = getPlayerInput();
    console.log(newGuess);
    checkMatch(newGuess, mysteryDigits);
});



//LET PLAYER RESTART GAME
playAgain.addEventListener("click", function () {
    numberOfGuesses = 10;
    guessesLeft.innerText = numberOfGuesses;
    clues.innerHTML = "";
    message.innerText = "";
    numberInput.classList.remove("hide");
    submitGuess.classList.remove("hide");
    playAgain.classList.add("hide");
    mysteryDigits = getRandomNumber();
});



/**const guessedLettersHolder = document.querySelector(".guessed-letters"); //The unordered list where the player’s guessed letters will appear.
const guess = document.querySelector(".guess"); //The button with the text “Guess!” in it.
const letter = document.querySelector(".letter"); //The text input where the player will guess a letter.
const wordInProgress = document.querySelector(".word-in-progress"); //The empty paragraph where the word in progress will appear.
const remaining = document.querySelector(".remaining"); //The paragraph where the remaining guesses will display.
const guessesRemaining = document.querySelector(".remaining span"); //The span inside the paragraph where the remaining guesses will display.
const message = document.querySelector(".message"); //The empty paragraph where messages will appear when the player guesses a letter.
const playAgain = document.querySelector(".play-again"); //The hidden button that will appear prompting the player to play again.

//FETCH AND ASSIGN RANDOM WORD FROM API
const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const wordBank = await response.text();
    const wordList = wordBank.split("\n");
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const randomWord = (wordList[randomIndex]).trim();
    word = randomWord;
    setPlaceholder(word);
    console.log(wordList[randomIndex]);
};

getWord();


let remainingGuesses = 8;
guessedLetters = [];

//REPLACE LETTERS WITH CIRCLES
const setPlaceholder = function (word) {
    for (let alphabet of word) {
        wordInProgress.innerText += "●";
    }
    console.log(wordInProgress);
};


guess.addEventListener("click", function (e) {
    e.preventDefault();
    const newInput = letter.value;
    message.innerText = "";
    const newGuess = validateInput(newInput);
    console.log(newGuess);
    makeGuess(newGuess);
    letter.value = "";
});

//VALIDATE USER'S INPUT
const validateInput = function (input) {
    //ENSURE THAT INPUT IS A LETTER
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "You must enter a letter to continue playing the game";
    } else if (input.length > 1) {
        message.innerText = "You have entered two or more letters. Please enter only ONE letter to continue playing the game";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Wrong guess. Try again!";
    } else {
        return input;
    };
};

//ADD GUESSES TO GUESSED LETTERS VARIABLE
const makeGuess = function (anyLetter) {
    anyLetter = anyLetter.toUpperCase();
    console.log(anyLetter);
    if (guessedLetters.includes(anyLetter)) {
        message.innerText = "You have already guessed this letter.";
        console.log(message.innerText);
    } else {
        guessedLetters.push(anyLetter);
        console.log(guessedLetters);
        updateGuessCount(anyLetter);
        showGuessedLetters();
        updateWord(guessedLetters);
    };
};

//SHOW GUESSED LETTERS
const showGuessedLetters = function () {
    guessedLettersHolder.innerHTML = "";
    for (let item of guessedLetters) {
        let li = document.createElement("li");
        li.innerText = item;
        console.log(li);
        guessedLettersHolder.append(li);
    };
};

//UPDATE THE WORD IN PROGRESS
const updateWord = function (guessedLetters) {
    let wordUpper = word.toUpperCase();
    let wordArray = wordUpper.split("");
    const revealWord = [];
    for (let item of wordArray) {
        if (guessedLetters.includes(item)) {
            console.log(item.toUpperCase());
            revealWord.push(item.toUpperCase());
        } else {
            revealWord.push("●");
        };
    };
    wordInProgress.innerText = revealWord.join("");
    winOrLose();
};

//COUNT REMAINING GUESSES
const updateGuessCount = function (newInput) {
    let wordUpper = word.toUpperCase();
    if (wordUpper.includes(newInput)) {
        message.innerText = "You have guessed a correct letter!!";
        remainingGuesses -= 1;
    } else {
        message.innerText = "You have made a wrong guess!!";
        remainingGuesses -= 1;
    };
    if (remainingGuesses === 0) {
        message.innerText = `GAMEOVER!!! Our secret word is ${wordUpper}!!!`;
        startOver();
    } else if (remainingGuesses === 1) {
        guessesRemaining.innerText = "1 guess";
    } else {
        guessesRemaining.innerText = `${remainingGuesses} guesses`;
    };
};

//CHECK IF PLAYER HAS WON OR LOST THE GAME
const winOrLose = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
        startOver();
    };
};


//RESTART OR REPLAY GAME
const startOver = function () {
    guess.classList.add("hide");
    guessedLettersHolder.classList.add("hide");
    remaining.classList.add("hide");
    playAgain.classList.remove("hide");
};


playAgain.addEventListener("click", function () {
    message.classList.remove("win");
    guessedLettersHolder.innerText = "";
    message.innerText = "";
    remainingGuesses = 8;
    guessedLetters = [];
    wordInProgress.innerText = "";
    guessesRemaining.innerText = `${remainingGuesses} guesses`;
    guess.classList.remove("hide");
    guessedLettersHolder.classList.remove("hide");
    remaining.classList.remove("hide");
    playAgain.classList.add("hide");
    getWord();
});*/