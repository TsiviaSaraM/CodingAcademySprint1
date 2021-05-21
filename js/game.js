'use strict'

//TODO be consistent with if use elcell as param or get it from a function

const NORMAL_FACE = '😀';
const VICTORY_FACE = '😁';
const DEFEAT_FACE = '😦';

const VICTORY = true;
const DEFEAT = false;


var gGame = {
    isOn: false,
    isHintMode: false,
    currHint: 3,
    isSetMinesMode: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed:0,
    lives: 3
}

var gStates = [];
var gTimerIntervalId;

//this clears previous global variables and displays a new board
function init(){
    if (gTimerIntervalId) clearInterval(gTimerIntervalId);
    initGameObject();
    gStates = [];
    document.querySelector('.lives span').style.display = 'auto';
    renderHints();
    renderSmiley(NORMAL_FACE); 
    renderLevels();  
    gBoard = buildBoard();    
    renderBoard();
    
}

function initGameObject() {

    gGame = {
        isOn: true,
        isHintMode: false,
        currHint: 3,
        isSetMinesMode: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed:0,
        lives: 3
    }
}

//this starts the game
function cellClicked(i, j){
    console.log("handling left click");
    debugger;
    if (gGame.isSetMinesMode) {
        addMineManually(i, j);
        return;
    }
    if ((gBoard[i][j] && gBoard[i][j].isShown) || !gGame.isOn) return;
    if (!gGame.shownCount && gLevel.NAME !== 'manual') startGame(i, j);
    if (gGame.isHintMode) {
        showHint(i, j);
        return;
    }
       
    saveState();

    var cell = gBoard[i][j];
    var elCell = getCellElement(i, j);
    
    if (cell.isMine) {
        if (gGame.lives) {
            elCell.innerHTML = MINE;
            setTimeout(function() {elCell.innerHTML = '';}, 1000);

            removeLife();
            //TODO show the user the mine for 2 secs
        }
        else {
            
            endGame(DEFEAT); 
        }

        return;
    }

    showSurroundingCells(elCell, i, j);  
    if (checkGameOver()) endGame(true);
}

//uncovers adjacent cells
function showSurroundingCells(elCell, i, j) {
    gBoard[i][j].isShown = true; 
    gGame.shownCount++;
    renderCell(elCell, i, j);
    if (gBoard[i][j].minesAroundCount > 0) return;

    for (var x = i - 1; x <= i + 1; x++) {
        if (x < 0 || x >= gBoard.length) continue;
        for (var y = j - 1; y <= j+1; y++) {
            if (y < 0 || y >= gBoard.length || (x === i && y === j)) continue;
            if (gBoard[x][y].isMine || gBoard[x][y].isShown) continue;
    
            // gBoard[x][y].isShown = true; 
            // renderUncoveredCell(elCell, x, y);
           // if (gBoard[x][y].minesAroundCount === 0){
                showSurroundingCells(getCellElement(x, y), x, y);
                
           // }
           // gGame.shownCount++;

        }
    }
    if (checkGameOver()) endGame(true);
}

function cellMarked( i, j) {
    if (!gGame.isOn || gGame.isSetMinesMode) return;
    console.log("handling right click");
    var cell = gBoard[i][j];
    var elCell = getCellElement(i, j);
    if (cell.isShown) return;

    saveState();
    cell.isMarked = !cell.isMarked;
    cell.isMarked ? gGame.markedCount++ : gGame.markedCount--;
    renderCell(elCell, i, j);
    if (checkGameOver()) {
        endGame(VICTORY);
        return;
    }
}


function checkGameOver() {
    return gGame.markedCount === gLevel.MINES && gGame.shownCount === gLevel.SIZE * gLevel.SIZE - gLevel.MINES; //TODO try improve the logic here
}

function endGame(isVictory) {
    console.log("ending game");
    if (isVictory) checkBestScore();
    clearInterval(gTimerIntervalId);
    gGame.isOn = false;
    var smiley = isVictory ? VICTORY_FACE : DEFEAT_FACE;
    renderSmiley(smiley); //TODO maybe dont make separate function
    if (!isVictory) showAllMines();   

}

function startGame(startPosI, startPosJ) {
    
    addMinesToBoard(startPosI, startPosJ);  
    renderBoard();
    saveState();
    var startTime = new Date();
    gTimerIntervalId = setInterval(showTime, 1000, startTime);

}

//changes the level is the game is not playing
function setLevel(level) {
    //if (gGame.shownCount > 0 && gGame.isOn) return; //is the game is running
    gLevel.NAME = level;
    switch (level) {
        case 'easy':
            gLevel.SIZE = 4;
            gLevel.MINES = 2;
            break;
        case 'medium':
            gLevel.SIZE = 8;
            gLevel.MINES = 12;
            break;
        case 'hard':
            gLevel.SIZE = 12;
            gLevel.MINES = 30;
            break;
    }
    init();
}

function removeLife() {
    document.querySelector('.life-'+gGame.lives).style.display = 'none';
    gGame.lives--;
}

function showTime(startTime) {
    var now = new Date();
    gGame.secsPassed = Math.floor((now - startTime)/1000);
    document.querySelector(".timer").innerText = gGame.secsPassed;

}

function undo() {
    if (gStates.length === 0) {
        alert('no previous moves');
        return;
    }

    //reset state of model
    var prevState = gStates.pop();
    gBoard = prevState.board;
    gGame.markedCount = prevState.markedCount;
    gGame.shownCount = prevState.shownCount;
    gGame.lives = prevState.lives;

    //render to DOM
    renderBoard();
    document.querySelector('.life-'+gGame.lives).style.display = 'auto';
}

function saveState() {
    gStates.push({
        board: copyBoard(gBoard),
        shownCount: gGame.shownCount,
        markedCount: gGame.markedCount,
        lives: gGame.lives
    });
    //console.log('states', gStates);
    for (var i = 0; i < gStates.length; i++) {
    }
    
}

function restartGame() {
    endGame(false);
    init();
}

function showSafe(elBtn) {
    if (!gGame.isOn) return;
    var cellLocation = getRandomCoveredCell(gBoard);
    var elCell = getCellElement(cellLocation.i, cellLocation.j);
    elCell.className = 'safe';

    setTimeout(function() {
        elCell.className = 'covered';
        //elCell.style.backgroundColor = 'purple';
    }, 1000);
}

function setHintMode(elHint) {
    if (!gGame.isOn) return;

    if ('' + gGame.currHint !== elHint.getAttribute('data-id')) {
        alert('please use the hints in the correct order');
        return;
    }
    elHint.style.backgroundColor = 'yellow';
    gGame.isHintMode = true;

}

function showHint(i, j) {
    console.log('showing hint');
    for (var x = i - 1; x <= i + 1; x++) {
        if (x < 0 || x >= gBoard.length) continue;
        for (var y = j - 1; y <= j+1; y++) {
            if (y < 0 || y >= gBoard.length) continue;

            if (!gBoard[x][y].isShown) {
                var elCell = getCellElement(x, y);
                elCell.innerHTML = getCellContent(x,y);
                elCell.className = "hinted";
                setTimeout(unhintCell, 2000, elCell, x, y); 
                           
            }

        }
    }
    var elHint = document.querySelector(`[data-id="${gGame.currHint}"]`);
                elHint.style.display = 'none';
                gGame.currHint--; 
}

function unhintCell(elCell, i, j) {
    renderCell(elCell, i, j);
    gGame.isHintMode = false;
        
}

function addMineManually(i, j) {
    if (gBoard[i][j].isMine) return;
    gBoard[i][j].isMine = true;
    gLevel.MINES++;
    //renderCell(getCellElement(i,j), i, j);
    getCellElement(i,j).innerText = MINE;


}

function toggleMinesMode(elBtn) {
    // if (gGame.shownCount > 0 && gGame.isOn) {
    //     alert('cannot switch modes in the middle of a game');
    //     return; 
    // } 
    if (gGame.isSetMinesMode) { //to unset mines mode
        
        //change mode
        gGame.isSetMinesMode = false;
        elBtn.innerText = 'Manual';
        elBtn.style.backgroundColor = '#003e19';
        gGame.isOn = true;
        
        //start the game //TODO poss move to startGame function
        saveState();
        setMinesNegsCount(gBoard);
        renderBoard();
    } else { //to set mines mode
        init();
        gGame.isSetMinesMode = true;
        gLevel.NAME = 'manual';
        gLevel.MINES = 0;
        elBtn.innerText = 'Play';
        elBtn.style.backgroundColor = '#7bc5ae';
    }
}




