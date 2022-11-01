import { ctx, partsTile } from './file.js';
import { snake, imgEyes } from './_variables.js';

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
    // Рисуем все части тела.(если они есть в списке)
    for(let i=0; i < partsTile.length; i++) {
        partsTile[i].drawBody();
    }

    // Создаём и сохраняем кусочки тела(задаёт начало тела)
    if(snake.xVelocity || snake.yVelocity) {
        partsTile.push(new Body(snake.headX, snake.headY));
    }

    // Удаляем лишний кусочки хвоста.
    if(snake.xVelocity || snake.yVelocity) {
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
    ctx.drawImage(imgEyes, 
        4, 4, 20, 20, 
        snake.headX+snake.offsetsEyseLeftX, snake.headY+snake.offsetsEyseLeftY, 15, 15
        ); // левый глаз
    ctx.drawImage(imgEyes, 
        5, 32, 20, 20, 
        snake.headX+snake.offsetsEyseRightX, snake.headY+snake.offsetsEyseRightY, 15, 15);// правый глаз
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
        // передаём погрешность img относительно направления
        // глаза
        snake.offsetsEyseLeftX   = -17;
        snake.offsetsEyseLeftY   =  1;
        snake.offsetsEyseRightX  =  3;
        snake.offsetsEyseRightY  =  1;
        // нос
        snake.offsetsMouthLeftX  = -3;
        snake.offsetsMouthLeftY  = -5;
        snake.offsetsMouthRightX =  3;
        snake.offsetsMouthRightY = -5;
    }
    // down
    if(event.keyCode == 40){
        if(snake.yVelocity == -1)
            return;
        snake.yVelocity = 1;
        snake.xVelocity = 0;
        // передаём погрешность img относительно направления
        // глаза
        snake.offsetsEyseLeftX   =  2;
        snake.offsetsEyseLeftY   = -17;
        snake.offsetsEyseRightX  = -17;
        snake.offsetsEyseRightY  = -17;
        // нос
        snake.offsetsMouthLeftX  =  3;
        snake.offsetsMouthLeftY  =  3;
        snake.offsetsMouthRightX = -3;
        snake.offsetsMouthRightY =  3;
    }
    // left
    if(event.keyCode == 37) {
        if(snake.xVelocity == 1)
            return;
        snake.yVelocity =  0;
        snake.xVelocity = -1;
        // передаём погрешность img относительно направления
        // глаза
        snake.offsetsEyseLeftX   =  2;
        snake.offsetsEyseLeftY   = -17;
        snake.offsetsEyseRightX  =  2;
        snake.offsetsEyseRightY  =  1;
        // нос
        snake.offsetsMouthLeftX  = -6;
        snake.offsetsMouthLeftY  = -3;
        snake.offsetsMouthRightX = -6;
        snake.offsetsMouthRightY =  3;
    }
    // ritht
    if(event.keyCode == 39) {
        if(snake.xVelocity == -1)
            return;
        snake.yVelocity = 0;
        snake.xVelocity = 1;
        // передаём погрешность img относительно направления
        // глаза
        snake.offsetsEyseLeftX   = -17;
        snake.offsetsEyseLeftY   = -17;
        snake.offsetsEyseRightX  = -17;
        snake.offsetsEyseRightY  =  1;
        // нос
        snake.offsetsMouthLeftX  =  6;
        snake.offsetsMouthLeftY  = -3;
        snake.offsetsMouthRightX =  6;
        snake.offsetsMouthRightY =  3;
    }
}