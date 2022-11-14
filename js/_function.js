import { ctx, cvs, partsTile } from './file.js';
import { snake, imgEyes, imgApple } from './_variables.js';

const gulpSound = new Audio("./music/hrum.mp3");

// Класс кусочков тела
export class Body {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = '#197440';
        this.r = 10;
    }

    // Метод прорисовки круга(кусочка тела)
    drawBody() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fill();
    }
}

// Класс фруктов
export class Fruit {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Рисуем фрукт
    drawFruit() {
        ctx.drawImage(imgApple, this.x, this.y, 40, 40);
    }

    // Обработка столкновений.
    collision() {
        if ((this.x < snake.headX && (this.x + 40) > snake.headX) && (this.y < snake.headY && (this.y + 40) > snake.headY)) {
            gulpSound.play(); // проигрует звук.
            this.x = Math.floor(Math.random() * (cvs.width-35));
            this.y = Math.floor(Math.random() * 360);
            // snake.bodyLength += 20; // длина змии.
            snake.sumFruits++; // количество яблок
        }
    }
}

// Задаём размер игровой доски.
export function screenSize() {
    if(snake.widthScrin > 860){
        cvs.width = 860;
    }else {
        cvs.width  = snake.widthScrin - 20;
    }
    cvs.height = 400;
}

// Запускает событие при мобильных устройствах.
export function mobilClick(event) {
    let element = event.target;
    if(element.classList.contains("arrowImgUp")){
        console.log("Up");
        clickUp();
    }else if(element.classList.contains("arrowImgDown")) {
        console.log("Down");
        clickDown();
    }else if(element.classList.contains("arrowImgLeft")) {
        console.log("Left");
        clickLeft();
    }else if(element.classList.contains("arrowImgRight")) {
        console.log("Right");
        clickRight();
    }
}

// Придворительное создание тела
export function pushStartBody() {
    let stepBody = 0;
    for (let i = 0; i < snake.bodyLength; i++) {
        partsTile.push(new Body(snake.headX - snake.bodyLength + i,
            snake.headY));
    }
}

// Выводим и пересоздаём кусочки тела.
export function drawSnake() {
    // Рисуем все части тела.(если они есть в списке)
    for (let i = 0; i < partsTile.length; i++) {
        partsTile[i].drawBody();
    }

    // Создаём и сохраняем кусочки тела(задаёт конец тела)
    if (snake.xVelocity || snake.yVelocity) {
        partsTile.push(new Body(snake.headX, snake.headY));
    }

    // Удаляем лишний кусочки хвоста(удаляет начальный кусочек тела).
    if (snake.xVelocity || snake.yVelocity) {
        while (partsTile.length > snake.bodyLength) {
            // удаляем нулевой элемент(происходит здвиг масива).
            partsTile.shift();
        }
    }

    // Изменяем свойство последних обектов(кусочков)
    if (partsTile.length > 45) {
        // изменяет хвост
        let t = 4;
        let b = 0;
        for (let i = 5; i < 10; i++) {
            partsTile[i]
            for (; b < t; b++) {
                partsTile[b]['r'] = i;
            }
            t += 4;
        }
    }
}

// Рисуем голову.
export function drawHead() {
    ctx.fillStyle = "#197440";
    ctx.beginPath();
    ctx.arc(snake.headX, snake.headY, 10, 0, Math.PI * 2, false);
    ctx.fill();
    drawEyes(); // глаза.
    drawMouth(); // рот
}

// Рисует глаза.
function drawEyes() {
    ctx.drawImage(imgEyes,
        4, 4, 20, 20,
        snake.headX + snake.offsetsEyseLeftX, snake.headY + snake.offsetsEyseLeftY, 15, 15
    ); // левый глаз
    ctx.drawImage(imgEyes,
        5, 32, 20, 20,
        snake.headX + snake.offsetsEyseRightX, snake.headY + snake.offsetsEyseRightY, 15, 15);// правый глаз
}

// Рисует рот.
function drawMouth() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(snake.headX + snake.offsetsMouthLeftX,
        snake.headY + snake.offsetsMouthLeftY,
        1, 0, Math.PI * 2, false);
    ctx.arc(snake.headX + snake.offsetsMouthRightX,
        snake.headY + snake.offsetsMouthRightY,
        1, 0, Math.PI * 2, false);
    ctx.fill();
    // ctx.drawImage(imgMouth, 3, 65, 19, 32, snake.headX-3, snake.headY-10, 15, 20);
}

// Вывод текста количество скушаных яблок.
export function drawSumFruits() {
    ctx.fillStyle = 'white'; // цвет_шрифта.
    ctx.font = "20px Verdana"; // размер, имя_шрифта
    ctx.fillText(":" + snake.sumFruits, canvas.width - 40, 30);
    ctx.drawImage(imgApple, canvas.width - 70, 5, 30, 30);
    ctx.fillText(snake.os, 10, 30);
}

// Двигаем змею.
export function changeSnakePosition() {
    snake.headX = snake.headX + snake.xVelocity;
    snake.headY = snake.headY + snake.yVelocity;
}

// Проверка на окончание игры
export function isGameOver() {
    let gameOver = false;

    // Столковения со стенами
    if (snake.headX < 10 || snake.headX > (cvs.width - 10)) {
        gameOver = true;
    } else if (snake.headY < 10 || snake.headY > (cvs.height - 10)) {
        gameOver = true;
    }

    // Обрабатывает столкновения головы и тела.
    for (let i = 0; i < (partsTile.length - 50); i++) {
        let part = partsTile[i];
        if ((part.x - 15) < snake.headX && (part.x + 15) > snake.headX
            &&
            (part.y - 15) < snake.headY && (part.y + 15) > snake.headY) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) { // вывод об оканчании игры.
        // работа с градиентом.
        let gradient = ctx.createLinearGradient(0, 0, cvs.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        // вывод game over
        ctx.fillStyle = gradient;
        ctx.font = `${cvs.width / 10}px Verdana`;
        ctx.fillText("Game Over!", cvs.width / 6.5, cvs.height / 2);
    }

    return gameOver;
}

export function clickUp() {
    if (snake.yVelocity == 1 || snake.yVelocity == 2
        || snake.yVelocity == 4) {
        return;
    }
    if (snake.sumFruits <= 2) {
        snake.xVelocity = 0;
        snake.yVelocity = -1;
    } else if (snake.sumFruits <= 4) {
        snake.xVelocity = 0;
        snake.yVelocity = -2;
    } else if (snake.sumFruits >= 4) {
        snake.xVelocity = 0;
        snake.yVelocity = -4;
    }
    // передаём погрешность img относительно направления
    // глаза
    snake.offsetsEyseLeftX = -17;
    snake.offsetsEyseLeftY = 1;
    snake.offsetsEyseRightX = 3;
    snake.offsetsEyseRightY = 1;
    // нос
    snake.offsetsMouthLeftX = -3;
    snake.offsetsMouthLeftY = -5;
    snake.offsetsMouthRightX = 3;
    snake.offsetsMouthRightY = -5;
}

export function clickDown() {
    if (snake.yVelocity == -1 || snake.yVelocity == -2
        || snake.yVelocity == -4) {
        return;
    }
    if (snake.sumFruits <= 2) {
        snake.xVelocity = 0;
        snake.yVelocity = 1;
    } else if (snake.sumFruits <= 4) {
        snake.xVelocity = 0;
        snake.yVelocity = 2;
    } else if (snake.sumFruits >= 4) {
        snake.xVelocity = 0;
        snake.yVelocity = 4;
    }
    // передаём погрешность img относительно направления
    // глаза
    snake.offsetsEyseLeftX = 2;
    snake.offsetsEyseLeftY = -17;
    snake.offsetsEyseRightX = -17;
    snake.offsetsEyseRightY = -17;
    // нос
    snake.offsetsMouthLeftX = 3;
    snake.offsetsMouthLeftY = 3;
    snake.offsetsMouthRightX = -3;
    snake.offsetsMouthRightY = 3;
}

export function clickLeft() {
    if (snake.xVelocity == 1 || snake.xVelocity == 2
        || snake.xVelocity == 4) {
        return;
    }
    if (snake.sumFruits <= 2) {
        snake.xVelocity = -1;
        snake.yVelocity = 0;
    } else if (snake.sumFruits <= 4) {
        snake.xVelocity = -2;
        snake.yVelocity = 0;
    } else if (snake.sumFruits >= 4) {
        snake.xVelocity = -4;
        snake.yVelocity = 0;
    }
    // передаём погрешность img относительно направления
    // глаза
    snake.offsetsEyseLeftX = 2;
    snake.offsetsEyseLeftY = -17;
    snake.offsetsEyseRightX = 2;
    snake.offsetsEyseRightY = 1;
    // нос
    snake.offsetsMouthLeftX = -6;
    snake.offsetsMouthLeftY = -3;
    snake.offsetsMouthRightX = -6;
    snake.offsetsMouthRightY = 3;
}

export function clickRight() {
    if (snake.xVelocity == -1 || snake.xVelocity == -2
        || snake.xVelocity == -4) {
        return;
    }
    if (snake.sumFruits <= 2) {
        snake.xVelocity = 1;
        snake.yVelocity = 0;
    } else if (snake.sumFruits <= 4) {
        snake.xVelocity = 2;
        snake.yVelocity = 0;
    } else if (snake.sumFruits >= 4) {
        snake.xVelocity = 4;
        snake.yVelocity = 0;
    }
    // передаём погрешность img относительно направления
    // глаза
    snake.offsetsEyseLeftX = -17;
    snake.offsetsEyseLeftY = -17;
    snake.offsetsEyseRightX = -17;
    snake.offsetsEyseRightY = 1;
    // нос
    snake.offsetsMouthLeftX = 6;
    snake.offsetsMouthLeftY = -3;
    snake.offsetsMouthRightX = 6;
    snake.offsetsMouthRightY = 3;
}

// Обрабатываем события.
export function keyDown(event) {
    // отменяем стандартное действие браузера
    event.preventDefault();
    // z - стоп
    if (event.keyCode == 90) {
        snake.xVelocity = 0;
        snake.yVelocity = 0;
    }
    // up
    if (event.keyCode == 38) {
        clickUp();
    }
    // down
    if (event.keyCode == 40) {
        clickDown();
    }
    // left
    if (event.keyCode == 37) {
        clickLeft();
    }
    // ritht
    if (event.keyCode == 39) {
        clickRight();
    }
}