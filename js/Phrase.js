/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
    constructor (phrase){
        this.phrase = phrase.toLowerCase();
    }
/**
* Display phrase on game board
*/
    addPhraseToDisplay() {
        let individualLetters = this.phrase.split("");
    individualLetters.forEach(letter => {
        let listElement = document.createElement('li');
        listElement.textContent = `${letter}`;
        if(/^[a-zA-Z]$/.test(letter)){
        listElement.className = `hide letter ${letter}`;
        }
        else {
        listElement.className = `space`;
        }
        let phraseUl = document.getElementById('phrase');
        phraseUl.appendChild(listElement);
    })
    };

    /**
* Displays passed letter on screen after a match is found
* @param (string) letter - Letter to display
*/
showMatchedLetter(letter) {
    let individualPlaceholders = document.querySelectorAll('.hide');
    individualPlaceholders.forEach(individualPlaceholder => {
       if (individualPlaceholder.textContent === letter){
            individualPlaceholder.className = `show letter`}
        }
    )
};

/**
* Checks if passed letter is in phrase
* @param (letter) letter - Letter to check
*/

checkLetter(letter){//this is the letter that has been pressed on the onscreen keyboard
    let individualLetters = this.phrase.split(''); //these are the individual letters of the current phrase
    individualLetters.forEach(individualLetter => {
        if (letter === individualLetter) {return true}
        else {return false};
    })
    }
}