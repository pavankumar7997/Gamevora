// ==========================
// Create Chess Board
// ==========================

const board = document.getElementById("board");

function drawBoard(){

    board.innerHTML="";

    for(let row=0;row<8;row++){

        for(let col=0;col<8;col++){

            const square=document.createElement("div");

            square.classList.add("square");

            if((row+col)%2===0){

                square.classList.add("light");

            }else{

                square.classList.add("dark");

            }

            square.dataset.row=row;
            square.dataset.col=col;

            square.textContent=chessBoard[row][col];

            board.appendChild(square);

        }

    }

}

drawBoard();