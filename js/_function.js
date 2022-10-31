import { ctx, partsTile } from './file.js';
import { snake, imgEyes, imgMouth } from './_variables.js';

// Класс кусочков тела
export class Body {
    constructor(x, y) {
        this.x     = x;
        this.y     = y;
        this.color = '#197440';
        this.r     = 10;
    }
    
    // Метод прорисовки круга(кусочка тела)
    drawBody() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
        ctx.fill();
    }
}

// Создаем тело
export function drawSnake() {
    // console.log('drawSnake');
    // Рисуем все части тела.(если они есть в списке)
    for(let i=0; i < partsTile.length; i++) {
        partsTile[i].drawBody();
    }
    //
    if(partsTile.length < snake.bodyLength) snake.bodyX -= 1;
    // if(partsTile.length >= snake.bodyLength) snake.bodyX = 0;

    // Создаём и сохраняем кусочки тела(задаёт начало тела)
    partsTile.push(new Body(snake.headX+snake.bodyX, snake.headY));// 5, 20
    // Обновляет положение головы
    // snake.headX = snake.startPointX + snake.offsetX;
    // snake.headY = snake.startPointY + snake.offsetY;

    // Удаляем лишний кусочки хвоста.
    if(snake.xVelocity != 0 && snake.yVelocity != 0) {
        while (partsTile.length > snake.bodyLength) {
            // удаляем нулевой элемент(происходит здвиг масива).
            partsTile.shift();
        }
    }

    // Изменяем свойство последних обектов(кусочков)
    if(partsTile.length > 45){
        // изменяет хвост
        let t = 4;
        let b = 0;
        for(let i=5; i < 10; i++){
            partsTile[i]
            for(;b < t; b++){
                partsTile[b] ['r'] = i;
            }
            t += 4;
        }
    }
}

// Рисуем змею.
export function drawHead() {
    ctx.fillStyle = "#197440";
    // ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(snake.headX, snake.headY, 10, 0, Math.PI * 2, false);
    ctx.fill();
    drawEyes(); // глаза.
    drawMouth(); // рот
}

// Рисует глаза.
function drawEyes() {
    ctx.drawImage(imgEyes, 4, 4, 20, 20, snake.headX-17, snake.headY-17, 15, 15); // левый глаз
    ctx.drawImage(imgEyes, 5, 32, 20, 20, snake.headX-17, snake.headY+1, 15, 15);// правый глаз
}

// Рисует рот.
function drawMouth() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(snake.headX+6, snake.headY-3, 1, 0, Math.PI * 2, false);
    ctx.arc(snake.headX+6, snake.headY+3, 1, 0, Math.PI * 2, false);
    ctx.fill();
    // ctx.drawImage(imgMouth, 3, 65, 19, 32, snake.headX-3, snake.headY-10, 15, 20);
}

// Двигаем змею.
export function changeSnakePosition() {
    snake.headX = snake.headX + snake.xVelocity;
    snake.headY = snake.headY + snake.yVelocity;
}

// Обрабатываем события.
export function keyDown(event) {
    // z - стоп
    if(event.keyCode == 90) {
        snake.xVelocity = 0;
        snake.yVelocity = 0;
    }
    // up
    if(event.keyCode == 38){
        if(snake.yVelocity == 1)
            return;
        snake.yVelocity = -1;
        snake.xVelocity =  0;
        // snake.imgHead   = imgHeadUp;
        // передаём погрешность img относительно направления
        // snake.offsetX   = -20;
        // snake.offsetY   = -26;
    }
    // down
    if(event.keyCode == 40){
        if(snake.yVelocity == -1)
            return;
        snake.yVelocity = 1;
        snake.xVelocity = 0;
        // snake.imgHead   = imgHeadDown;
        // передаём погрешность img относительно направления
        // snake.offsetX   = -20;
        // snake.offsetY   = -15;
    }
    // left
    if(event.keyCode == 37) {
        if(snake.xVelocity == 1)
            return;
        snake.yVelocity =  0;
        snake.xVelocity = -1;
        // snake.imgHead   = imgHeadLeft;
        // передаём погрешность img относительно направления
        // snake.offsetX   = -24;
        // snake.offsetY   = -20;
    }
    // ritht
    if(event.keyCode == 39) {
        if(snake.xVelocity == -1)
            return;
        snake.yVelocity = 0;
        snake.xVelocity = 1;
        // snake.imgHead   = imgHeadRight;
        // передаём погрешность img относительно направления
        // snake.offsetX   = -15;
        // snake.offsetY   = -20;
    }
}