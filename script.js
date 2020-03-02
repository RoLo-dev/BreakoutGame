const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const brickRowCount = 9;
const brickColumnCount = 5;

let score = 0;

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
}

function drawBall(){
    context.beginPath();
    context.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    context.fillStyle = '#0095dd';
    context.fill();
    context.closePath();
}

const paddle = {
    x: canvas.width / 2 -40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    d: 0
}

function drawPaddle(){
    context.beginPath();
    context.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    context.fillStyle = '#0095dd';
    context.fill();
    context.closePath();
}


function Score(){
    context.font = '20px Arial';
    context.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offSetX: 45,
    offSetY: 60,
    visible: true
}
const bricks = [];
for(let i = 0; i < brickRowCount; i++){
    bricks[i] = [];
    for(let j = 0; j < brickColumnCount; j++){
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offSetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offSetY;
        bricks[i][j] = {x,y, ...brickInfo};
    }
}
function drawBricks(){
    bricks.forEach(column => column.forEach(brick => {
        context.beginPath();
        context.rect(brick.x, brick.y, brick.w, brick.h);
        context.fillStyle = brick.visible ? '#0095dd' : 'transparent';
        context.fill();
        context.closePath();
    }))
}

function draw(){
    drawBall();
    drawPaddle();
    Score();
    drawBricks();
}
draw();


const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');

rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));