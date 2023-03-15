
/*******************************************************************************
 * *************************SCRIPT FOR MOMENTUM APP*****************************
 *  Notes:                                                                     *
 *  1. The concept of my code for to do list is referenced to                  *
 *  w3schools.com. I have added some modifications to the script and some      *
 *  features like it can be dragged anywhere.                                  *
 *  2. The javascript code for weather api is in a different file named        *
 *  weather.js.                                                                *
 *  Weather api source: https://api.openweathermap.org/data/2.5/weather?       *
 *                  THIS IS A WORK IN PROGRESS                                 *
 * *****************************************************************************/

/**********************Function for Intro and greeting***********************/

function greet() {
    let startButton = document.getElementById("start-button");
    let greetDisplay = document.getElementById("greeting");
    let introContainer = document.getElementById("intro");
    let chronoDisp = document.getElementById("chrono");
    let timeGreet = ["Good Morning, ", "Good Afternoon, ", "Good Evening, "];
    let statement = "";
    let timeToday = new Date();
    //get individual values.
    let hr = timeToday.getHours();

    if (hr < 12) {
        statement = timeGreet[0];
    }
    else if (hr >= 12 || hr < 6) {
        statement = timeGreet[1];
    }
    else {
        statement = timeGreet[2];
    }

    startButton.onclick = () => {
        if (document.getElementById("name").value === "") {
            alert("Please enter your name.");
        }
        introContainer.style.display = "none";
        chronoDisp.style.display = "flex";
        greetDisplay.innerHTML = statement + document.getElementById("name").value;
    }
}

greet();

//------------------End of Script for intro and greeting----------------------//

/**********************Script for displaying time and date**********************/

setInterval(displayTime, 1000);

function displayTime() {
    let timeDisplay = document.getElementById("time");
    let timeToday = new Date();
    //get individual values.
    let hr = timeToday.getHours();
    let min = timeToday.getMinutes();
    let sec = timeToday.getSeconds();

    hr = hr < 10? "0" + hr : hr;
    min = min < 10? "0" + min : min;
    sec = sec < 10? "0" + sec : sec;

    //Time display is in 24hr format.
    timeDisplay.innerHTML = hr + ':' + min + ':' + sec;
}

displayTime();

function displayDate() {
    let todayDisp = document.getElementById("date");
    let today = new Date;
    let month = today.getMonth();
    let day = today.getDate();
    let year = today.getFullYear();
    let monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthName = monthList[month];
    day = (day < 10) ? "0" + day : day;
    todayDisp.innerHTML = monthName + " " + day + ", " + year;
}

displayDate();

/*--------------End of Script for displaying time and date-------------------*/

/*****************Function for looping background*****************************/

function displayImg() {
    let images = document.getElementById("chrono");
    let imgSelection = ["url('images/hammock.jpg')", "url('images/pebbles.jpg')", "url('images/two chairs.jpg')", "url('images/girl.jpg')", "url('images/river.jpg')", "url('images/three chairs.jpg')"];
    let num = 0;
    let numImg = imgSelection.length;

    setInterval(function() {
        images.style.backgroundImage = imgSelection[num++];
        if (num === numImg) {
            num = 0;    //refreshes num if reached limit.
        }
    }, 60000);  //loop for 60 seconds as per requirement

}

displayImg();

//-------------End of script for looping background image---------------------//

/****************************Script for to do list*****************************/

let addButton = document.querySelector(".add");

// Create a "close" button and append it to each list item
let myNodelist = document.getElementsByTagName("LI");

for (let i = 0; i < myNodelist.length; i++) {
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
let close = document.getElementsByClassName("close");

for (let i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    let div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
let list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

//This function creates a new list when add button is pressed.
function addTask() {
    let newList = document.createElement("li");
    let taskInput = document.getElementById("task-input").value;
    let added = document.createTextNode(taskInput);
    newList.appendChild(added);
    if (taskInput === "") {
        alert("Please Input your task.");
    }
    else {
        document.getElementById("task-lists").appendChild(newList);
    }
    document.getElementById("task-input").value = "";


    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    newList.appendChild(span);

    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            let thisDiv = this.parentElement;
            thisDiv.style.display = "none";
        }
    }
}

addButton.addEventListener('click', addTask);

//--------------------End of script for to do list---------------------------//

//*****************This script is for displaying quotes*********************//

function displayQuotes() {
    let quoteDisp = document.getElementById("quote-text");
    let quoteLists = ["\"Don't stop just because you're tired, stop when you're done.\"", "\"Life is about making an impact, not making an income.\"", "\"Whatever the mind of man can conceive and believe, it can achieve.\"", "\"Strive not to be a success, but rather to be of value.\"", "\"Two roads diverged in a wood, and I took the one less traveled by, And it has made all the difference.\"", "\"I attribute my success to this: I never gave or took any excuse.\"", "\"Work hard in silence, let the success be the noise!\""];
    let currList = 0;
    let numQuotes = quoteLists.length;
    setInterval(function() {

        quoteDisp.innerHTML = quoteLists[currList++];
        if (currList === numQuotes) {
            currList = 0;
        }
    }, 5000);
}

displayQuotes();

//-----------------End of script for displaying quotes------------------------//


//*********************Script for dragging elements***************************//

let draggedElem = null;

function dragMove(id) {
    let toDoWidget = document.getElementById("to-do-list");
    //this function works when mouse is clicked
    document.onmousedown = function() {
        draggedElem = toDoWidget;
        toDoWidget.style.zIndex = 100000;
    }
}

document.onmouseup = function(e) {
    draggedElem = null; //stop following cursor after the mouse is not pressed
}

//this function allows the cursor to stay in the div when dragging
document.onmousemove = function(e) {
    let x = e.clientX;
    let y = e.clientY;
    draggedElem.style.top = y - draggedElem.offsetHeight/2 + "px";
    draggedElem.style.left = x - draggedElem.offsetWidth/2 + "px";
}

window.onload = dragMove;

//----------------End of script for dragging elements----------------------//
