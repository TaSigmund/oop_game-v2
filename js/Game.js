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
         const phraseList = ['Knock knock who is there', 'To be or not to be', 'Hello world', 'Good Morning America', 'Damn it feels good to be a gangster',];
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
        const randomPhraseIndex = Math.floor(Math.random() * Math.floor(this.phrases.length));
        return this.phrases[randomPhraseIndex];
    }

    /**
* Begins game by selecting a random phrase and displaying it to user
*/
    startGame(){
        /*sets the active phrase to a random phrase*/
        this.activePhrase = this.getRandomPhrase();
        /*the next two lines hide the overlay*/
        const startOverlay = document.getElementById('overlay');
        startOverlay.style.display = 'none';
        /*the next line displays the placeholders for a new phrase*/
        this.activePhrase.addPhraseToDisplay();
    }

/**
* Checks for winning move
* @return {boolean} True if game has been won, false if game wasn't
won
*/
    checkForWin(){
        const hiddenLetters = document.querySelectorAll('.hide'); //all the letters in the phrase that have not been revealed yet
        /*the next two lines check whether there are any hidden letters left*/
        if (hiddenLetters.length === 0) {return true} 
        else {return false}; 
    }

/**
* Displays game over message
* @param {boolean} gameWon - Whether or not the user won the game
*/
    gameOver(gameWon) {
        const startOverlay = document.getElementById('overlay'); // selects the div
        const gameOverMessage = document.getElementById('game-over-message'); //selects the h1
        const keys = document.querySelectorAll('.key'); //selects the keys
        const oldLetters = document.querySelectorAll('.letter'); //selects all the letters
        const tries = document.querySelectorAll('.tries'); //selects the hearts
        startOverlay.style.display = 'flex'; //makes the overlay visible again
        /*removes the phrase from the previous game.*/
        oldLetters.forEach(oldLetter => oldLetter.parentNode.removeChild(oldLetter)); 
        /*the next four lines reset the hearts*/
        tries.forEach(attempt => {
            attempt.firstElementChild.src='images/liveHeart.png' 
        });
        this.missed = 0; 
        /*the next four lines make sure all keys can be clicked again and are no longer marked as wrong*/
            keys.forEach(key => {   
                key.disabled = false; 
                key.className = "key"
            });   
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
        if (this.missed < 6) {
            let heart = document.querySelectorAll('.tries')[this.missed - 1].firstElementChild;
            heart.src='images/lostHeart.png'; //changes a heart so that it looks like a life has been lost
            } 
        if (this.missed === 5){
            setTimeout(()=>{this.gameOver(false)}, 1000)
        }
    }

  /**
* Handles onscreen keyboard button clicks
* @param (HTMLButtonElement) button - The clicked button element
*/
    handleInteraction(button){
        const letter = button.textContent; //extracts the letter from the button element
        button.disabled = true;  //disables onscreen keys that have been pressed.
        if (this.activePhrase.checkLetter(letter)) { //checks whether the letter exists
                button.className = "key chosen"
                this.activePhrase.showMatchedLetter(letter); //shows the letter if it exists
                if (this.checkForWin()) //checks whether the game was won
                    {setTimeout(()=>{this.gameOver(true)}, 1000)} //delays the new start screen by one second so the player can see the full sentence
        } 
        else {
                button.className = "key wrong" //turns wrong letters orange on the keyboard
                this.removeLife(button);
        };
    }
 }