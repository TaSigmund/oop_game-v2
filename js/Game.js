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
        /*the next three lines remove the overlay*/
        let startOverlay = document.getElementById('overlay');
        startOverlay.style.display = 'none';
        /*the next line displays the placeholders for a new phrase*/
        this.activePhrase.addPhraseToDisplay();
        /*the next two lines rest the hearts*/
        let tries = document.querySelectorAll('.tries');
        tries.forEach(attempt => attempt.firstElementChild.src='images/liveHeart.png')
        /*the next four lines make sure all keys can be clicked again and are no longer marked as wrong*/
        let keys = document.querySelectorAll('.key');
        keys.forEach(key => {   
            key.disabled = false; 
            key.className = "key"}); 
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
        startOverlay.className = "win";
        gameOverMessage.textContent = 'Good Job!';
    }
    else {
        startOverlay.className = "lose";
        gameOverMessage.textContent = 'Game Over - You lost!';
    }
};

/**
* Increases the value of the missed property
* Removes a life from the scoreboard
* Checks if player has remaining lives and ends game if player is out
*/
    removeLife(button) {
        if (!this.activePhrase.phrase.includes(button.textContent)) {//checks whether the letter exists
            this.missed += 1;
            button.className = "key wrong"
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
        if (button.textContent === letter) {button.disabled = true; button.className = "key chosen"} //disables onscreen keys that have already been pressed.
        this.activePhrase.showMatchedLetter(letter);
        this.removeLife(button);
        if (this.checkForWin()) {setTimeout(()=>{this.gameOver(true)}, 1000)} //delays the new start screen by one second so the player can see the full sentence
        else if (this.missed > 5) {this.gameOver(false)} //shows the 'You lost!' start screen.
    };
 }