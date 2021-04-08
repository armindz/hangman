let Hangman = function(word, isGuessed, id) {

    this.word = word;
    this.isGuessed = isGuessed;
    this.id = id;



    this.isGuessed = function() {
        this.isGuessed = true;
    };
    this.isGuessed = function() {
        this.isGuessed = false;
    };
}

let words = [];

let missingLetters = [];

function doEverything() {
    let hangman = new Hangman("monitor", false, generateHangmanId());
    let hangman1 = new Hangman("letter", false, generateHangmanId());

    words.push(hangman);
    words.push(hangman1);
    displayHangmanWord(hangman);
}

function clearArray(array) {
    while (array.length) {
        array.pop();
    }
}


function generateHangmanId() {

    let id = 0;
    for (let i = 0; i < words.length; i++) {

        if (words[i].id == words[words.length - 1])
            id = words[i].id;
        id++
        return id;

    }

    return id;

};

function createHangmanWord(word) {

    let hangman = new Hangman(word, false, generateHangmanId());
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

function getRandomHangmanWordFromList(list) {

}

function displayHangmanWord(hangman) {

    let numberOfMissingLetters = 3;
    let listOfRandomLetters = getListOfUniqueRandomNumbers(hangman, numberOfMissingLetters);

    while (document.querySelector('[id="letterBtn"]') != null) {

        document.querySelector('[id="letterBtn"]').remove();
    }





    for (let i = 0; i < hangman.word.length; i++) {



        if (listOfRandomLetters.includes(i)) {

            document.getElementById("hangmanWord").innerHTML += '<button type="button" id="letterBtn" property="' + hangman.id + '">_</button>';
        } else {

            document.getElementById("hangmanWord").innerHTML += '<button type="button" id="letterBtn" property="' + hangman.id + '">' + hangman.word.charAt(i).toUpperCase() + '</button>';
        }



    }

}