let board = [];

let square = document.getElementsByClassName("squares");
let turnDisplay = document.getElementById("player-turn-text");
let historyButton = document.getElementById("move-history");

board.push([square[0], square[1], square[2]]);
board.push([square[3], square[4], square[5]]);
board.push([square[6], square[7], square[8]]);

let yourMoves = [];
let otherMoves = [];
let discardedMoves = [];
let otherDiscardedMoves = [];
let readAllMoves = [];

export function move(piece, piece2) {

    if (readAllMoves.length === 0) {
        turnDisplay.innerHTML = "Your turn.";
    }

    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            board[i][j].onclick = () => {
                board[i][j].innerHTML = piece;
                board[i][j].onclick = false;
                readAllMoves.push(piece);
                yourMoves.push([i, j]);
                freeSquares();
                checkWinner(piece, "You Win!");
                compMove(piece2, piece);
                turnDisplay.innerHTML = "Computer's turn.";
            }
        }
    }
}

export function twoPlayerMode(piece1, piece2) {

    if (readAllMoves.length === 0) {
        turnDisplay.innerHTML = "Player 1's turn.";
    }

    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            board[i][j].onclick = () => {
                board[i][j].innerHTML = piece1; //put your selected piece
                board[i][j].onclick = false;  //you can't overwrite its value.
                readAllMoves.push([i, j]);
                yourMoves.push([i, j]);
                console.log(yourMoves);
                freeSquares();
                checkWinner(piece1, "Player 1 Wins!");
                //swap turns
                anotherPlayer(piece2, piece1);
                turnDisplay.innerHTML = "Player 2's turn.";
            };
        }
    }
}

function anotherPlayer(piece, piece2) {
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            board[i][j].onclick = () => {
                board[i][j].innerHTML = piece;
                board[i][j].onclick = false;
                readAllMoves.push(piece);
                otherMoves.push([i, j]);
                console.log(otherMoves);
                freeSquares();
                twoPlayerMode(piece2, piece);
                turnDisplay.innerHTML = "Player 1's turn.";
            }
        }
    }
}

function compMove(piece) {
    let row;
    let column;

    if (freeSquares() > 0) {
        setTimeout(() => {
            turnDisplay.innerHTML = "Your turn.";
            do {
                row = Math.floor(Math.random() * 3);
                column = Math.floor(Math.random() * 3);
            } while (board[row][column].innerHTML != "");
            board[row][column].innerHTML = piece;
            console.log(board[row][column].innerHTML);
            board[row][column].onclick = false;
            otherMoves.push([row, column]);
            readAllMoves.push(piece);
            checkWinner(piece, "You Lose!");
        }, 3000);
    }
}

function freeSquares() {
    let numFree = 9;
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            if (board[i][j].innerHTML != "") {
                numFree -= 1;
            }
        }
    }

    return numFree;
}

function checkWinner(piece, message) {
    let declareWinner = document.getElementById("wldcont");
    let text = document.getElementById("wldtext");

    //check rows
    for (let i = 0; i < 3; ++i) {
        if (board[i][0].innerHTML === piece) {
            if (board[i][0].innerHTML === board[i][1].innerHTML && board[i][0].innerHTML === board[i][2].innerHTML) {
                declareWinner.style.display = "flex";
                text.innerHTML = message;
                compMove(null).disabled = true;
            }
            else if (freeSquares() === 0 && (board[i][0].innerHTML !== board[i][1].innerHTML || board[i][0].innerHTML !== board[i][2].innerHTML)) {
                declareWinner.style.display = "flex";
                text.innerHTML = "It's a Draw!";
            }
        }
    }

    //check columns
    for (let i = 0; i < 3; ++i) {
        if (board[0][i].innerHTML === piece) {

            if (board[0][i].innerHTML === board[1][i].innerHTML && board[0][i].innerHTML === board[2][i].innerHTML) {
                declareWinner.style.display = "flex";
                text.innerHTML = message;
                compMove(null).disabled = true;
            }
        }
    }

    //check diagonals
    if (board[0][0].innerHTML === piece) {

        if (board[0][0].innerHTML === board[1][1].innerHTML && board[0][0].innerHTML === board[2][2].innerHTML) {
            declareWinner.style.display = "flex";
            text.innerHTML = message;
            compMove(null).disabled = true;
        }
    }

    if (board[0][2].innerHTML === piece) {
        if (board[0][2].innerHTML === board[1][1].innerHTML && board[0][2].innerHTML === board[2][0].innerHTML) {
            declareWinner.style.display = "flex";
            text.innerHTML = message;
            compMove(null).disabled = true;
        }
    }
}


//restart button
export function reset(piece, piece2) {
    let resetButton = document.getElementById("restart");

    resetButton.onclick = () => {
        for (let i = 0; i < readAllMoves.length; ++i) {
            readAllMoves.pop();
        }
        clearBoard();
        move(piece, piece2);
    }
}

export function resetForTwoPlayers(piece, piece2) {
    let resetButton = document.getElementById("restart");
    resetButton.onclick = () => {
        for (let i = 0; i < readAllMoves.length; ++i) {
            readAllMoves.pop();
        }
        clearBoard();
        twoPlayerMode(piece, piece2);
    }
}


export function playAgain(piece, piece2) {
    let playAgainButton = document.getElementById("playagain");
    let declareWinner = document.getElementById("wldcont");
    playAgainButton.onclick = () => {
        declareWinner.style.display = "none";
        clearBoard();
        move(piece, piece2);
        turnDisplay.innerHTML = "Your turn.";
    }
}

export function playAgainTwoPlayers(piece, piece2) {
    let playAgainButton = document.getElementById("playagain");
    let declareWinner = document.getElementById("wldcont");
    playAgainButton.onclick = () => {
        declareWinner.style.display = "none";
        clearBoard();
        twoPlayerMode(piece, piece2);
        turnDisplay.innerHTML = "Player 1's turn.";
    }
}

export function undo(piece1, piece2) {
    let undoButton = document.getElementById("undo");

    undoButton.onclick = () => {
        if (yourMoves.length === 0 || otherMoves.length === 0) {
            alert("Reached undo limit!");
        }

        if (yourMoves.length > otherMoves.length) {
            board[yourMoves[yourMoves.length - 1][0]][yourMoves[yourMoves.length - 1][1]].innerHTML = "";
            discardedMoves.push([yourMoves[yourMoves.length - 1][0], yourMoves[yourMoves.length - 1][1]]);
            yourMoves.pop();
            readAllMoves.pop();
        }
        else if (yourMoves.length === otherMoves.length) {
            board[yourMoves[yourMoves.length - 1][0]][yourMoves[yourMoves.length - 1][1]].innerHTML = "";
            board[otherMoves[otherMoves.length - 1][0]][otherMoves[otherMoves.length - 1][1]].innerHTML = "";
            discardedMoves.push([yourMoves[yourMoves.length - 1][0], yourMoves[yourMoves.length - 1][1]]);
            otherDiscardedMoves.push([otherMoves[otherMoves.length - 1][0], otherMoves[otherMoves.length - 1][1]]);
            yourMoves.pop();
            otherMoves.pop();
            readAllMoves.pop();
            readAllMoves.pop();
        }
        move(piece1, piece2);
        console.log(yourMoves);
        console.log(otherMoves);
        console.log("Discarded Moves: ");
        console.log(discardedMoves);
        console.log(otherDiscardedMoves);
        console.log("\n");
    }
}

export function undoForTwoPlayers(piece1, piece2) {
    let undoButton = document.getElementById("undo");
    undoButton.onclick = () => {
        if (yourMoves.length === 0 || otherMoves.length === 0) {
            alert("Reached undo limit!");
        }
        if (yourMoves.length > otherMoves.length) {
            board[yourMoves[yourMoves.length - 1][0]][yourMoves[yourMoves.length - 1][1]].innerHTML = "";
            discardedMoves.push([yourMoves[yourMoves.length - 1][0], yourMoves[yourMoves.length - 1][1]]);
            yourMoves.pop();
            readAllMoves.pop();
        }
        else if (yourMoves.length === otherMoves.length){
            board[yourMoves[yourMoves.length - 1][0]][yourMoves[yourMoves.length - 1][1]].innerHTML = "";
            board[otherMoves[otherMoves.length - 1][0]][otherMoves[otherMoves.length - 1][1]].innerHTML = "";
            discardedMoves.push([yourMoves[yourMoves.length - 1][0], yourMoves[yourMoves.length - 1][1]]);
            otherDiscardedMoves.push([otherMoves[otherMoves.length - 1][0], otherMoves[otherMoves.length - 1][1]]);
            yourMoves.pop();
            otherMoves.pop();
            readAllMoves.pop();
            readAllMoves.pop();
        }
        twoPlayerMode(piece1, piece2);
        console.log(yourMoves);
        console.log(otherMoves);
        console.log("Discarded Moves: ");
        console.log(discardedMoves);
        console.log(otherDiscardedMoves);
        console.log("\n");
    }
}

export function clearBoard() {
    for (let i = 0; i < readAllMoves.length; ++i) {
        readAllMoves.pop();
    }

    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            board[i][j].innerHTML = "";
            board[i][j].onclick = true;
            yourMoves.pop();
            otherMoves.pop();
        }
    }
}

export function redo(piece1, piece2) {
    let redoButton = document.getElementById("redo");
    redoButton.onclick = () => {
        if (discardedMoves.length === 0 || otherDiscardedMoves.length === 0) {
            alert("Reached redo limit!");
        }

        if ((discardedMoves.length > otherDiscardedMoves.length) || (discardedMoves.length === 1)) {
            board[discardedMoves[discardedMoves.length - 1][0]][discardedMoves[discardedMoves.length - 1][1]].innerHTML = piece1;
            yourMoves.push([discardedMoves[discardedMoves.length - 1][0], discardedMoves[discardedMoves.length - 1][1]]);
            discardedMoves.pop();
            readAllMoves.push(piece1);
        }

        else {
            board[discardedMoves[discardedMoves.length - 1][0]][discardedMoves[discardedMoves.length - 1][1]].innerHTML = piece1;
            board[otherDiscardedMoves[otherDiscardedMoves.length - 1][0]][otherDiscardedMoves[otherDiscardedMoves.length - 1][1]].innerHTML = piece2;
            yourMoves.push([discardedMoves[discardedMoves.length - 1][0], discardedMoves[discardedMoves.length - 1][1]]);
            otherMoves.push([otherDiscardedMoves[otherDiscardedMoves.length - 1][0], otherDiscardedMoves[otherDiscardedMoves.length - 1][1]]);
            discardedMoves.pop();
            otherDiscardedMoves.pop();
        }

        move(piece1, piece2);
    }
}

export function redoForTwoPlayers(piece1, piece2) {
    let redoButton = document.getElementById("redo");
    redoButton.onclick = () => {
        if (discardedMoves.length === 0 || otherDiscardedMoves.length === 0) {
            alert("Reached redo limit!");
        }

        if ((discardedMoves.length > otherDiscardedMoves.length) || (discardedMoves.length === 1)) {
            board[discardedMoves[discardedMoves.length - 1][0]][discardedMoves[discardedMoves.length - 1][1]].innerHTML = piece1;
            yourMoves.push([discardedMoves[discardedMoves.length - 1][0], discardedMoves[discardedMoves.length - 1][1]]);
            discardedMoves.pop();
        }
        else {
            board[discardedMoves[discardedMoves.length - 1][0]][discardedMoves[discardedMoves.length - 1][1]].innerHTML = piece1;
            board[otherDiscardedMoves[otherDiscardedMoves.length - 1][0]][otherDiscardedMoves[otherDiscardedMoves.length - 1][1]].innerHTML = piece2;
            yourMoves.push([discardedMoves[discardedMoves.length - 1][0], discardedMoves[discardedMoves.length - 1][1]]);
            otherMoves.push([otherDiscardedMoves[otherDiscardedMoves.length - 1][0], otherDiscardedMoves[otherDiscardedMoves.length - 1][1]]);
            discardedMoves.pop();
            otherDiscardedMoves.pop();
        }

        twoPlayerMode(piece1, piece2);
        console.log(yourMoves);
        console.log(otherMoves);
        console.log("Discarded Moves: ");
        console.log(discardedMoves);
        console.log(otherDiscardedMoves);
        console.log("\n");
    }
}

export function showHistory() {
    let declareWinner = document.getElementById("wldcont");
    let turnDisplay = document.getElementById("player-turn-text");
    historyButton.onclick = () => {
        turnDisplay.innerHTML = "";
        declareWinner.style.display = "none";
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                if (board[i][j].innerHTML === "") {
                    board[i][j].onclick = false;
                }
            }
        }
    }
}
