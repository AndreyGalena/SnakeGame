import { ctx, cvs } from './file.js';
import { snake, imgApple } from './_variables.js';
import { drawMouth } from './_function.js';

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
            snake.bodyLength += 20; // длина змии.
            snake.sumFruits++; // количество яблок
        }

        // Открытия рта.
        if (((this.x-50) < snake.headX && (this.x+100) > snake.headX) && ((this.y-50) < snake.headY && (this.y+100) > snake.headY)) {
            drawMouth();
        }
    }
}