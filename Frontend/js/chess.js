// ==========================
// Chess Game
// ==========================

const board = document.getElementById("board");

let selectedSquare = null;
let currentTurn = "white";
let legalMoves = [];

const whitePieces = "♔♕♖♗♘♙";
const blackPieces = "♚♛♜♝♞♟";

const turnText = document.getElementById("turn");

const chessBoard = [

["♜","♞","♝","♛","♚","♝","♞","♜"],
["♟","♟","♟","♟","♟","♟","♟","♟"],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["♙","♙","♙","♙","♙","♙","♙","♙"],
["♖","♘","♗","♕","♔","♗","♘","♖"]

];

// ==========================
// Clear Legal Moves
// ==========================

function clearLegalMoves(){

    document.querySelectorAll(".legal-move").forEach(square=>{

        square.classList.remove("legal-move");

    });

    legalMoves=[];

}
// ==========================
// Pawn Moves
// ==========================

function showPawnMoves(square){

    clearLegalMoves();

    const row = parseInt(square.dataset.row);
    const col = parseInt(square.dataset.col);

    // White Pawn
    if(square.textContent === "♙"){

        const one = document.querySelector(`[data-row="${row-1}"][data-col="${col}"]`);

        if(one && one.textContent === ""){

            one.classList.add("legal-move");
            legalMoves.push(one);

        }

        if(row === 6){

            const two = document.querySelector(`[data-row="4"][data-col="${col}"]`);

            if(one && one.textContent === "" &&
               two && two.textContent === ""){

                two.classList.add("legal-move");
                legalMoves.push(two);

            }

        }

        // Capture Left
        const left = document.querySelector(`[data-row="${row-1}"][data-col="${col-1}"]`);

        if(left && blackPieces.includes(left.textContent)){

            left.classList.add("legal-move");
            legalMoves.push(left);

        }

        // Capture Right
        const right = document.querySelector(`[data-row="${row-1}"][data-col="${col+1}"]`);

        if(right && blackPieces.includes(right.textContent)){

            right.classList.add("legal-move");
            legalMoves.push(right);

        }

    }

    // Black Pawn
    if(square.textContent === "♟"){

        const one = document.querySelector(`[data-row="${row+1}"][data-col="${col}"]`);

        if(one && one.textContent === ""){

            one.classList.add("legal-move");
            legalMoves.push(one);

        }

        if(row === 1){

            const two = document.querySelector(`[data-row="3"][data-col="${col}"]`);

            if(one && one.textContent === "" &&
               two && two.textContent === ""){

                two.classList.add("legal-move");
                legalMoves.push(two);

            }

        }

        // Capture Left
        const left = document.querySelector(`[data-row="${row+1}"][data-col="${col-1}"]`);

        if(left && whitePieces.includes(left.textContent)){

            left.classList.add("legal-move");
            legalMoves.push(left);

        }

        // Capture Right
        const right = document.querySelector(`[data-row="${row+1}"][data-col="${col+1}"]`);

        if(right && whitePieces.includes(right.textContent)){

            right.classList.add("legal-move");
            legalMoves.push(right);

        }

    }

}

// ==========================
// Knight Moves
// ==========================

function showKnightMoves(square){

    clearLegalMoves();

    const row = parseInt(square.dataset.row);
    const col = parseInt(square.dataset.col);

    const moves = [
        [-2,-1],[-2,1],
        [-1,-2],[-1,2],
        [1,-2],[1,2],
        [2,-1],[2,1]
    ];

    moves.forEach(move=>{

        const newRow = row + move[0];
        const newCol = col + move[1];

        if(newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7){
            return;
        }

        const target = document.querySelector(
            `[data-row="${newRow}"][data-col="${newCol}"]`
        );

        if(!target) return;

        if(square.textContent === "♘"){

            if(!whitePieces.includes(target.textContent)){

                target.classList.add("legal-move");
                legalMoves.push(target);

            }

        }

        if(square.textContent === "♞"){

            if(!blackPieces.includes(target.textContent)){

                target.classList.add("legal-move");
                legalMoves.push(target);

            }

        }

    });

}
// ==========================
// Create Chess Board
// ==========================

for(let row=0; row<8; row++){

    for(let col=0; col<8; col++){

        const square=document.createElement("div");

        square.classList.add("square");

        if((row+col)%2===0){
            square.classList.add("light");
        }else{
            square.classList.add("dark");
        }

        square.dataset.row=row;
        square.dataset.col=col;

        square.textContent = chessBoard[row][col];

        if(whitePieces.includes(square.textContent)){
            square.classList.add("white-piece");
        }
        else if(blackPieces.includes(square.textContent)){
            square.classList.add("black-piece");
        }

        square.onclick=function(){

            const piece=square.textContent;

            // --------------------
            // Select Piece
            // --------------------

            if(selectedSquare==null){

                if(piece=="") return;

                if(currentTurn=="white" && !whitePieces.includes(piece)) return;

                if(currentTurn=="black" && !blackPieces.includes(piece)) return;

                selectedSquare=square;
                square.classList.add("selected");

                if(piece==="♙" || piece==="♟"){

                    showPawnMoves(square);

                }
                else if(piece==="♘" || piece==="♞"){

                    showKnightMoves(square);

                }
                else{

                    clearLegalMoves();

                }

                return;

            }

            // --------------------
            // Deselect
            // --------------------

            if(selectedSquare===square){

                selectedSquare.classList.remove("selected");
                selectedSquare=null;
                clearLegalMoves();
                return;

            }

            // --------------------
            // Select another own piece
            // --------------------

            if(currentTurn=="white" && whitePieces.includes(piece)){

                selectedSquare.classList.remove("selected");

                selectedSquare=square;

                square.classList.add("selected");

                if(piece==="♙" || piece==="♟"){

                    showPawnMoves(square);

                }
                else if(piece==="♘" || piece==="♞"){

                    showKnightMoves(square);

                }
                else{

                    clearLegalMoves();

                }

                return;

            }

            if(currentTurn=="black" && blackPieces.includes(piece)){

                selectedSquare.classList.remove("selected");

                selectedSquare=square;

                square.classList.add("selected");

                if(piece==="♙" || piece==="♟"){

                    showPawnMoves(square);

                }
                else if(piece==="♘" || piece==="♞"){

                    showKnightMoves(square);

                }
                else{

                    clearLegalMoves();

                }

                return;

            }
                        // --------------------
            // Only legal moves
            // --------------------

            if(!legalMoves.includes(square)){

                return;

            }

            // --------------------
            // Move Piece
            // --------------------

            square.textContent = selectedSquare.textContent;
            selectedSquare.textContent = "";

            square.classList.remove("white-piece","black-piece");
            selectedSquare.classList.remove("white-piece","black-piece");

            if(whitePieces.includes(square.textContent)){
                square.classList.add("white-piece");
            }
            else if(blackPieces.includes(square.textContent)){
                square.classList.add("black-piece");
            }

            selectedSquare.classList.remove("selected");
            selectedSquare = null;

            clearLegalMoves();

            // --------------------
            // Change Turn
            // --------------------

            if(currentTurn=="white"){

                currentTurn="black";
                turnText.textContent="Black";

            }
            else{

                currentTurn="white";
                turnText.textContent="White";

            }

        };

        board.appendChild(square);

    }

}