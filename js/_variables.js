export  let imgEyes = new Image();
        imgEyes.src = './img/snake-parts/blink.png';

// export  let imgMouth = new Image();
//         imgMouth.src = './img/snake-parts/eat.png';

export let snake = {  
        headX: 0,
        headY: 0,
        xVelocity: 0,
        yVelocity: 0,
        // смещение при поворотах.
        offsetsEyseLeftX:  -17,
        offsetsEyseLeftY:  -17,
        offsetsEyseRightX: -17,
        offsetsEyseRightY:  1,
        offsetsMouthLeftX:  6,
        offsetsMouthLeftY: -3,
        offsetsMouthRightX: 6,
        offsetsMouthRightY: 3,

        bodyLength: 100,
}
