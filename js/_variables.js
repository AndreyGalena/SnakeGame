// Глаза
export let imgEyes = new Image();
imgEyes.src = './img/snake-parts/blink.png';
// Фрукты
export let imgApple = new Image();
imgApple.src = './img/fruits/target1.png';

export let imgBanana = new Image();
imgBanana.src = './img/fruits/target2.png';

export let imgStrawberry = new Image();
imgStrawberry.src = './img/fruits/target3.png';
// Рот
export let imgMouth = new Image();
imgMouth.src = './img/snake-parts/eat.png';

export let snake = {
        fruitList: [imgApple, imgBanana, imgStrawberry],
        indexFruit: 0,
        headX: 0,
        headY: 0,
        xVelocity: 0,
        yVelocity: 0,
        fruitX: 0,
        fruitY: 176,
        sumFruits: 0,
        font: 50,
        speed: 3,
        // смещение при поворотах.
        offsetsEyseLeftX: -17,
        offsetsEyseLeftY: -17,
        offsetsEyseRightX: -17,
        offsetsEyseRightY: 1,
        offsetsMouthLeftX: 6,
        offsetsMouthLeftY: -3,
        offsetsMouthRightX: 6,
        offsetsMouthRightY: 3,
        // начальное количество кусочков тела.
        bodyLength: 100,
        // мобильные переменные.
        os: 0,
        widthScrin: 0,
}
