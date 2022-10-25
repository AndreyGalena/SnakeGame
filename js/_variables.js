export  let imgHeadRight = new Image();
        imgHeadRight.src = './img/snake-head/snake_head_right.png';

export  let imgHeadLeft = new Image();
        imgHeadLeft.src = './img/snake-head/snake_head_left.png';

export  let imgHeadUp = new Image();
        imgHeadUp.src = './img/snake-head/snake_head_top.png';

export  let imgHeadDown = new Image();
        imgHeadDown.src = './img/snake-head/snake_head_bottom.png';

export let snake = {
        startPointX: 0,
        startPointY: 0,  
        headX: 0,
        headY: 0,
        bodyX: 0,
        bodyY: 0,
        offsetX: 0,
        offsetY: 0,
        xVelocity: 0,
        yVelocity: 0,
        imgHead: imgHeadRight,

        bodyLength: 40,
}
