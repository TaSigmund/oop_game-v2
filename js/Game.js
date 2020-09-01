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
        return this.phrases[randomPhraseIndex];
    };

    /**
* Begins game by selecting a random phrase and displaying it to user
*/
    startGame() {
        let startOverlay = document.getElementById('overlay');
        startOverlay.style.display = 'none';
        this.activePhrase.addPhraseToDisplay();
        let tries = document.querySelectorAll('.tries');
        tries.forEach(attempt => attempt.firstElementChild.src='images/liveHeart.png') //resets the hearts
        let keys = document.querySelectorAll('.key');
        keys.forEach(key => key.disabled = false); //resets keys
};

/**
* Checks for winning move
* @return {boolean} True if game has been won, false if game wasn't
won
*/
    checkForWin(){
        let hiddenLetters = document.querySelectorAll('.hide');
        if (hiddenLetters.length === 0) {return true}  //checks whether there are any hidden letters left
            else {return false};
    }

/**
* Displays game over message
* @param {boolean} gameWon - Whether or not the user won the game
*/
gameOver(gameWon) {
        let startOverlay = document.getElementById('overlay');
        let gameOverMessage = document.getElementById('game-over-message'); //selects the h1
        let oldLetters = document.querySelectorAll('.letter');
        oldLetters.forEach(oldLetter => oldLetter.parentNode.removeChild(oldLetter)); //removes the phrase from the previous game.
        startOverlay.style.display = 'flex';
        this.missed = 0;
    if(gameWon) {
        gameOverMessage.textContent = 'Good Job!';
    }
    else {
        gameOverMessage.textContent = 'Game Over - You lost!';
    }
};

/**
* Increases the value of the missed property
* Removes a life from the scoreboard
* Checks if player has remaining lives and ends game if player is out
*/
    removeLife(letter) {
        if (!this.activePhrase.phrase.includes(letter)) {//checks whether the letter exists
            this.missed += 1;
            if (this.missed < 6) {
            document.querySelectorAll('.tries')[this.missed - 1].firstElementChild.src='images/lostHeart.png'; //changes the src attribute of the img tag
        } 
    }
    };

  /**
* Handles onscreen keyboard button clicks
* @param (HTMLButtonElement) button - The clicked button element
*/
    handleInteraction(button){
        let letter = button.textContent;
        this.activePhrase.checkLetter(letter);
        if (button.textContent === letter) {button.disabled = true} //disables onscreen keys that have already been pressed.
        this.activePhrase.showMatchedLetter(letter);
        this.removeLife(letter);
        if (this.checkForWin()) {setTimeout(()=>{this.gameOver(true)}, 1000)} //delays the new start screen by one second so the player can see the full sentence
        else if (this.missed > 5) {this.gameOver(false)} //shows the 'You lost!' start screen.
    };
 }