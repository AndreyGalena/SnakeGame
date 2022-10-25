import { drawSnake, keyDown, 
    changeSnakePosition, Body,
    doBody } from './_function.js';
import { snake } from './_variables.js';

export  let cvs = document.getElementById("canvas"), // cvs = canvas
            ctx = cvs.getContext('2d');  // cts = context

// Основные переменные
snake.startPointX = cvs.width / 2;
snake.startPointY = cvs.height / 2;
snake.bodyX = snake.startPointX;
snake.bodyY = snake.startPointY;

export const partsTile = [];

// Обработчик событий
document.addEventListener('keydown', keyDown);


function drawGame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    changeSnakePosition();
    doBody();
    drawSnake();
    window.requestAnimationFrame(drawGame);
};

drawGame();
