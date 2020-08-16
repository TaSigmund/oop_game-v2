/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;
let startButton = document.getElementById('btn__reset');
startButton.addEventListener('click', ()=>{
    game = new Game();
    game.startGame();
})
