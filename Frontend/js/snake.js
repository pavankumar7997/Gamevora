// =============================
// Snake Game - Part 3A
// Variables & Controls
// =============================

// Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// UI
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");
const gameMessage = document.getElementById("gameMessage");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const restartBtn = document.getElementById("restartBtn");

const easyBtn = document.getElementById("easyBtn");
const mediumBtn = document.getElementById("mediumBtn");
const hardBtn = document.getElementById("hardBtn");

// Mobile Buttons
const upBtn = document.getElementById("upBtn");
const downBtn = document.getElementById("downBtn");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

// Grid
const box = 20;
const rows = canvas.width / box;

// Snake
let snake = [
    { x: 200, y: 200 }
];

// Food
let food = {
    x: Math.floor(Math.random() * rows) * box,
    y: Math.floor(Math.random() * rows) * box
};

// Game State
let direction = "RIGHT";
let score = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;

highScoreElement.textContent = highScore;

let gameLoop = null;
let gameStarted = false;
let paused = false;

// Difficulty
let gameSpeed = 150;

// =============================
// Difficulty Buttons
// =============================

easyBtn.addEventListener("click", () => {

    gameSpeed = 180;

    easyBtn.classList.add("active");
    mediumBtn.classList.remove("active");
    hardBtn.classList.remove("active");

});

mediumBtn.addEventListener("click", () => {

    gameSpeed = 120;

    mediumBtn.classList.add("active");
    easyBtn.classList.remove("active");
    hardBtn.classList.remove("active");

});

hardBtn.addEventListener("click", () => {

    gameSpeed = 70;

    hardBtn.classList.add("active");
    easyBtn.classList.remove("active");
    mediumBtn.classList.remove("active");

});

// =============================
// Keyboard Controls
// =============================

document.addEventListener("keydown", changeDirection);

function changeDirection(e){

    if(e.key==="ArrowUp" && direction!=="DOWN")
        direction="UP";

    if(e.key==="ArrowDown" && direction!=="UP")
        direction="DOWN";

    if(e.key==="ArrowLeft" && direction!=="RIGHT")
        direction="LEFT";

    if(e.key==="ArrowRight" && direction!=="LEFT")
        direction="RIGHT";

}

// =============================
// Mobile Controls
// =============================

upBtn.onclick=()=>{

    if(direction!=="DOWN")
        direction="UP";

};

downBtn.onclick=()=>{

    if(direction!=="UP")
        direction="DOWN";

};

leftBtn.onclick=()=>{

    if(direction!=="RIGHT")
        direction="LEFT";

};

rightBtn.onclick=()=>{

    if(direction!=="LEFT")
        direction="RIGHT";

};

// =============================
// Start Game
// =============================

startBtn.addEventListener("click",()=>{

    if(gameStarted) return;

    gameStarted=true;
    paused=false;

    gameMessage.textContent="";

    gameLoop=setInterval(updateGame,gameSpeed);

});

// =============================
// Pause Game
// =============================

pauseBtn.addEventListener("click",()=>{

    if(!gameStarted) return;

    if(!paused){

        clearInterval(gameLoop);

        paused=true;

        pauseBtn.textContent="▶ Resume";

        gameMessage.textContent="⏸ Game Paused";

    }else{

        paused=false;

        pauseBtn.textContent="⏸ Pause";

        gameMessage.textContent="";

        gameLoop=setInterval(updateGame,gameSpeed);

    }

});
// =============================
// Draw Game
// =============================

function drawGame() {

    // Background
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = "#222";

    for (let i = 0; i <= canvas.width; i += box) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }

    // Food
    ctx.fillStyle = "#ff3b30";
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box / 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Snake
    snake.forEach((part, index) => {

        if (index === 0) {
            ctx.fillStyle = "#22c55e"; // Head
        } else {
            ctx.fillStyle = "#16a34a"; // Body
        }

        ctx.fillRect(part.x + 1, part.y + 1, box - 2, box - 2);
    });

}

// =============================
// Update Game
// =============================

function updateGame() {

    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "UP") headY -= box;
    if (direction === "DOWN") headY += box;
    if (direction === "LEFT") headX -= box;
    if (direction === "RIGHT") headX += box;

    // -------------------------
    // Wall Collision
    // -------------------------

    if (
        headX < 0 ||
        headX >= canvas.width ||
        headY < 0 ||
        headY >= canvas.height
    ) {

        gameOver();
        return;

    }

    // -------------------------
    // Self Collision
    // -------------------------

    for (let i = 0; i < snake.length; i++) {

        if (
            snake[i].x === headX &&
            snake[i].y === headY
        ) {

            gameOver();
            return;

        }

    }

    // -------------------------
    // New Head
    // -------------------------

    let newHead = {
        x: headX,
        y: headY
    };

    snake.unshift(newHead);

    // -------------------------
    // Eat Food
    // -------------------------

    if (
        headX === food.x &&
        headY === food.y
    ) {

        score++;

        scoreElement.textContent = score;

        // High Score
        if (score > highScore) {

            highScore = score;

            highScoreElement.textContent = highScore;

            localStorage.setItem(
                "snakeHighScore",
                highScore
            );

        }

        // New Food
        food = {

            x: Math.floor(Math.random() * rows) * box,

            y: Math.floor(Math.random() * rows) * box

        };

    }
    else {

        snake.pop();

    }

    drawGame();

}
// =============================
// Game Over
// =============================

function gameOver() {

    clearInterval(gameLoop);

    gameStarted = false;
    paused = false;

    pauseBtn.textContent = "⏸ Pause";

    gameMessage.textContent = "💀 Game Over! Press Restart";

}

// =============================
// Restart Game
// =============================

function restartGame() {

    clearInterval(gameLoop);

    snake = [
        { x: 200, y: 200 }
    ];

    direction = "RIGHT";

    score = 0;
    scoreElement.textContent = score;

    food = {
        x: Math.floor(Math.random() * rows) * box,
        y: Math.floor(Math.random() * rows) * box
    };

    gameStarted = false;
    paused = false;

    pauseBtn.textContent = "⏸ Pause";

    gameMessage.textContent = "▶ Press Start to Play";

    drawGame();

}

restartBtn.addEventListener("click", restartGame);

// =============================
// Initial Draw
// =============================

drawGame();