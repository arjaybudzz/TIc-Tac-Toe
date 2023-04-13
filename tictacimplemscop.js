import {move, reset, playAgain, undo, redo, twoPlayerMode, playAgainTwoPlayers, resetForTwoPlayers, undoForTwoPlayers, clearBoard, redoForTwoPlayers,showHistory} from "./tictacfuncscop.js"

import {diffMode, undoDifficultMode, redoDifficultMode, resetDifficultMode, playAgainDifficultMode, } from "./difficultMode.js"

const piece = 'X';
const piece2 = 'O';

let onePlayer = document.getElementById("one");
let twoPlayer = document.getElementById("two");


let mainMenu = document.getElementById("interface");
let selectionMenu = document.getElementById("piece-selection");
let yourPiece = document.getElementById("piece-one");
let otherPiece = document.getElementById("piece-two");
let playGround = document.getElementById("main-interface");
let quitButton = document.getElementById("mainmenu");
let declareWinner = document.getElementById("wldcont");



let easyAI = document.getElementById("easy");
let difficultAI = document.getElementById("difficult");

easyMode();

function easyMode() {
    onePlayer.onclick = () => {
        mainMenu.style.display = "none";
        selectionMenu.style.display = "flex";

        yourPiece.onclick = () => {
            selectionMenu.style.display = "none";
            playGround.style.display = "flex";
            move(piece, piece2);
            playAgain(piece, piece2);
            redo(piece, piece2);
            reset(piece, piece2);
            undo(piece, piece2);
            showHistory();
        }

        otherPiece.onclick = () => {
            selectionMenu.style.display = "none";
            playGround.style.display = "flex";
            move(piece2, piece);
            redo(piece2, piece);
            playAgain(piece2, piece);
            reset(piece2, piece);
            undo(piece2, piece);
            showHistory();
        }
    }
}

easyAI.onclick = () => {
    if (difficultAI.style.backgroundColor === "yellow") {
        difficultAI.style.backgroundColor = "red";
        difficultAI.style.color = "white";
        easyAI.style.backgroundColor = "yellow";
        easyAI.style.color = "black";
        easyMode();
    }
    else {
        easyAI.style.backgroundColor = "yellow";
        easyAI.style.color = "black";
        easyMode();
    }
}

difficultAI.onclick = () => {
    if (easyAI.style.backgroundColor === "yellow") {
        easyAI.style.backgroundColor = "green";
        easyAI.style.color = "white";
        difficultAI.style.backgroundColor = "yellow";
        difficultAI.style.color = "black";
        hardMode();
    }
    else {
        difficultAI.style.backgroundColor = "yellow";
        difficultAI.style.color = "black";
        hardMode();
    }
}

function hardMode() {
    onePlayer.onclick = () => {
        mainMenu.style.display = "none";
        selectionMenu.style.display = "flex";

        yourPiece.onclick = () => {
            selectionMenu.style.display = "none";
            playGround.style.display = "flex";
            diffMode(piece, piece2);
            playAgainDifficultMode(piece, piece2);
            redoDifficultMode(piece, piece2);
            resetDifficultMode(piece, piece2);
            undoDifficultMode(piece, piece2);
            showHistory();
        }

        otherPiece.onclick = () => {
            selectionMenu.style.display = "none";
            playGround.style.display = "flex";
            diffMode(piece2, piece);
            playAgainDifficultMode(piece2, piece);
            redoDifficultMode(piece2, piece);
            resetDifficultMode(piece2, piece);
            undoDifficultMode(piece2, piece);
            showHistory();
        }
    }
}

twoPlayer.onclick = () => {
    mainMenu.style.display = "none";
    selectionMenu.style.display = "flex";

        yourPiece.onclick = () => {
            selectionMenu.style.display = "none";
            playGround.style.display = "flex";
            twoPlayerMode(piece, piece2);
            playAgainTwoPlayers(piece, piece2);
            redoForTwoPlayers(piece, piece2);
            resetForTwoPlayers(piece, piece2);
            undoForTwoPlayers(piece, piece2);
            showHistory();
        }

        otherPiece.onclick = () => {
            selectionMenu.style.display = "none";
            playGround.style.display = "flex";
            twoPlayerMode(piece2, piece);
            redoForTwoPlayers(piece2, piece);
            playAgainTwoPlayers(piece2, piece);
            resetForTwoPlayers(piece2, piece);
            undoForTwoPlayers(piece2, piece);
            showHistory();
        }
}

quitButton.onclick = () => {
    clearBoard();
    declareWinner.style.display = "none";
    playGround.style.display = "none";
    mainMenu.style.display = "flex";
}

window.onload = () => {
    let soundTrack = document.getElementById("main-song");
    let initialVolume = 0.005;
    setInterval(function(){
        soundTrack.volume = initialVolume;
        initialVolume += 0.005;
    }, 1000);
}

let returnButton = document.getElementById("return");

returnButton.onclick = () => {
    mainMenu.style.display = "flex";
    selectionMenu.style.display = "none";
}

showOptions();

function showOptions() {
    let optionsButton = document.getElementById("options");
    let optionSection = document.getElementById("options-container");
    optionsButton.onclick = () => {
        optionSection.style.display = "flex";
    }
}

backButton();

function backButton() {
    let back = document.getElementById("back-button");
    let optionSection = document.getElementById("options-container");
    back.onclick = () => {
        optionSection.style.display = "none";
    }
}

songModify();

function songModify() {
    let soundTrack = document.getElementById("main-song");
    let onButton = document.getElementById("play");
    let offButton = document.getElementById("pause");

    onButton.onclick = () => {
        if (offButton.style.backgroundColor === "yellow") {
            offButton.style.backgroundColor = "red";
            offButton.style.color = "white";
            onButton.style.backgroundColor = "yellow";
            onButton.style.color = "black";
        }
        else {
            onButton.style.backgroundColor = "yellow";
            onButton.style.color = "black";
        }
        soundTrack.play();
    }
    offButton.onclick = () => {
        if (onButton.style.backgroundColor === "yellow") {
            onButton.style.backgroundColor = "green";
            onButton.style.color = "white";
            offButton.style.backgroundColor = "yellow";
            offButton.style.color = "black";
        }
        else {
            offButton.style.backgroundColor = "yellow";
            offButton.style.color = "black";
        }
        soundTrack.pause();
    }
}

instructionsView();

function instructionsView() {
    let instructContainer = document.getElementById("instructions-container");
    let backButton2 = document.getElementById("back-button2");
    let helpButton = document.getElementById("help");
    helpButton.onclick = () => {
        instructContainer.style.display = "flex";
    }
    backButton2.onclick = () => {
        instructContainer.style.display  ="none";
    }

}
