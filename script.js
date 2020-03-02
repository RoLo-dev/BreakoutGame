const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');

rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

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
drawBall();

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
    context.rect(paddle.x, paddle.y, paddle.w, )
}