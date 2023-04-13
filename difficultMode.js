
import { showHistory } from "./tictacfuncscop.js";

let board = [];

let square = document.getElementsByClassName("squares");
let turnDisplay = document.getElementById("player-turn-text");
board.push([square[0], square[1], square[2]]);
board.push([square[3], square[4], square[5]]);
board.push([square[6], square[7], square[8]]);
let yourMoves = [];
let otherMoves = [];
let discardedMoves = [];
let otherDiscardedMoves = [];
let readAllMoves = [];
console.log(board);

export function diffMode(piece, piece2) {
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
                smartComp(piece, piece2);
                turnDisplay.innerHTML = "Computer's turn.";
            }
        }
    }
}

function smartComp(piece, piece2) {
    if (freeSquares() > 0) {
        setTimeout(() => {
            turnDisplay.innerHTML = "Your turn.";
            if (areRowSame(piece) && !areColumnSame(piece) && !areDiagonalSame(piece)) {
                checkRows(piece, piece2);
            }
            else if (!areRowSame(piece) && areColumnSame(piece) && !areDiagonalSame(piece)) {
                checkColumn(piece, piece2);
            }
            else if (!areRowSame(piece) && !areColumnSame(piece) && areDiagonalSame(piece)) {
                checkDiagonal(piece, piece2);
            }
            else if (areRowSame(piece) && areColumnSame(piece) && !areDiagonalSame(piece)) {
                let randFunc = Math.floor(Math.random() * 2);
                switch(randFunc) {
                    case 0:
                        checkRows(piece, piece2);
                        break;
                    case 1:
                        checkColumn(piece, piece2);
                        break;
                }
            }
            else if (areRowSame(piece) && !areColumnSame(piece) && areDiagonalSame(piece)) {
                let randFunc = Math.floor(Math.random() * 2);
                switch(randFunc) {
                    case 0:
                        checkRows(piece, piece2);
                        break;
                    case 1:
                        checkDiagonal(piece, piece2);
                }
            }
            else if (!areRowSame(piece) && areColumnSame(piece) && areDiagonalSame(piece)) {
                let randFunc = Math.floor(Math.random() * 2);
                switch(randFunc) {
                    case 0:
                        checkColumn(piece, piece2);
                        break;
                    case 1:
                        checkDiagonal(piece, piece2);
                        break;
                }

            }
            else if (areRowSame(piece) && areColumnSame(piece) && areDiagonalSame(piece)) {
                let randFunc = Math.floor(Math.random() * 3);
                switch(randFunc) {
                    case 0:
                        checkRows(piece, piece2);
                        break;
                    case 1:
                        checkColumn(piece, piece2);
                        break;
                    case 2:
                        checkDiagonal(piece, piece2);
                        break;
                }
            }
            else {
                compMove(piece2);
            }
        }, 3000);
    }
}

function backWardDiagonalCheck(piece) {
    if (board[0][0].innerHTML === piece) {
        if ((board[0][0].innerHTML === board[2][2].innerHTML) && (board[1][1].innerHTML === "")) {
            return true;
        }
        else if ((board[0][0].innerHTML === board[1][1].innerHTML) && (board[2][2].innerHTML === "")) {
            return true;
        }
    }

    if (board[1][1].innerHTML === piece) {
        if ((board[1][1].innerHTML === board[0][0].innerHTML) && (board[2][2].innerHTML === "")) {
            return true;
        }
        else if ((board[1][1].innerHTML === board[2][2].innerHTML) && (board[0][0].innerHTML === "")) {
            return true;
        }
    }

    if (board[2][2].innerHTML === piece) {
        if ((board[2][2].innerHTML === board[1][1].innerHTML) && (board[0][0].innerHTML === "")) {
            return true;
        }
        else if ((board[2][2].innerHTML === board[0][0].innerHTML) && (board[1][1].innerHTML === "")) {
            return true;
        }
    }

    return false;
}

function forwardDiagonalCheck(piece) {
    if (board[0][2].innerHTML === piece) {
        if ((board[0][2].innerHTML === board[1][1].innerHTML) && (board[2][0].innerHTML === "")) {
            return true;
        }
        else if ((board[0][2].innerHTML === board[2][0].innerHTML) && (board[1][1].innerHTML)) {
            return true;
        }
    }

    if (board[1][1].innerHTML === piece) {
        if ((board[1][1].innerHTML === board[2][0].innerHTML) && (board[0][2].innerHTML === "")) {
            return true;
        }
        else if ((board[1][1].innerHTML === board[0][2].innerHTML) && (board[2][0].innerHTML === "")) {
            return true;
        }
    }

    if (board[2][0].innerHTML === piece) {
        if ((board[2][0].innerHTML === board[1][1].innerHTML) && (board[0][2].innerHTML)) {
            return true;
        }
        else if ((board[2][0].innerHTML === board[0][2].innerHTML) && (board[1][1].innerHTML === "")) {
            return true;
        }
    }

    return false;
}

function checkDiagonal(piece, piece2) {
    if (!forwardDiagonalCheck(piece) && backWardDiagonalCheck(piece)) {
        for (let i = 0; i < 3; ++i) {
            if (board[i][i].innerHTML === "") {
                board[i][i].innerHTML = piece2;
                otherMoves.push([i, i]);
                board[i][i].onclick = false;
                break;
            }
        }
    }
    else if (forwardDiagonalCheck(piece) && !backWardDiagonalCheck(piece)) {
        for (let i = 0; i < 3; ++i) {
            if (board[i][2 - i].innerHTML === "") {
                board[i][2 - i].innerHTML = piece2;
                otherMoves.push([i, 2 - i]);
                board[i][2 - i].onclick = false;
                break;
            }
        }
    }
    else if (forwardDiagonalCheck(piece) && backWardDiagonalCheck(piece)) {
        let randFunc = Math.floor(Math.random() * 2);
        switch(randFunc) {
            case 0:
                for (let i = 0; i < 3; ++i) {
                    if (board[i][2 - i].innerHTML === "") {
                        board[i][2 - i].innerHTML = piece2;
                        otherMoves.push([i, 2 - i]);
                        board[i][2 - i].onclick = false;
                        break;
                    }
                }
                break;
            case 1:
                for (let i = 0; i < 3; ++i) {
                    if (board[i][i].innerHTML === "") {
                        board[i][i].innerHTML = piece2;
                        otherMoves.push([i, i]);
                        board[i][i].onclick = false;
                        break;
                    }
                }
                break;
        }
    }
    readAllMoves.push(piece2);
    checkWinner(piece2, "You Lose!");
}

function firstColumnCheck(piece) {
    if (board[0][0].innerHTML === piece) {
        if ((board[0][0].innerHTML === board[1][0].innerHTML) && (board[2][0].innerHTML === "")) {
            return true;
        }
        else if ((board[0][0].innerHTML === board[2][0].innerHTML) && (board[1][0].innerHTML === "")) {
            return true;
        }
    }

    if (board[1][0].innerHTML === piece) {
        if ((board[1][0].innerHTML === board[0][0].innerHTML) && (board[2][0].innerHTML === "")) {
            return true;
        }
        else if ((board[1][0].innerHTML === board[2][0].innerHTML) && (board[0][0].innerHTML === "")) {
            return true;
        }
    }

    if (board[2][0].innerHTML === piece) {
        if ((board[2][0].innerHTML === board[0][0].innerHTML) & (board[1][0].innerHTML === "")) {
            return true;
        }
        else if ((board[2][0].innerHTML === board[1][0].innerHTML) && (board[0][0].innerHTML === "")) {
            return true;
        }
    }

    return false;
}

function secondColumnCheck(piece) {
    if (board[0][1].innerHTML === piece) {
        if ((board[0][1].innerHTML === board[1][1].innerHTML) && (board[2][1].innerHTML === "")) {
            return true;
        }
        else if ((board[0][1].innerHTML === board[2][1].innerHTML) && (board[1][1].innerHTML === "")) {
            return true;
        }
    }

    if (board[1][1].innerHTML === piece) {
        if ((board[1][1].innerHTML === board[0][1].innerHTML) && (board[2][1].innerHTML === "")) {
            return true;
        }
        else if ((board[1][1].innerHTML === board[2][1].innerHTML) && (board[0][1].innerHTML === "")) {
            return true;
        }
    }

    if (board[2][1].innerHTML === piece) {
        if ((board[2][1].innerHTML === board[0][1].innerHTML) & (board[1][1].innerHTML === "")) {
            return true;
        }
        else if ((board[2][1].innerHTML === board[1][1].innerHTML) && (board[0][1].innerHTML === "")) {
            return true;
        }
    }

    return false;
}

function thirdColumnCheck(piece) {
    if (board[0][2].innerHTML === piece) {
        if ((board[0][2].innerHTML === board[1][2].innerHTML) && (board[2][2].innerHTML === "")) {
            return true;
        }
        else if ((board[0][2].innerHTML === board[2][2].innerHTML) && (board[1][2].innerHTML === "")) {
            return true;
        }
    }

    if (board[1][2].innerHTML === piece) {
        if ((board[1][2].innerHTML === board[0][2].innerHTML) && (board[2][2].innerHTML === "")) {
            return true;
        }
        else if ((board[1][2].innerHTML === board[2][2].innerHTML) && (board[0][2].innerHTML === "")) {
            return true;
        }
    }

    if (board[2][2].innerHTML === piece) {
        if ((board[2][2].innerHTML === board[0][2].innerHTML) & (board[1][2].innerHTML === "")) {
            return true;
        }
        else if ((board[2][2].innerHTML === board[1][2].innerHTML) && (board[0][2].innerHTML === "")) {
            return true;
        }
    }

    return false;
}

function checkColumn(piece, piece2) {
    if (firstColumnCheck(piece) && !secondColumnCheck(piece) && !thirdColumnCheck(piece)) {
        for (let i = 0; i < 3; ++i) {
            if (board[i][0].innerHTML === "") {
                board[i][0].innerHTML = piece2;
                otherMoves.push([i, 0]);
                board[i][0].onclick = false;
                break;
            }
        }
    }
    else if (!firstColumnCheck(piece) && secondColumnCheck(piece) && !thirdColumnCheck(piece)) {
        for (let i = 0; i < 3; ++i) {
            if (board[i][1].innerHTML === "") {
                board[i][1].innerHTML = piece2;
                otherMoves.push([i, 1]);
                board[i][1].onclick = false;
                break;
            }
        }
    }
    else if (!firstColumnCheck(piece) && !secondColumnCheck(piece) && thirdColumnCheck(piece)) {
        for (let i = 0; i < 3; ++i) {
            if (board[i][2].innerHTML === "") {
                board[i][2].innerHTML = piece2;
                otherMoves.push([i, 2]);
                board[i][2].onclick = false;
                break;
            }
        }
    }
    else if (firstColumnCheck(piece) && secondColumnCheck(piece) && !thirdColumnCheck(piece)) {
        let randFunc = Math.floor(Math.random() * 2);
        switch(randFunc) {
            case 0:
                for (let i = 0; i < 3; ++i) {
                    if (board[i][0].innerHTML === "") {
                        board[i][0].innerHTML = piece2;
                        otherMoves.push([i, 0]);
                        board[i][0].onclick = false;
                        break;
                    }
                }
                break;
            case 1:
                for (let i = 0; i < 3; ++i) {
                    if (board[i][1].innerHTML === "") {
                        board[i][1].innerHTML = piece2;
                        otherMoves.push([i, 1]);
                        board[i][1].onclick = false;
                        break;
                    }
                }
                break;
        }
    }
    else if (firstColumnCheck(piece) && !secondColumnCheck(piece) && thirdColumnCheck(piece)) {
        let randFunc = Math.floor(Math.random() * 2);
        switch(randFunc) {
            case 0:
                for (let i = 0; i < 3; ++i) {
                    if (board[i][0].innerHTML === "") {
                        board[i][0].innerHTML = piece2;
                        otherMoves.push([i, 0]);
                        board[i][0].onclick = false;
                        break;
                    }
                }
                break;
            case 1:
                for (let i = 0; i < 3; ++i) {
                    if (board[i][2].innerHTML === "") {
                        board[i][2].innerHTML = piece2;
                        otherMoves.push([i, 2]);
                        board[i][2].onclick = false;
                        break;
                    }
                }
                break;
        }
    }
    else if (firstColumnCheck(piece) && secondColumnCheck(piece) && thirdColumnCheck(piece)) {
        let randFunc = Math.floor(Math.random() * 3);
        switch(randFunc) {
            case 0:
                for (let i = 0; i < 3; ++i) {
                    if (board[i][0].innerHTML === "") {
                        board[i][0].innerHTML = piece2;
                        otherMoves.push([i, 0]);
                        board[i][0].onclick = false;
                        break;
                    }
                }
                break;
            case 1:
                for (let i = 0; i < 3; ++i) {
                    if (board[i][1].innerHTML === "") {
                        board[i][1].innerHTML = piece2;
                        otherMoves.push([i, 1]);
                        board[i][1].onclick = false;
                        break;
                    }
                }
                break;
            case 2:
                for (let i = 0; i < 3; ++i) {
                    if (board[i][2].innerHTML === "") {
                        board[i][2].innerHTML = piece2;
                        otherMoves.push([i, 2]);
                        board[i][2].onclick = false;
                        break;
                    }
                }
                break;
        }
    }

    readAllMoves.push(piece2);
    checkWinner(piece2, "You Lose!");
}


function firstRowCheck(piece) {
    if (board[0][0].innerHTML === piece) {
        if ((board[0][0].innerHTML === board[0][1].innerHTML) && (board[0][2].innerHTML === "")) {
            return true;
        }
        else if ((board[0][0].innerHTML === board[0][2].innerHTML) && (board[0][1].innerHTML === "")) {
            return true;
        }
    }

    if (board[0][1].innerHTML === piece) {
        if ((board[0][1].innerHTML === board[0][0].innerHTML) && (board[0][2].innerHTML === "")) {
            return true;
        }
        else if ((board[0][1].innerHTML === board[0][2].innerHTML) && (board[0][0].innerHTML === "")) {
            return true;
        }
    }

    if (board[0][2].innerHTML === piece) {
        if ((board[0][2].innerHTML === board[0][1].innerHTML) && (board[0][0].innerHTML === "")) {
            return true;
        }
        else if ((board[0][2].innerHTML === board[0][0].innerHTML) && (board[0][1].innerHTML === "")) {
            return true;
        }
    }

    return false;
}

function secondRowCheck(piece) {
    if (board[1][0].innerHTML === piece) {
        if ((board[1][0].innerHTML === board[1][1].innerHTML) && (board[1][2].innerHTML === "")) {
            return true;
        }
        else if ((board[1][0].innerHTML === board[1][2].innerHTML) && (board[1][1].innerHTML === "")) {
            return true;
        }
    }

    if (board[1][1].innerHTML === piece) {
        if ((board[1][1].innerHTML === board[1][0].innerHTML) && (board[1][2].innerHTML === "")) {
            return true;
        }
        else if ((board[1][1].innerHTML === board[1][2].innerHTML) && (board[1][0].innerHTML === "")) {
            return true;
        }
    }

    if (board[1][2].innerHTML === piece) {
        if ((board[1][2].innerHTML === board[1][1].innerHTML) && (board[1][0].innerHTML === "")) {
            return true;
        }
        else if ((board[1][2].innerHTML === board[1][0].innerHTML) && (board[1][1].innerHTML === "")) {
            return true;
        }
    }

    return false;
}


function thirdRowCheck(piece) {
    if (board[2][0].innerHTML === piece) {
        if ((board[2][0].innerHTML === board[2][1].innerHTML) && (board[2][2].innerHTML === "")) {
            return true;
        }
        else if ((board[2][0].innerHTML === board[2][2].innerHTML) && (board[2][1].innerHTML === "")) {
            return true;
        }
    }

    if (board[2][1].innerHTML === piece) {
        if ((board[2][1].innerHTML === board[2][0].innerHTML) && (board[2][2].innerHTML === "")) {
            return true;
        }
        else if ((board[2][1].innerHTML === board[2][2].innerHTML) && (board[2][0].innerHTML === "")) {
            return true;
        }
    }

    if (board[2][2].innerHTML === piece) {
        if ((board[2][2].innerHTML === board[2][1].innerHTML) && (board[2][0].innerHTML === "")) {
            return true;
        }
        else if ((board[2][2].innerHTML === board[2][0].innerHTML) && (board[2][1].innerHTML === "")) {
            return true;
        }
    }

    return false;
}



function checkRows(piece, piece2) {
    if (firstRowCheck(piece) && !secondRowCheck(piece) && !thirdRowCheck(piece)) {
        for (let i = 0; i < 3; ++i) {
            if (board[0][i].innerHTML === "") {
                board[0][i].innerHTML = piece2;
                otherMoves.push([0, i]);
                board[0][i].onclick = false;
                break;
            }
        }
    }

    else if (!firstRowCheck(piece) && secondRowCheck(piece) && !thirdRowCheck(piece)) {
        for (let i = 0; i < 3; ++i) {
            if (board[1][i].innerHTML === "") {
                board[1][i].innerHTML = piece2;
                otherMoves.push([1, i]);
                board[1][i].onclick = false;
                break;
            }
        }
    }

    else if (!firstRowCheck(piece) && !secondRowCheck(piece) && thirdRowCheck(piece)) {
        for (let i = 0; i < 3; ++i) {
            if (board[2][i].innerHTML === "") {
                board[2][i].innerHTML = piece2;
                otherMoves.push([2, i]);
                board[2][i].onclick = false;
                break;
            }
        }
    }

    else if (firstRowCheck(piece) && secondRowCheck(piece) && !thirdRowCheck(piece)) {
        let randFunc = Math.floor(Math.random() * 2);
        switch(randFunc) {
            case 0:
                for (let i = 0; i < 3; ++i) {
                    if (board[0][i].innerHTML === "") {
                        board[0][i].innerHTML = piece2;
                        otherMoves.push([0, i]);
                        board[0][i].onclick = false;
                        break;
                    }
                }
                break;
            case 1:
                for (let i = 0; i < 3; ++i) {
                    if (board[0][i].innerHTML === "") {
                        board[0][i].innerHTML = piece2;
                        otherMoves.push([0, i]);
                        board[0][i].onclick = false;
                        break;
                    }
                }
                break;
        }
    }
    else if (firstRowCheck(piece) && !secondRowCheck(piece) && thirdRowCheck(piece)) {
        let randFunc = Math.floor(Math.random() * 2);
        switch(randFunc) {
            case 0:
                for (let i = 0; i < 3; ++i) {
                    if (board[0][i].innerHTML === "") {
                        board[0][i].innerHTML = piece2;
                        otherMoves.push([0, i]);
                        board[0][i].onclick = false;
                        break;
                    }
                }
                break;
            case 1:
                for (let i = 0; i < 3; ++i) {
                    if (board[2][i].innerHTML === "") {
                        board[2][i].innerHTML = piece2;
                        otherMoves.push([2, i]);
                        board[2][i].onclick = false;
                        break;
                    }
                }
                break;
        }
    }
    else if (!firstRowCheck(piece) && secondRowCheck(piece) && thirdRowCheck(piece)) {
        let randFunc = Math.floor(Math.random() * 2);
        switch(randFunc) {
            case 0:
                for (let i = 0; i < 3; ++i) {
                    if (board[1][i].innerHTML === "") {
                        board[1][i].innerHTML = piece2;
                        otherMoves.push([1, i]);
                        board[1][i].onclick = false;
                        break;
                    }
                }
                break;
            case 1:
                for (let i = 0; i < 3; ++i) {
                    if (board[2][i].innerHTML === "") {
                        board[2][i].innerHTML = piece2;
                        otherMoves.push([2, i]);
                        board[2][i].onclick = false;
                        break;
                    }
                }
                break;
        }
    }
    else if (firstRowCheck(piece) && secondRowCheck(piece) && thirdRowCheck(piece)) {
        let randFunc = Math.floor(Math.random() * 3);
        switch(randFunc) {
            case 0:
                for (let i = 0; i < 3; ++i) {
                    if (board[0][i].innerHTML === "") {
                        board[0][i].innerHTML = piece2;
                        otherMoves.push([0, i]);
                        board[0][i].onclick = false;
                        break;
                    }
                }
                break;
            case 1:
                for (let i = 0; i < 3; ++i) {
                    if (board[1][i].innerHTML === "") {
                        board[1][i].innerHTML = piece2;
                        otherMoves.push([1, i]);
                        board[1][i].onclick = false;
                        break;
                    }
                }
                break;
            case 2:
                for (let i = 0; i < 3; ++i) {
                    if (board[2][i].innerHTML === "") {
                        board[2][i].innerHTML = piece2;
                        otherMoves.push([2, i]);
                        board[2][i].onclick = false;
                        break;
                    }
                }
                break;
        }
    }

    readAllMoves.push(piece2);
    checkWinner(piece2, "You Lose!");
}

function areRowSame(piece) {
    for (let i = 0; i < 3; ++i) {
        if (board[i][0].innerHTML === piece) {
            if (board[i][0].innerHTML === board[i][1].innerHTML) {
                if (board[i][2].innerHTML === "") {
                    return true;
                }
            }
            if (board[i][0].innerHTML === board[i][2].innerHTML) {
                if (board[i][1].innerHTML === "") {
                    return true;
                }
            }
        }
    }

    for (let i = 0; i < 3; ++i) {
        if (board[i][1].innerHTML === piece) {
            if (board[i][1].innerHTML === board[i][0].innerHTML) {
                if (board[i][2].innerHTML === "") {
                    return true;
                }
            }
            if (board[i][1].innerHTML === board[i][2].innerHTML) {
                if (board[i][0].innerHTML === "") {
                    return true;
                }
            }
        }
    }

    for (let i = 0; i < 3; ++i) {
        if (board[i][2].innerHTML === piece) {
            if (board[i][2].innerHTML === board[i][1].innerHTML) {
                if (board[i][0].innerHTML === "") {
                    return true;
                }
            }
            if (board[i][2].innerHTML === board[i][0].innerHTML) {
                if (board[i][1].innerHTML === "") {
                    return true;
                }
            }
        }
    }

    return false;
}

function areColumnSame(piece) {

    for (let i = 0; i < 3; ++i) {
        if (board[0][i].innerHTML === piece) {
            if (board[0][i].innerHTML === board[1][i].innerHTML) {
                if (board[2][i].innerHTML === "") {
                    return true;
                }
            }

            if (board[0][i].innerHTML === board[2][i].innerHTML) {
                if (board[1][i].innerHTML === "") {
                    return true;
                }
            }
        }
    }

    for (let i = 0; i < 3; ++i) {
        if (board[1][i].innerHTML === piece) {
            if (board[1][i].innerHTML === board[0][i].innerHTML) {
                if (board[2][i].innerHTML === "") {
                    return true;
                }
            }

            if (board[1][i].innerHTML === board[2][i].innerHTML) {
                if (board[0][i].innerHTML === "") {
                    return true;
                }
            }
        }
    }

    for (let i = 0; i < 3; ++i) {
        if (board[2][i].innerHTML === piece) {
            if (board[2][i].innerHTML === board[1][i].innerHTML) {
                if (board[0][i].innerHTML === "") {
                    return true;
                }
            }

            if (board[2][i].innerHTML === board[0][i].innerHTML) {
                if (board[1][i].innerHTML === "") {
                    return true;
                }
            }
        }
    }
    return false;
}

function areDiagonalSame(piece) {
    if (board[0][0].innerHTML === piece) {
        if (board[0][0].innerHTML === board[1][1].innerHTML) {
            if (board[2][2].innerHTML === "") {
                return true;
            }
        }

        else if (board[0][0].innerHTML === board[2][2].innerHTML) {
            if (board[1][1].innerHTML === "") {
                return true;
            }
        }
    }

    if (board[0][2].innerHTML === piece) {
        if (board[0][2].innerHTML === board[2][0].innerHTML) {
            if (board[1][1].innerHTML === "") {
                return true;
            }
        }

        else if (board[0][2].innerHTML === board[1][1].innerHTML) {
            if (board[2][0].innerHTML === "") {
                return true;
            }
        }
    }

    if (board[1][1].innerHTML === piece) {
        if (board[1][1].innerHTML === board[0][0].innerHTML) {
            if (board[2][2].innerHTML === "") {
                return true;
            }
        }

        else if (board[1][1].innerHTML === board[2][2].innerHTML) {
            if (board[0][0].innerHTML === "") {
                return true;
            }
        }

        else if (board[1][1].innerHTML === board[2][0].innerHTML) {
            if (board[0][2].innerHTML === "") {
                return true;
            }
        }

        else if (board[1][1].innerHTML === board[0][2].innerHTML) {
            if (board[2][0].innerHTML === "") {
                return true;
            }
        }
    }

    if (board[2][0].innerHTML === piece) {
        if (board[2][0].innerHTML === board[1][1].innerHTML) {
            if(board[0][2].innerHTML === "") {
                return true;
            }
        }
        else if (board[2][0].innerHTML === board[0][2].innerHTML) {
            if(board[1][1].innerHTML === "") {
                return true;
            }
        }
    }

    if (board[2][2].innerHTML === piece) {
        if (board[2][2].innerHTML === board[1][1].innerHTML) {
            if (board[0][0].innerHTML === "") {
                return true;
            }
        }
        else if (board[2][2].innerHTML === board[0][0].innerHTML) {
            if (board[1][1].innerHTML === "") {
                return true;
            }
        }
    }

    return false;
}

function compMove(piece) {
    let row;
    let column;
    if (freeSquares() > 0) {
        do {
            row = Math.floor(Math.random() * 3);
            column = Math.floor(Math.random() * 3);
        } while (board[row][column].innerHTML != "");

        board[row][column].innerHTML = piece;
        console.log(board[row][column].innerHTML);
        board[row][column].onclick = false;
        otherMoves.push([row, column]);
        checkWinner(piece, "You Lose!");
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

    for (let i = 0; i < readAllMoves.length; ++i) {
        readAllMoves.pop();
    };
}


//restart button
export function resetDifficultMode(piece, piece2) {
    let resetButton = document.getElementById("restart");

    resetButton.onclick = () => {
        clearBoard();
        diffMode(piece, piece2);
    }
}

export function playAgainDifficultMode(piece, piece2) {
    let playAgainButton = document.getElementById("playagain");
    let declareWinner = document.getElementById("wldcont");
    playAgainButton.onclick = () => {
        declareWinner.style.display = "none";
        for (let i = 0; i < yourMoves.length; ++i) {
            yourMoves.pop();
        }
        for (let i = 0; i < otherMoves.length; ++i) {
            otherMoves.pop();
        }
        clearBoard();
        diffMode(piece, piece2);
        turnDisplay.innerHTML = "Your turn.";
    }
}

export function undoDifficultMode(piece1, piece2) {
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
        else {
            board[yourMoves[yourMoves.length - 1][0]][yourMoves[yourMoves.length - 1][1]].innerHTML = "";
            board[otherMoves[otherMoves.length - 1][0]][otherMoves[otherMoves.length - 1][1]].innerHTML = "";
            discardedMoves.push([yourMoves[yourMoves.length - 1][0], yourMoves[yourMoves.length - 1][1]]);
            otherDiscardedMoves.push([otherMoves[otherMoves.length - 1][0], otherMoves[otherMoves.length - 1][1]]);
            yourMoves.pop();
            otherMoves.pop();
            readAllMoves.pop();
            readAllMoves.pop();
        }
        diffMode(piece1, piece2);
    }
}

function clearBoard() {
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

export function redoDifficultMode(piece1, piece2) {
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
        diffMode(piece1, piece2);
    }
}
