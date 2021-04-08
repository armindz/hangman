/* ----------------------------------------------------------
   -------------------- HANGMAN ----------------------------- 
   ----------------------------------------------------------
*/


// Hangman obj
let Hangman = function(word, isGuessed, id) {

    this.word = word;
    this.isGuessed = isGuessed;
    this.id = id;



    this.guessed = function() {
        this.isGuessed = true;
    };
    this.notGuessed = function() {
        this.isGuessed = false;
    };
}

// arrays 
let words = [];
let missingLetters = [];


// on create
createHangmanWord("MONITOR");
createHangmanWord("LETTER");
createHangmanWord("KEYBOARD");
createHangmanWord("MOUSE");
createHangmanWord("BEDROOM");
createHangmanWord("JOYSTICK");
createHangmanWord("DESKTOP");
createHangmanWord("FLYWHEEL");




function doEverything() {

    displayHangmanWord(getRandomHangmanWordFromList(words));

}




function createHangmanWord(word) {

    let hangman = new Hangman(word, false, generateHangmanId());
    words.push(hangman);
};




function handleUserInputData(letterNumber, hangmanId) {

    let inputLetter = document.getElementById("letterInput").value;
    console.log("number " + letterNumber + " id " + hangmanId + " inputLetter " + inputLetter);
    if (isLetterCorrect(getHangmanByHangmanId(hangmanId), letterNumber, inputLetter)) {
        //   document.getElementById("letterInput").innerHTML += inputLetter;
        console.log("ITS CORRECT");
    } else {
        console.log("ITS NOT CORRECT");
        // change photo of hangman
    }

    document.forms["inputForm"].reset();
}





function isLetterCorrect(hangman, letterNumber, letter) {


    if (hangman.word.charAt(letterNumber) == letter) {
        return true;
    } else {
        return false;
    }
}





function guessLetter(hangmanId, letter) {

    let char = String.fromCharCode(letter);
    let hangman = getHangmanByHangmanId(hangmanId);
    for (let i = 0; i < hangman.word.length; i++) {
        console.log(hangmanId + char);
        if (hangman.word.charAt(i) == char) {
            document.querySelector('[property="' + hangmanId + '"][name="' + char + '"]').style.backgroundColor = "red";
        }

    }

}





function displayHangmanWord(hangman) {
    generateKeyboard(hangman);
    let numberOfMissingLetters = 3;
    let listOfRandomLetters = getListOfUniqueRandomNumbers(hangman, numberOfMissingLetters);

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






// generate keyboard on word display
function generateKeyboard(hangman) {

    document.getElementById("keyboard").innerHTML = "";

    for (let i = 65; i <= 90; i++) {

        let char = String.fromCharCode(i);
        document.getElementById("keyboard").innerHTML += '<button id="keyboardKey" type="submit" property="' + hangman.id + ' "name="' + char + '" onclick="guessLetter(2,"A");">' + char + '</button>';


    }

};

function getRandomHangmanWordFromList(list) {

    let hangman = list[Math.floor(Math.random() * list.length)];
    return hangman
}

function getHangmanByHangmanId(hangmanId) {

    for (let i = 0; i < words.length; i++) {

        if (words[i].id == hangmanId) {
            return words[i];
        }
    }


}




function generateHangmanId() {

    let id = 0;
    for (let i = 0; i < words.length; i++) {

        if (words[i].id == words[words.length - 1].id) {
            id = words[i].id;
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

    clearArray(missingLetters);
    for (let x = 0; x < hangman.word.length; x++) {
        missingLetters.push(x);

    }
    missingLetters.sort(() => Math.random() - 0.5);
    missingLetters.splice(0, hangman.word.length - numberOfMissingLeters);

    return missingLetters;
}