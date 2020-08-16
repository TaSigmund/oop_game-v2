/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
     constructor (){
         this.missed = 0;
         this.phrases = this.createPhrases();
         this.activePhrase = this.getRandomPhrase();
     }

     /**
* Creates phrases for use in game
* @return {array} An array of phrases that could be used in the game
*/
    createPhrases(){
         let phrases = [];
         let phraseList = ['Knock knock who is there', 'To be or not to be', 'Hello world', 'Good Morning America', 'Damn it feels good to be a gangster',];
         for (let i = 0; i < 5; i++){
             let phrase = new Phrase(phraseList[i]);
             phrases.push(phrase);
         }
         return phrases
     }

     /**
* Selects random phrase from phrases property
* @return {Object} Phrase object chosen to be used
*/
    getRandomPhrase() {
        let randomPhraseIndex = Math.floor(Math.random() * Math.floor(this.phrases.length));
        return this.phrases[randomPhraseIndex]
    };

    /**
* Begins game by selecting a random phrase and displaying it to user
*/
startGame() {
    let startOverlay = document.getElementById('overlay');
    startOverlay.style.display = 'none';
    this.getRandomPhrase().addPhraseToDisplay();
};
 }