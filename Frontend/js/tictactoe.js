// Select elements
const cells = document.querySelectorAll(".cell");
const status = document.querySelector(".tic-container p");
const restartBtn = document.getElementById("restart-btn");

const onePlayerBtn = document.getElementById("onePlayerBtn");
const twoPlayerBtn = document.getElementById("twoPlayerBtn");

const easyBtn = document.getElementById("easyBtn");
const mediumBtn = document.getElementById("mediumBtn");
const hardBtn = document.getElementById("hardBtn");

const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");
const scoreDrawElement = document.getElementById("scoreDraw");

// Game variables
let currentPlayer = "X";
let gameActive = true;
let gameMode = "2player";
let difficulty = "easy";

// Scores
let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

// Winning combinations
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// -------------------------
// Mode Buttons
// -------------------------

onePlayerBtn.addEventListener("click", () => {

    console.log("1 Player selected");

    gameMode = "1player";

    onePlayerBtn.classList.add("active");
    twoPlayerBtn.classList.remove("active");

    restartGame();

});

twoPlayerBtn.addEventListener("click", () => {
    gameMode = "2player";

    twoPlayerBtn.classList.add("active");
    onePlayerBtn.classList.remove("active");

    restartGame();
});

easyBtn.addEventListener("click", () => {
    difficulty = "easy";
    easyBtn.classList.add("active");
    mediumBtn.classList.remove("active");
    hardBtn.classList.remove("active");
});

mediumBtn.addEventListener("click", () => {
    difficulty = "medium";
    mediumBtn.classList.add("active");
    easyBtn.classList.remove("active");
    hardBtn.classList.remove("active");
});

hardBtn.addEventListener("click", () => {
    difficulty = "hard";
    hardBtn.classList.add("active");
    easyBtn.classList.remove("active");
    mediumBtn.classList.remove("active");
});

// -------------------------
// Cell Click
// -------------------------

cells.forEach((cell, index) => {

    cell.addEventListener("click", () => {

        if (!gameActive) return;

        if (cell.textContent !== "") return;

        makeMove(index);

        if (
            gameMode === "1player" &&
            gameActive &&
            currentPlayer === "O"
        ) {
            setTimeout(botMove, 500);
        }

    });

});

// -------------------------
// Make Move
// -------------------------

function makeMove(index){

    cells[index].textContent = currentPlayer;

    if(currentPlayer==="X"){
        cells[index].classList.add("x");
    }else{
        cells[index].classList.add("o");
    }

    checkWinner();

    if(gameActive){

        currentPlayer = currentPlayer==="X" ? "O":"X";

        status.textContent =
        "Player " + currentPlayer + "'s Turn";

    }

}

// -------------------------
// Bot
// -------------------------

function botMove(){

    if(difficulty==="easy"){
        easyMove();
    }
    else if(difficulty==="medium"){
        mediumMove();
    }
    else{
        hardMove();
    }

}

// EASY (Random)
function easyMove(){

    let empty=[];

    cells.forEach((cell,index)=>{

        if(cell.textContent===""){
            empty.push(index);
        }

    });

    if(empty.length===0) return;

    let randomIndex=
    empty[Math.floor(Math.random()*empty.length)];

    makeMove(randomIndex);

}

// MEDIUM (Win -> Block -> Random)
function mediumMove(){

    // Try to win
    let move=findBestMove("O");

    if(move!==-1){
        makeMove(move);
        return;
    }

    // Block X
    move=findBestMove("X");

    if(move!==-1){
        makeMove(move);
        return;
    }

    // Otherwise random
    easyMove();

}

// HARD (Temporary)
function hardMove(){

    // For now same as Medium.
    // Later we'll replace with Minimax.

    mediumMove();

}

// Find winning/blocking move
function findBestMove(player){

    for(let combo of winningCombinations){

        let a=combo[0];
        let b=combo[1];
        let c=combo[2];

        let values=[
            cells[a].textContent,
            cells[b].textContent,
            cells[c].textContent
        ];

        if(values.filter(v=>v===player).length===2 &&
           values.includes("")){

            if(cells[a].textContent==="") return a;
            if(cells[b].textContent==="") return b;
            if(cells[c].textContent==="") return c;

        }

    }

    return -1;

}

// -------------------------
// Winner
// -------------------------

function checkWinner(){

    for(let combo of winningCombinations){

        const a=cells[combo[0]].textContent;
        const b=cells[combo[1]].textContent;
        const c=cells[combo[2]].textContent;

        if(a!=="" && a===b && b===c){

            cells[combo[0]].classList.add("winner");
            cells[combo[1]].classList.add("winner");
            cells[combo[2]].classList.add("winner");

            status.textContent="🎉 Player "+a+" Wins!";

            if(a==="X"){
                scoreX++;
                scoreXElement.textContent=scoreX;
            }else{
                scoreO++;
                scoreOElement.textContent=scoreO;
            }

            gameActive=false;
            return;
        }

    }

    let draw=true;

    cells.forEach(cell=>{

        if(cell.textContent===""){
            draw=false;
        }

    });

    if(draw){

        status.textContent="🤝 It's a Draw!";

        scoreDraw++;

        scoreDrawElement.textContent=scoreDraw;

        gameActive=false;

    }

}

// -------------------------
// Restart Function
// -------------------------

function restartGame(){

    cells.forEach(cell=>{

        cell.textContent="";

        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.classList.remove("winner");

    });

    currentPlayer="X";

    gameActive=true;

    status.textContent="Player X's Turn";

}

// -------------------------
// Restart Button
// -------------------------

restartBtn.addEventListener("click",restartGame);