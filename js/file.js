import { drawSnake, keyDown, 
    changeSnakePosition, 
    drawHead} from './_function.js';
import { snake } from './_variables.js';

export  let cvs = document.getElementById("canvas"), // cvs = canvas
            ctx = cvs.getContext('2d');  // cts = context

// Основные переменные
snake.headX = cvs.width / 2;
snake.headY = cvs.height / 2;
// snake.bodyX = snake.headX;
// snake.bodyY = snake.headY;

export const partsTile = [];

// Обработчик событий
document.addEventListener('keydown', keyDown);


function drawGame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    changeSnakePosition();
    drawSnake();
    drawHead();

    window.requestAnimationFrame(drawGame);
};

drawGame();
