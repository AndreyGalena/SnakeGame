import { drawSnake, Fruit, keyDown, 
         changeSnakePosition, 
         drawHead, pushStartBody,
         drawSumFruits} from './_function.js';
import { snake } from './_variables.js';

export  let cvs = document.getElementById("canvas"), // cvs = canvas
            ctx = cvs.getContext('2d');  // cts = context

// Основные переменные
snake.headX = cvs.width / 2;
snake.headY = cvs.height / 2;

// Создание фрукта
let myFruit = new Fruit(snake.fruitX, snake.fruitY);

export const partsTile = [];

// Обработчик событий
document.addEventListener('keydown', keyDown);

// Цикл игры
function drawGame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    changeSnakePosition();
    drawSnake();
    drawHead();
    myFruit.drawFruit();
    myFruit.collision();
    drawSumFruits();
    window.requestAnimationFrame(drawGame);
};

// Создание предворительного тела
pushStartBody();
// Запуск цикла игры.
drawGame();
