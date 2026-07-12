// ===============================
// Elements
// ===============================

const board = document.getElementById("board");
const restartBtn = document.getElementById("restartBtn");
const difficulty = document.getElementById("difficulty");

const timer = document.getElementById("timer");
const mistakeText = document.getElementById("mistakes");
const bestTimeText = document.getElementById("bestTime");

const hintBtn = document.getElementById("hintBtn");
const hintCount = document.getElementById("hintCount");

const notesBtn = document.getElementById("notesBtn");
const winPopup = document.getElementById("winPopup");
const finalTime = document.getElementById("finalTime");
const playAgainBtn = document.getElementById("play-again-btn");
let notesMode = false;

// Stores notes for every cell
let notes = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => [])
);


let hints = 3;

let selectedCell = null;

let solution = [];
let puzzle = [];

let mistakes = 0;

let seconds = 0;
let timerInterval;

// ===============================
// Create Empty Board
// ===============================

function highlightBoard(row, col) {

    document.querySelectorAll(".cell").forEach(cell => {

        cell.classList.remove("highlight");

        let r = Number(cell.dataset.row);
        let c = Number(cell.dataset.col);

        const sameRow = r === row;
        const sameCol = c === col;

        const sameBox =
            Math.floor(r / 3) === Math.floor(row / 3) &&
            Math.floor(c / 3) === Math.floor(col / 3);

        if (sameRow || sameCol || sameBox) {

            cell.classList.add("highlight");

        }

    });

}
function highlightSameNumbers(number) {

    document.querySelectorAll(".cell").forEach(cell => {

        cell.classList.remove("same-number");

        if (cell.textContent == number && number !== "") {

            cell.classList.add("same-number");

        }

    });

}
function createBoard() {

    board.innerHTML = "";

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            const cell = document.createElement("div");

            cell.classList.add("cell");

            cell.dataset.row = row;
            cell.dataset.col = col;

            if (col === 2 || col === 5)
                cell.classList.add("right-border");

            if (row === 2 || row === 5)
                cell.classList.add("bottom-border");

            cell.addEventListener("click", () => {

                document.querySelectorAll(".cell").forEach(c => {

                    c.classList.remove("selected");

                });

                selectedCell = cell;

                highlightBoard(row, col);

                highlightSameNumbers(cell.textContent);

                cell.classList.add("selected");

            });

            board.appendChild(cell);

        }

    }

}

// ===============================
// Sudoku Generator
// ===============================

function emptyBoard() {

    return Array.from({ length: 9 }, () => Array(9).fill(0));

}

function shuffle(arr) {

    for (let i = arr.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));

        [arr[i], arr[j]] = [arr[j], arr[i]];

    }

    return arr;

}

function isSafe(board, row, col, num) {

    for (let x = 0; x < 9; x++) {

        if (board[row][x] === num)
            return false;

        if (board[x][col] === num)
            return false;

    }

    let startRow = row - row % 3;
    let startCol = col - col % 3;

    for (let r = 0; r < 3; r++) {

        for (let c = 0; c < 3; c++) {

            if (board[startRow + r][startCol + c] === num)
                return false;

        }

    }

    return true;

}

function fillBoard(board, row = 0, col = 0) {

    if (row === 9)
        return true;

    let nextRow = col === 8 ? row + 1 : row;
    let nextCol = col === 8 ? 0 : col + 1;

    let numbers = shuffle([1,2,3,4,5,6,7,8,9]);

    for (let num of numbers) {

        if (isSafe(board, row, col, num)) {

            board[row][col] = num;

            if (fillBoard(board, nextRow, nextCol))
                return true;

            board[row][col] = 0;

        }

    }

    return false;

}
createBoard();
// ===============================
// Copy Board
// ===============================

function copyBoard(board) {

    return board.map(row => [...row]);

}

// ===============================
// Remove Numbers
// ===============================

function removeNumbers(board, count) {

    while (count > 0) {

        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);

        if (board[row][col] !== 0) {

            board[row][col] = 0;
            count--;

        }

    }

}

// ===============================
// Draw Puzzle
// ===============================
function renderNotes(cell, row, col) {

    cell.innerHTML = "";

    const grid = document.createElement("div");

    grid.classList.add("notes-grid");

    for (let i = 1; i <= 9; i++) {

        const mini = document.createElement("div");

        mini.classList.add("note");

        if (notes[row][col].includes(i)) {

            mini.textContent = i;

        }

        grid.appendChild(mini);

    }

    cell.appendChild(grid);

}
function drawPuzzle() {

    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {

        let row = Number(cell.dataset.row);
        let col = Number(cell.dataset.col);

        let value = puzzle[row][col];

        if (value === 0) {

            cell.innerHTML = "";

        } else {

            cell.textContent = value;

        }
        cell.classList.remove("fixed");

        if (value !== 0) {

            cell.classList.add("fixed");

        }

    });

}
// ===============================
// Timer
// ===============================

function updateTimer() {

    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;

    timer.textContent =
        String(min).padStart(2, "0") +
        ":" +
        String(sec).padStart(2, "0");

}

function startTimer() {

    clearInterval(timerInterval);

    seconds = 0;

    updateTimer();

    timerInterval = setInterval(() => {

        seconds++;

        updateTimer();

    }, 1000);

}
// ===============================
// New Game
// ===============================

function newGame() {

    mistakes = 0;

    mistakeText.textContent = "0/3";

    hints = 3;
    
    hintCount.textContent = hints;

    notes = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => [])
    );

    notesMode = false;

    notesBtn.textContent = "✏️ Notes: OFF";

    solution = emptyBoard();

    fillBoard(solution);

    puzzle = copyBoard(solution);

    removeNumbers(puzzle, Number(difficulty.value));

    drawPuzzle();

    startTimer();

}

// ===============================
// Best Time
// ===============================

function loadBestTime() {

    const best = localStorage.getItem("bestTime");

    if (best === null) {

        bestTimeText.textContent = "--:--";
        return;

    }

    let min = Math.floor(Number(best) / 60);
    let sec = Number(best) % 60;

    bestTimeText.textContent =
        String(min).padStart(2, "0") +
        ":" +
        String(sec).padStart(2, "0");

}

function saveBestTime() {

    const best = localStorage.getItem("bestTime");

    if (best === null || seconds < Number(best)) {

        localStorage.setItem("bestTime", seconds);

    }

    loadBestTime();

}
function checkWin() {

    for (let r = 0; r < 9; r++) {

        for (let c = 0; c < 9; c++) {

            if (puzzle[r][c] !== solution[r][c]) {

                return;

            }

        }

    }

    clearInterval(timerInterval);

    saveBestTime();

    finalTime.textContent = timer.textContent;

    winPopup.style.display = "flex";

}
const numberButtons = document.querySelectorAll("#numbers button");

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (!selectedCell)
            return;

        if (selectedCell.classList.contains("fixed"))
            return;

        const row = Number(selectedCell.dataset.row);
        const col = Number(selectedCell.dataset.col);

        if (button.id === "erase") {

            selectedCell.textContent = "";

            puzzle[row][col] = 0;

            return;

        }

        let value = Number(button.textContent);

        // ===============================
        // Notes Mode
        // ===============================

        if (notesMode) {

            if (puzzle[row][col] !== 0)
                return;

            if (!notes[row][col].includes(value)) {

                notes[row][col].push(value);

        } else {

            notes[row][col] =
                notes[row][col].filter(n => n !== value);

        }

        renderNotes(selectedCell, row, col);

        return;

    }

        // ===============================
        // Normal Mode
        // ===============================

        if (solution[row][col] === value) {

            selectedCell.textContent = value;

            selectedCell.classList.remove("wrong");

            selectedCell.classList.add("correct");

            puzzle[row][col] = value;

            notes[row][col] = [];

            checkWin();

        } else {

            mistakes++;

            mistakeText.textContent = mistakes + "/3";

            selectedCell.classList.add("wrong");

            setTimeout(() => {

                selectedCell.classList.remove("wrong");

        }, 500);

        if (mistakes >= 3) {

            alert("Game Over!");

            newGame();

        }

    }

    });

});
document.addEventListener("keydown", e => {

    if (!selectedCell)
        return;

    if (selectedCell.classList.contains("fixed"))
        return;

    const row = Number(selectedCell.dataset.row);
    const col = Number(selectedCell.dataset.col);

    if (e.key >= "1" && e.key <= "9") {

        let value = Number(e.key);

        if (solution[row][col] === value) {

            selectedCell.textContent = value;

            puzzle[row][col] = value;

            selectedCell.classList.remove("wrong");

            selectedCell.classList.add("correct");

            checkWin();

        } else {

            mistakes++;

            mistakeText.textContent = mistakes + "/3";

            selectedCell.classList.add("wrong");

            setTimeout(() => {

                selectedCell.classList.remove("wrong");

            }, 500);

            if (mistakes >= 3) {

                alert("Game Over!");

                newGame();

            }

        }

    }

    if (e.key === "Backspace" || e.key === "Delete") {

        selectedCell.textContent = "";

        puzzle[row][col] = 0;

    }

});

function useHint() {

    if (hints <= 0)
        return;

    let emptyCells = [];

    for (let r = 0; r < 9; r++) {

        for (let c = 0; c < 9; c++) {

            if (puzzle[r][c] === 0) {

                emptyCells.push({ row: r, col: c });

            }

        }

    }

    if (emptyCells.length === 0)
        return;

    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    puzzle[randomCell.row][randomCell.col] =
        solution[randomCell.row][randomCell.col];

    drawPuzzle();

    hints--;

    hintCount.textContent = hints;

    checkWin();

}
    


restartBtn.addEventListener("click", newGame);
loadBestTime();
hintBtn.addEventListener("click", useHint);
newGame();
notesBtn.addEventListener("click", () => {

    notesMode = !notesMode;

    notesBtn.textContent =
        notesMode ? "✏️ Notes: ON" : "✏️ Notes: OFF";

});