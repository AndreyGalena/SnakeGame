import { drawSnake, Fruit, keyDown, 
         changeSnakePosition, 
         drawHead, pushStartBody,
         drawSumFruits,
         isGameOver, 
         clickUp, clickDown, 
         clickLeft, clickRight, 
         mobilClick, screenSize} from './_function.js';
import { snake } from './_variables.js';

// Определение разришения экрана.
snake.widthScrin = screen.width;

// Модуль определения устройства.
let detect = new MobileDetect(window.navigator.userAgent);
snake.os = detect.os();
let blockButton = document.querySelector(".blockButton");
if(detect.mobile()) {
    blockButton.style.display = "block";
    let arrwe = blockButton.style;
    console.log(arrwe);
}

export  let cvs = document.getElementById("canvas"), // cvs = canvas
            ctx = cvs.getContext('2d');  // cts = context
// Задать размер игровой доски.
screenSize();

// Основные переменные
snake.headX = cvs.width / 2;
snake.headY = cvs.height / 2;
snake.fruitX = cvs.width / 1.5;

// Создание фрукта
let myFruit = new Fruit(snake.fruitX, snake.fruitY);
// Список для кусочков тела.
export const partsTile = [];
// Фоновая музыка.
// const sound = new Audio("./music/music.mp3");

// Обработчик событий на компьютере.
document.addEventListener('keydown', keyDown);

// Обработка событий на мобильном устройстве.
// let blockButton = document.querySelector(".blockButton");
blockButton.addEventListener("click", mobilClick);

// Цикл игры
function drawGame(){
    if(isGameOver())
        return;
    // sound.play(); // проигрует звук.
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
