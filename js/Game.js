/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
     constructor (){
         this.missed = 0;
         this.phrases = this.createPhrases();
         this.activePhrase = null;
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
         return phrases //rather than just holding the phrases as strings this holds instances of the phrase object.
    }

     /**
* Selects random phrase from phrases property
* @return {Object} Phrase object chosen to be used
*/
    getRandomPhrase(){
        let randomPhraseIndex = Math.floor(Math.random() * Math.floor(this.phrases.length));
        return this.phrases[randomPhraseIndex];
    }

    /**
* Begins game by selecting a random phrase and displaying it to user
*/
    startGame(){
        /*selects a random phrase*/
        this.activePhrase = this.getRandomPhrase();
        /*the next three lines remove the overlay*/
        let startOverlay = document.getElementById('overlay');
        startOverlay.style.display = 'none';
        /*the next line displays the placeholders for a new phrase*/
        this.activePhrase.addPhraseToDisplay();
        /*the next three lines reset the hearts*/
        let tries = document.querySelectorAll('.tries');
        tries.forEach(attempt => {
            attempt.firstElementChild.src='images/liveHeart.png' //resets the images
        });
        /*the next four lines make sure all keys can be clicked again and are no longer marked as wrong*/
        let keys = document.querySelectorAll('.key');
        keys.forEach(key => {   
            key.disabled = false; 
            key.className = "key"}); 
    }

/**
* Checks for winning move
* @return {boolean} True if game has been won, false if game wasn't
won
*/
    checkForWin(){
        let hiddenLetters = document.querySelectorAll('.hide'); //all the letters in the phrase that have not been revealed yet
        /*the next two lines check whether there are any hidden letters left*/
        if (hiddenLetters.length === 0) {return true} 
        else {return false}; 
    }

/**
* Displays game over message
* @param {boolean} gameWon - Whether or not the user won the game
*/
    gameOver(gameWon) {
        let startOverlay = document.getElementById('overlay'); // selects the div
        let gameOverMessage = document.getElementById('game-over-message'); //selects the h1
        let oldLetters = document.querySelectorAll('.letter'); //selects all the letters on the screen
        oldLetters.forEach(oldLetter => oldLetter.parentNode.removeChild(oldLetter)); //removes the phrase from the previous game.
        startOverlay.style.display = 'flex'; //makes the overlay visible again
        this.missed = 0; //resets the hearts
        if(gameWon) {
            startOverlay.className = "win";
            gameOverMessage.className = "animated fadeIn"; //animation
            gameOverMessage.textContent = 'Good Job!';
        }
        else {
            startOverlay.className = "lose";
            gameOverMessage.className = "animated headShake"; //animation
            gameOverMessage.textContent = 'Game Over - You lost!';
        }
}

/**
* Increases the value of the missed property
* Removes a life from the scoreboard
* Checks if player has remaining lives and ends game if player is out
*/
    removeLife(button) {
        this.missed += 1;  
        button.className = "key wrong" //turns wrong letters orange on the keyboard
        if (this.missed < 6) {
            let heart = document.querySelectorAll('.tries')[this.missed - 1].firstElementChild;
            heart.src='images/lostHeart.png'; //changes a heart so that it looks like a life has been lost
            } 
    }

  /**
* Handles onscreen keyboard button clicks
* @param (HTMLButtonElement) button - The clicked button element
*/
    handleInteraction(button){
        let letter = button.textContent; //extracts the letter from the button element
        button.disabled = true; button.className = "key chosen" //disables onscreen keys that have been pressed.
        /*the next three lines show a letter or remove a life depending on whether the letter exists*/
        if (this.activePhrase.checkLetter(letter)) 
            {this.activePhrase.showMatchedLetter(letter)} 
            else {this.removeLife(button)}; 
        /*the next three lines handle the end of each game*/
        if (this.checkForWin()) 
            {setTimeout(()=>{this.gameOver(true)}, 1000)} //delays the new start screen by one second so the player can see the full sentence
            else if (this.missed >= 5) {setTimeout(()=>{this.gameOver(false)}, 1000)} //delays the Game Over message so the user can see his last heart disappear
    }
 }