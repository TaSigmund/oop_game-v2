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
        const individualLetters = this.phrase.split("");
        individualLetters.forEach(letter => {
            const listElement = document.createElement('li');
            listElement.textContent = `${letter}`;
            if(/^[a-zA-Z]$/.test(letter)){ //makes shure it is a letter from a-z
            listElement.className = `hide letter ${letter}`; //makes sure the letter is replaced by a placeholder initially
            }
            else {
            listElement.className = `space`; //makes sure a space in the phrase is not a placeholder
            }
            const phraseUl = document.getElementById('phrase');
            phraseUl.appendChild(listElement);
        })
    }

    /**
* Displays passed letter on screen after a match is found
* @param (string) letter - Letter to display
*/
    showMatchedLetter(letter) {
        const individualPlaceholders = document.querySelectorAll('.hide');
        individualPlaceholders.forEach(individualPlaceholder => {
                if (individualPlaceholder.textContent === letter){ //selects the correct letter
                individualPlaceholder.className = `show letter` //reveals it
                }
            })
    }

/**
* Checks if passed letter is in phrase
* @param (letter) letter - Letter to check
*/

    checkLetter(letter){
        if (this.phrase.includes(letter))
            {return true} 
        else 
            {return false} 
    }
}