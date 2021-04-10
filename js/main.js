/* ----------------------------------------------------------
   -------------------- HANGMAN ----------------------------- 
   ----------------------------------------------------------
*/


// Hangman obj
let Hangman = function(word, isGuessed, id) {

    this.word = word;
    this.isGuessed = isGuessed;
    this.id = id;
    this.missingLetters = [];


    this.guessed = function() {
        this.isGuessed = true;
    };
    this.notGuessed = function() {
        this.isGuessed = false;
    };
}

// arrays 
let hangmenList = [];
let numberOfMissingLetters = 4;
let maxNumberOfGuesses = 6;
let numberOfGuesses = 0;
let numberOfWrongLetters = 0;
let numberOfRightLetters = 0;
let numberOfLostGames = 0;
let numberOfWonGames = 0;

// on create
createHangmanWord("MONITOR");
createHangmanWord("LETTER");
createHangmanWord("KEYBOARD");
createHangmanWord("MOUSE");
createHangmanWord("BEDROOM");
createHangmanWord("JOYSTICK");
createHangmanWord("DESKTOP");
createHangmanWord("FLYWHEEL");
createHangmanWord("LAPTOP");
createHangmanWord("STADIUM");
createHangmanWord("MONTH");
createHangmanWord("CHURCH");
createHangmanWord("REASON");
createHangmanWord("BUTTON");
createHangmanWord("GOVERNMENT");
createHangmanWord("PICTURE");
createHangmanWord("PLASTIC");
createHangmanWord("CEMETERY");
createHangmanWord("APPROVAL");
createHangmanWord("STOMACH");
createHangmanWord("INSURANCE");
createHangmanWord("SQUIRREL");
createHangmanWord("GROUP");
createHangmanWord("SMOKE");
createHangmanWord("REACTION");
createHangmanWord("APPLIANCE");
createHangmanWord("FIREMAN");
createHangmanWord("BRAKE");
createHangmanWord("TERRITORY");
createHangmanWord("HARMONY");
createHangmanWord("NUMBER");
createHangmanWord("UMBRELLA");
createHangmanWord("CALCULATOR");
createHangmanWord("CURTAIN");
createHangmanWord("TEXTURE");
createHangmanWord("MUSCLE");
createHangmanWord("STREET");
createHangmanWord("INDUSTRY");
createHangmanWord("RAINSTORM");
createHangmanWord("SECRETARY");
createHangmanWord("WHISTLE");
createHangmanWord("SHIRT");
createHangmanWord("WOUND");
createHangmanWord("BASEBALL");



function changeMissingLettersNumber() {

    numberOfMissingLetters = document.getElementById("missingLettersNum").value;
    console.log(numberOfMissingLetters);
}

function doEverything() {
    resetToDefaultValues();

    displayHangmanWord(getRandomHangmanWordFromList(hangmenList));
    document.getElementById("hangmanMain").src = "img/icon/hangman.png";


}

function createHangmanWord(word) {

    let hangman = new Hangman(word.toUpperCase(), false, generateHangmanId());
    hangman.missingLetters = getListOfUniqueRandomNumbers(hangman, numberOfMissingLetters);
    hangmenList.push(hangman);
};

function win(hangman) {

    document.getElementById("hangmanMain").src = "img/icon/hangmanwin.png";
    numberOfWonGames++;
    document.getElementById("winsButton").innerText = numberOfWonGames;
    removeHangmanFromList(hangman);
    hideKeyboard();
    hangman.guessed();

}

function lost(hangman) {
    document.getElementById("hangmanMain").src = "img/icon/hangmangameover.png";
    numberOfLostGames++;
    let buttonValue = document.getElementById("lossesButton").innerText = numberOfLostGames;
    removeHangmanFromList(hangman);
    hideKeyboard();

}

function manageUsersGuesses(hangman, letter, isLetterGuessed) {
    numberOfGuesses++;

    if (isLetterGuessed) {
        numberOfRightLetters++;
        removeLetterFromMissingLetters(letter, hangman);
        console.log(hangman.missingLetters.length);
        if (hangman.missingLetters.length == 0) {
            win(hangman);
        }


    } else if (!isLetterGuessed) {

        numberOfWrongLetters++;
        hangMe(hangman, numberOfWrongLetters);
    }

}

function removeLetterFromMissingLetters(letter, hangman) {



    for (let i = 0; i < hangman.missingLetters.length; i++) {
        let char = hangman.word.charAt(hangman.missingLetters[i]);

        if (char == letter) {
            hangman.missingLetters.splice(i, 1);
        }
    }
}

function guessLetter(hangmanId, letter) {

    // change button color if user tried to guess
    document.querySelector('[property="' + hangmanId + '"][name="' + letter + '"]').style.background = "red";

    let isLetterGuessed = false;
    let hangman = getHangmanByHangmanId(hangmanId);
    let missingLettersList = hangman.missingLetters;
    console.log("Number of guesses " + numberOfGuesses);
    console.log("Number of wrong guesses: " + numberOfWrongLetters)

    for (let i = 0; i < missingLettersList.length; i++) {

        let char = hangman.word.charAt(missingLettersList[i]);
        let charNumber = missingLettersList[i];
        let charArgument = letter.charAt(0);



        if (char == charArgument) {
            // change button color when user used right letter
            document.querySelector('[property="' + hangmanId + '"][name="' + letter + '"]').style.background = "green";
            // try to implement querySelectorAll
            document.querySelector('button[property="' + hangmanId + '"][name="' + charNumber + '"]').reset;

            // show hidden letter
            document.querySelector('button[property="' + hangmanId + '"][name="' + charNumber + '"]').innerText = char;
            document.querySelector('button[property="' + hangmanId + '"][name="' + charNumber + '"]').style.pointerEvents = "none";
            isLetterGuessed = true;
        }

    }
    manageUsersGuesses(hangman, letter, isLetterGuessed);
    return isLetterGuessed;

}


function removeHangmanFromList(hangman) {


    for (let i = 0; i < hangmenList.length; i++) {

        if (hangmenList[i].id == hangman.id) {
            hangmenList.splice(i, 1);
        }
    }
}

function displayHangmanWord(hangman) {

    showKeyboard();
    generateKeyboard(hangman);

    let listOfRandomLetters = hangman.missingLetters;

    while (document.querySelector('[id="letterBtn"]') != null) {

        document.querySelector('[id="letterBtn"]').remove();
        while (document.querySelector('[id="letterInput"]') != null) {
            document.querySelector('[id="letterInput"]').remove();
            document.querySelector('[id="inputForm"]').remove();
        }

    }

    for (let i = 0; i < hangman.word.length; i++) {

        if (listOfRandomLetters.includes(i)) {

            document.getElementById("hangmanWord").innerHTML += '<button type="button" id="letterBtn" property="' + hangman.id + '" name="' + i + '" >_</button>';
        } else {

            document.getElementById("hangmanWord").innerHTML += '<button type="button" id="letterBtn" property="' + hangman.id + '">' + hangman.word.charAt(i).toUpperCase() + '</button>';
        }

    }
}



function hangMe(hangman, numberOfGuesses) {

    let hangmanIcon = document.getElementById("hangmanMain");
    switch (numberOfGuesses) {

        case 1:
            hangmanIcon.src = "img/icon/hangman1.png";
            break;
        case 2:
            hangmanIcon.src = "img/icon/hangman2.png";
            break;
        case 3:
            hangmanIcon.src = "img/icon/hangman3.png";
            break;
        case 4:
            hangmanIcon.src = "img/icon/hangman4.png";
            break;
        case 5:
            hangmanIcon.src = "img/icon/hangman5.png";
            break;
        case 6:
            lost(hangman);
            break;
    }
}


// generate keyboard on word display
function generateKeyboard(hangman) {

    document.getElementById("keyboard").innerHTML = "";

    for (let i = 65; i <= 90; i++) {

        let char = String.fromCharCode(i);
        document.getElementById("keyboard").innerHTML += '<button id="keyboardKey" type="submit" property="' + hangman.id + '" name="' + char + '" onclick="guessLetter(' + hangman.id + ',\'' + char + '\');">' + char + '</button>';

    }


};

function getRandomHangmanWordFromList(list) {


    let hangman = list[Math.floor(Math.random() * list.length)];
    while (hangman.isGuessed) {
        hangman = list[Math.floor(Math.random() * list.length)];
    }

    return hangman
}

function getHangmanByHangmanId(hangmanId) {

    for (let i = 0; i < hangmenList.length; i++) {

        if (hangmenList[i].id == hangmanId) {
            return hangmenList[i];
        }
    }


}


function generateHangmanId() {

    let id = 0;
    for (let i = 0; i < hangmenList.length; i++) {

        if (hangmenList[i].id == hangmenList[hangmenList.length - 1].id) {
            id = hangmenList[i].id;
            id++;
            return id;
        }
    }
    return id;
};



function clearArray(array) {
    while (array.length) {
        array.pop();
    }
}

function getListOfUniqueRandomNumbers(hangman, numberOfMissingLeters) {

    clearArray(hangman.missingLetters);
    for (let x = 0; x < hangman.word.length; x++) {
        hangman.missingLetters.push(x);

    }
    hangman.missingLetters.sort(() => Math.random() - 0.5);
    hangman.missingLetters.splice(0, hangman.word.length - numberOfMissingLeters);

    return hangman.missingLetters;
}

function hideKeyboard() {

    document.getElementById("keyboard").style.display = "none";
}

function showKeyboard() {

    document.getElementById("keyboard").style.display = "block";
}

function isLetterCorrect(hangman, letterNumber, letter) {

}

function resetToDefaultValues() {

    maxNumberOfGuesses = 6;
    numberOfGuesses = 0;
    numberOfWrongLetters = 0;
    numberOfRightLetters = 0;
}