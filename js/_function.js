import { ctx, partsTile } from './file.js';
import { imgHeadRight, imgHeadLeft, 
    imgHeadUp, imgHeadDown, 
    snake } from './_variables.js';

// Класс кусочков тела
export class Body {
    constructor(x, y) {
        this.x     = x;
        this.y     = y;
        this.color = 'green';
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
export function doBody() {
    // console.log(partsTile.length);
    // Рисуем все части тела.(если они есть в списке)
    for(let i=0; i < partsTile.length; i++) {
        partsTile[i].drawBody();
    }

    // Создаём и сохраняем кусочки тела
    partsTile.push(new Body(snake.startPointX-5, snake.startPointY+20));
    // Обновляет положение головы
    snake.headX = snake.startPointX + snake.offsetX;
    snake.headY = snake.startPointY + snake.offsetY;

    // Удаляем лишний кусочки хвоста.
    while (partsTile.length > snake.bodyLength) {
        // удаляем нулевой элемент(происходит здвиг масива).
        partsTile.shift();
    }

    // Изменяем свойство последних обектов(кусочков)
    // if(partsTile.length > 15){
    //     for(let i=0; i < 10; i++) {
    //         partsTile[i] ['color'] = 'red';
    //         partsTile[i] ['r'] = 6+i;
    //         console.log(partsTile[i] ['r']);
    //     }
    //     partsTile[11] ['color'] = 'green';
    //     // console.log(partsTile);
    // }
}

// Рисуем змею.
export function drawSnake() {
    ctx.drawImage(snake.imgHead, snake.headX, snake.headY, 40, 40);
    // ctx.strokeRect(snake.headX, snake.headY, 40, 40);
}

// Двигаем змею.
export function changeSnakePosition() {
    snake.startPointX = snake.startPointX + snake.xVelocity;
    snake.startPointY = snake.startPointY + snake.yVelocity;
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
        snake.imgHead   = imgHeadUp;
        // передаём погрешность img относительно направления
        snake.offsetX   = -25;
        snake.offsetY   = -22;
    }
    // down
    if(event.keyCode == 40){
        if(snake.yVelocity == -1)
            return;
        snake.yVelocity = 1;
        snake.xVelocity = 0;
        snake.imgHead   = imgHeadDown;
        // передаём погрешность img относительно направления
        snake.offsetX   = -25;
        snake.offsetY   = 22;
    }
    // left
    if(event.keyCode == 37) {
        if(snake.xVelocity == 1)
            return;
        snake.yVelocity =  0;
        snake.xVelocity = -1;
        snake.imgHead   = imgHeadLeft;
        // передаём погрешность img относительно направления
        snake.offsetX   = -50;
        snake.offsetY   = 0;
    }
    // ritht
    if(event.keyCode == 39) {
        if(snake.xVelocity == -1)
            return;
        snake.yVelocity = 0;
        snake.xVelocity = 1;
        snake.imgHead   = imgHeadRight;
        // передаём погрешность img относительно направления
        snake.offsetX   = 0;
        snake.offsetY   = 0;
    }
}