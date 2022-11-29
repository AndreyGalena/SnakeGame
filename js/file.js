import {
    drawSnake, keyDown,
    changeSnakePosition,
    drawHead, pushStartBody,
    drawSumFruits,
    isGameOver, screenSize, mobileButtons,
    isWon
} from './_function.js';
import { snake } from './_variables.js';
import { Fruit } from './_class.js';

// Определение разришения экрана.
snake.widthScrin = screen.width;

// Модуль определения устройства.
let detect = new MobileDetect(window.navigator.userAgent);
snake.os = detect.os();
// Мобилка или компьютер.
if (detect.mobile()) {
    mobileButtons(detect);
} else {
    // Обработчик событий на компьютере.
    document.addEventListener('keydown', keyDown);
}

export let cvs = document.getElementById("canvas"), // cvs = canvas
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

// Цикл игры
function drawGame() {
    if (isGameOver())
        return;
    if (isWon())
        return;
    // sound.play(); // проигрует звук.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    changeSnakePosition(); // двигаем змею.
    drawSnake(); // рисуем змею
    drawHead(); // голова, глаза, нос
    myFruit.drawFruit(); // рисуем фрукт
    myFruit.collision(); // проверяем на сталкновения
    drawSumFruits(); // рисует сколько яблок скушено
    window.requestAnimationFrame(drawGame);
};

// Создание предворительного тела
pushStartBody();
// Запуск цикла игры.
drawGame();
