import { drawSnake, keyDown, 
    changeSnakePosition } from './_function.js';
import { snake, imgHeadLeft } from './_variables.js';

export  let cvs = document.getElementById("canvas"), // cvs = canvas
            ctx = cvs.getContext('2d');  // cts = context

// Основные переменные
snake.headX = cvs.width / 2;
snake.headY = cvs.height / 2;
snake.bodyX = snake.headX;
snake.bodyY = snake.headY;

export const partsTile = [];

// Обработчик событий
document.addEventListener('keydown', keyDown);


function drawGame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    changeSnakePosition();
    drawSnake();

    ctx.fillStyle = "#197440";
    ctx.beginPath();
    ctx.arc(snake.headX, snake.headY, 10, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.drawImage(imgHeadLeft, 4, 4, 20, 20, snake.headX-15, snake.headY-17, 15, 15); // левый глаз
    ctx.drawImage(imgHeadLeft, 5, 32, 20, 20, snake.headX-15, snake.headY+1, 15, 15);// правый глаз

    window.requestAnimationFrame(drawGame);
};

drawGame();
