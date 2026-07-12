const params = new URLSearchParams(window.location.search);

const game = params.get("game");

const gameData = {

    chess:{

        title:"Chess",

        image:"images/chess.jpg",

        rating:"4.9",

        players:"2",

        difficulty:"Hard",

        category:"Strategy",

        description:"Improve your strategy by playing chess.",

        play:"games/chess.html"

    },

    snake:{

        title:"Snake",

        image:"images/snake.jpg",

        rating:"4.7",

        players:"1",

        difficulty:"Easy",

        category:"Arcade",

        description:"Eat food and grow as long as possible.",

        play:"games/snake.html"

    },

    sudoku:{

        title:"Sudoku",

        image:"images/sudoku.jpg",

        rating:"4.9",

        players:"1",

        difficulty:"Medium",

        category:"Puzzle",

        description:"Solve number puzzles to train your brain.",

        play:"games/sudoku.html"

    },

    tictactoe:{

        title:"Tic Tac Toe",

        image:"images/tictactoe.jpg",

        rating:"4.8",

        players:"2",

        difficulty:"Easy",

        category:"Board Game",

        description:"Challenge your friend in Tic Tac Toe.",

        play:"games/tictactoe.html"

    }

};

const data = gameData[game];

if(data){

    document.getElementById("gameTitle").textContent = data.title;

    document.getElementById("gameImage").src = data.image;

    document.getElementById("gameBanner").src = data.image;

    document.getElementById("gameRating").textContent = data.rating;

    document.getElementById("gamePlayers").textContent = data.players;

    document.getElementById("gameDifficulty").textContent = data.difficulty;

    document.getElementById("gameCategory").textContent = data.category;

    document.getElementById("gameDescription").textContent = data.description;

    document.getElementById("playGameBtn").href = data.play;

}
const thumbnails = document.querySelectorAll(".gallery img");

thumbnails.forEach(img => {

    img.onclick = function(){

        document.getElementById("gameImage").src = this.src;

    };

});