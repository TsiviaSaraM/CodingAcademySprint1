'use strict'
initializeLocalStorage();
//initialize local storage if it is not already in use
function initializeLocalStorage(){
    if (typeof(Storage) !== "undefined") {
        if (!localStorage.scoreEasy) localStorage.scoreEasy = 0;
        if (!localStorage.scoreMedium) localStorage.scoreMedium = 0;
        if (!localStorage.scoreHard) localStorage.scoreHard = 0;
      } else {
        alert('local storage not supported');
    }
}

function checkBestScore() {
    var score = 100000 - gGame.secsPassed;
    if (gLevel.NAME === 'easy' && score > localStorage.scoreEasy) {
        localStorage.scoreEasy = score; debugger;
        document.querySelector('.easy-score').innerText = localStorage.scoreEasy;
    } else if (gLevel.NAME === 'medium' && score > localStorage.scoreMedium) {
        localStorage.scoreMedium = score;
        document.querySelector('.medium-score').innerText = localStorage.scoreMedium;
    } else if (gLevel.NAME === 'hard' && score > localStorage.scoreHard) {
        localStorage.scoreHard = score;
        document.querySelector('.hard-score').innerText = localStorage.scoreHard;
    } 
    console.log(localStorage);
}





