/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;
let startButton = document.getElementById('btn__reset');
startButton.addEventListener('click', ()=>{
    game = new Game();
    game.startGame();
})

let keys = document.querySelectorAll('.key');
//event handler for the on screen keyboard

keys.forEach(key => key.addEventListener('click', ()=>{game.handleInteraction(key)}));
    //invokes handle interaction and passes on the event objec

//event handler for the physical keyboard
document.addEventListener('keydown', event => {
        const keyText = event.key.toLowerCase();
        keys.forEach(key => {if (keyText === key.textContent && key.className !== "key wrong") {game.handleInteraction(key)}
})
                                            })
