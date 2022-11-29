import { ctx, cvs, partsTile } from './file.js';
import { snake, imgEyes, imgApple, imgMouth } from './_variables.js';
import { Body } from './_class.js';

// Звук первый раунд.
// const oneRaund = new Audio("./music/raund-1.mp3");
const hit = new Audio("./music/udar.mp3");

// Если на мобильном
export function mobileButtons(detect) {
    // добавить кнопки.
    let blockButton = document.querySelector(".blockButton");
    blockButton.style.display = "block";
    // Обработка событий на мобильном устройстве.
    blockButton.addEventListener("click", mobilClick);
}

// Задаём размер игровой доски.
export function screenSize() {
    if (snake.widthScrin > 860) {
        cvs.width = 860;
    } else {
        cvs.width = snake.widthScrin - 20;
    }
    cvs.height = 400;
}

// Запускает событие при мобильных устройствах.
export function mobilClick(event) {
    let element = event.target;
    // если такой класс в объекте есть
    if (element.classList.contains("arrowImgUp")) {
        clickUp();
    } else if (element.classList.contains("arrowImgDown")) {
        clickDown();
    } else if (element.classList.contains("arrowImgLeft")) {
        clickLeft();
    } else if (element.classList.contains("arrowImgRight")) {
        clickRight();
    }
}

// Придворительное создание тела
export function pushStartBody() {
    for (let i = 0; i < snake.bodyLength; i += snake.speed) {
        partsTile.push(new Body(snake.headX - snake.bodyLength + i,
            snake.headY));
    }
    // Компенсируем скорость.
    snake.bodyLength = Math.round(snake.bodyLength / snake.speed);
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

    // Удаляем лишние кусочки хвоста(удаляет начальный кусочек тела).
    if (snake.xVelocity || snake.yVelocity) {
        while (partsTile.length > snake.bodyLength) {
            // удаляем нулевой элемент(происходит здвиг масива).
            partsTile.shift();
        }
    }

    // Изменяем свойство последних обектов(кусочков)
    if (partsTile.length > 30) {
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
    drawNose(); // рот
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

// Рисует нос.
function drawNose() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(snake.headX + snake.offsetsMouthLeftX,
        snake.headY + snake.offsetsMouthLeftY,
        1, 0, Math.PI * 2, false);
    ctx.arc(snake.headX + snake.offsetsMouthRightX,
        snake.headY + snake.offsetsMouthRightY,
        1, 0, Math.PI * 2, false);
    ctx.fill();
}

// Функйия для поворота рта.
export function drawImgCenter(img, x, y, degrees) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(degrees * Math.PI / 180);
    ctx.drawImage(img, 3, 65, 19, 32, 
    -(img.width / 2), -(img.height / 15), 15, 20);
    ctx.restore();
};

// Рисуем рот
export function drawMouth() {
    if (snake.xVelocity == snake.speed) {
        ctx.drawImage(imgMouth, 3, 65, 19, 32, snake.headX - 3, snake.headY - 10, 15, 20);
    } else if (snake.xVelocity == -snake.speed) {
        drawImgCenter(imgMouth, snake.headX-14, snake.headY-44, 180);
    } else if (snake.yVelocity == snake.speed) {
        drawImgCenter(imgMouth, snake.headX-44, snake.headY+12, 90);
    } else if (snake.yVelocity == -snake.speed) {
        drawImgCenter(imgMouth, snake.headX+44, snake.headY-14, 270);
    }
}

// Вывод текста количество скушаных яблок.
export function drawSumFruits() {
    ctx.fillStyle = 'white'; // цвет_шрифта.
    ctx.font = "20px Verdana"; // размер, имя_шрифта
    ctx.fillText(":" + snake.sumFruits, canvas.width - 40, 30);
    ctx.drawImage(imgApple, canvas.width - 70, 5, 30, 30);
    ctx.fillText(snake.bodyLength, 10, 30); //
    // if(snake.musicOne){
    //     oneRaund.play();
    //     snake.musicOne = false;
    // }
}

// Двигаем змею.
export function changeSnakePosition() {
    snake.headX = snake.headX + snake.xVelocity;
    snake.headY = snake.headY + snake.yVelocity;
}

// Проверка на выйграш
export function isWon() {
    let youWon = false;
    // Проверка на выполнения задания(выйгрыш).
    if (snake.sumFruits == 30) {
        // работа с градиентом.
        let gradient = ctx.createLinearGradient(0, 0, cvs.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        // вывод game over
        ctx.fillStyle = gradient;
        ctx.font = `${cvs.width / 10}px Verdana`;
        ctx.fillText("Ура победа!", cvs.width / 6.5, cvs.height / 2);
        youWon = true;
    }
    return youWon;
}

// Проверка на окончание игры
export function isGameOver() {
    let gameOver = false;

    // Столковения со стенами(проигрыш).
    if (snake.headX < 10 || snake.headX > (cvs.width - 10)) {
        hit.play(); // проигрывания удара о стену.
        gameOver = true;
    } else if (snake.headY < 10 || snake.headY > (cvs.height - 10)) {
        hit.play(); // проигрывания удара о стену.
        gameOver = true;
    }

    // Обрабатывает столкновения головы и тела(проигрыш).
    for (let i = 0; i < (partsTile.length - 50); i++) {
        let part = partsTile[i];
        if ((part.x - 15) < snake.headX && (part.x + 15) > snake.headX
            &&
            (part.y - 15) < snake.headY && (part.y + 15) > snake.headY) {
            hit.play(); // проигрывания удара о стену.
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

// Действия при нажатии Up.
export function clickUp() {
    if (snake.yVelocity == snake.speed) {
        return;
    }
    // Задаём направление и скорость.
    snake.xVelocity = 0;
    snake.yVelocity = -snake.speed;
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
// Действия при нажатии Down.
export function clickDown() {
    if (snake.yVelocity == -snake.speed) {
        return;
    }
    // Задаём направление и скорость.
    snake.xVelocity = 0;
    snake.yVelocity = snake.speed;
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
// Действия при нажатии Left.
export function clickLeft() {
    if (snake.xVelocity == snake.speed) {
        return;
    }
    // Задаём направление и скорость.
    snake.xVelocity = -snake.speed;
    snake.yVelocity = 0;
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
// Действия при нажатии Right.
export function clickRight() {
    if (snake.xVelocity == -snake.speed) {
        return;
    }
    // Задаём направление и скорость.
    snake.xVelocity = snake.speed;
    snake.yVelocity = 0;
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