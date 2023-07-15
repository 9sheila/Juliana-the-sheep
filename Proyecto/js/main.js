const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const home = document.getElementById('home-background');
const instructionsBtn = document.getElementById('instructions-btn');
const closeBtn = document.getElementById('close-instructions-btn')
const instructionsContainer = document.getElementById('instructions-container');
const playBtn = document.getElementById('play-btn');
const gameInfo = document.getElementById('game-info');
const gameBoard = document.getElementById('game-board');
const game = new Game(ctx, carSize, topRoadLimit, bottomRoadLimit);


instructionsBtn.addEventListener('click', ()=>{
    home.classList.add('d-none');
    instructionsContainer.classList.remove('d-none')
})
closeBtn.addEventListener('click', ()=>{
    instructionsContainer.classList.add('d-none');
    home.classList.remove('d-none')
})
  playBtn.addEventListener('click', ()=>{
    home.classList.add('d-none');
    gameBoard.classList.remove('d-none')
    game.start();
  })  

document.addEventListener("keydown", event => {
    game.player.onKeyEvent(event);
})

document.addEventListener('keyup', event => {
    game.player.onKeyEvent(event);
})
//  const car = new Obstacle(ctx,500,350,100,80);
//  const car2 = new Obstacle(ctx,500,170,100,80);
