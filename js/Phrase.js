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
 }