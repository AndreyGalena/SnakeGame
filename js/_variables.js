export  let imgEyes = new Image();
        imgEyes.src = './img/snake-parts/blink.png';

export  let imgApple = new Image();
        imgApple.src = './img/fruits/target1.png';

export let snake = {  
        headX: 0,
        headY: 0,
        xVelocity: 0,
        yVelocity: 0,
        fruitX: 0,
        fruitY: 176,
        sumFruits: 0,
        font: 50,
        // смещение при поворотах.
        offsetsEyseLeftX:  -17,
        offsetsEyseLeftY:  -17,
        offsetsEyseRightX: -17,
        offsetsEyseRightY:  1,
        offsetsMouthLeftX:  6,
        offsetsMouthLeftY: -3,
        offsetsMouthRightX: 6,
        offsetsMouthRightY: 3,
        // количество кусочков тела.
        bodyLength: 10,

        os: 0,
        widthScrin: 0,
}
