/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;
let startButton = document.getElementById('btn__reset');
startButton.addEventListener('click', ()=>{
    game = new Game();
    game.startGame();
})

//event handler for the on screen keyboard
let keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('click', ()=>{game.handleInteraction(key)}));
    //invokes handle interaction and passes on the event objec
