/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;
let startButton = document.getElementById('btn__reset'); //part of the start overlay
let keys = document.querySelectorAll('.key'); //the onscreen keyboard

  /**
* event handler for the start button
*/

startButton.addEventListener('click', ()=>{
    game = new Game();
    game.startGame();
})

  /**
* event handler for the on screen keyboard
*/


keys.forEach(key => key.addEventListener('click', ()=>{game.handleInteraction(key)}));

  /**
* event handler for the physical keyboard
*/

document.addEventListener('keydown', event => {
    const keyText = event.key.toLowerCase();
    keys.forEach(key => {if (keyText === key.textContent && key.className !== "key wrong") { //makes sure it is one of the given keys and has not been marked wrong already
        game.handleInteraction(key)}})
})
