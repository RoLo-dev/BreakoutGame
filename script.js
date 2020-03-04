const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const brickRowCount = 9;
const brickColumnCount = 8;

let score = 0;
function Score(){
    context.font = '20px Arial';
    context.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

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
    context.fillStyle = '#D15D1F';
    context.fill();
    context.closePath();
}

const paddle = {
    x: canvas.width / 2 -40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
}
function drawPaddle(){
    context.beginPath();
    context.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    context.fillStyle = '#fff';
    context.fill();
    context.closePath();
}

const brickInfo = {
    w: 70,
    h: 20,
    margin: 10,
    offSetX: 45,
    offSetY: 60,
    visible: true
}
const bricks = [];
for(let i = 0; i < brickRowCount; i++){
    bricks[i] = [];
    for(let j = 0; j < brickColumnCount; j++){
        const x = i * (brickInfo.w + brickInfo.margin) + brickInfo.offSetX;
        const y = j * (brickInfo.h + brickInfo.margin) + brickInfo.offSetY;
        bricks[i][j] = {x,y, ...brickInfo};
    }
}
function drawBricks(){
    bricks.forEach(column => column.forEach(brick => {
        context.beginPath();
        context.rect(brick.x, brick.y, brick.w, brick.h);
        context.fillStyle = brick.visible ? '#D15D1F' : 'transparent';
        context.fill();
        context.closePath();
    }))
}

function movePaddle(){
    paddle.x += paddle.dx;
    if(paddle.x + paddle.w > canvas.width){
        paddle.x = canvas.width - paddle.w;
    }
    if(paddle.x < 0){
        paddle.x = 0;
    }
}

function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0){
        ball.dx *= -1;
    }
    if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0){
        ball.dy *= -1;
    }
    if(
        ball.x - ball.size > paddle.x && 
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
    ){
        ball.dy = -ball.speed;
    }

    bricks.forEach(column => {
        column.forEach(brick => {
            if(brick.visible){
                if(
                    ball.x - ball.size > brick.x &&
                    ball.x + ball.size < brick.x + brick.w &&
                    ball.y + ball.size > brick.y &&
                    ball.y - ball.size < brick.y + brick.h
                ){
                    ball.dy *= -1; 
                    brick.visible = false;

                    increaseScore();
                }
            }
        })
    })

    if(ball.y + ball.size > canvas.height){
        showAllBricks();
        score = 0;
    }
}

function increaseScore(){
    score++;
    if(score % (brickRowCount * brickRowCount) === 0){
        showAllBricks();
    }
}
function showAllBricks(){
    bricks.forEach(column => {
        column.forEach(brick => (brick.visible = true));
    });
}

function draw(){
    context.clearRect(0,0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    Score();
    drawBricks();
}

function update(){
    movePaddle();
    moveBall();
    draw();
    requestAnimationFrame(update);
}
update();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e){
    if(e.key === 'Right' || e.key === 'ArrowRight'){
        paddle.dx = paddle.speed;
    } else if(e.key === 'Left' || e.key === 'ArrowLeft'){
        paddle.dx = -paddle.speed;
    }
}
function keyUp(e){
    if(
        e.key === 'Right' ||
        e.key === 'ArrowRight' ||
        e.key === 'Left' ||
        e.key === 'ArrowLeft' 
    ){ paddle .dx = 0 }
}


const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');

rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));