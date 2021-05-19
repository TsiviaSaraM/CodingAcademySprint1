const NORMAL_FACE = '😀';
const VICTORY_FACE = '😁';
const DEFEAT_FACE = '😦';

const VICTORY = true;
const DEFEAT = false;


var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed:0
}

var gTimerIntervalId;

//this clears previous global variables and displays a new board
function init(){
    console.log("here");
    gGame.isOn = true; //TODO probably can remove this
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    gGame.secsPassed = 0;
    gTimerIntervalId = 0;
    renderSmiley(NORMAL_FACE);
    //TODO start timer

    //TODO remove top 2 rows and add lower 2 rows in bonus version
    gBoard = createEmptyBoard();
    gBoard = buildBoard();
    renderBoard();
    // gBoard = createEmptyBoard();    
    // renderBoard();
    
}

//this starts the game
function cellClicked(elCell, i, j){
    if (!gGame.shownCount === 0) startGame();
    if (!gGame.isOn) return;
    var cell = gBoard[i][j];

    //debugger;
    if (cell.isShown) return;
    cell.isShown = true; //maybe change this logic so it happend in showSurroundingCells()
    gGame.shownCount++;

    renderUncoveredCell(elCell, i, j);
    if (cell.isMine) endGame(DEFEAT);


}

function cellMarked(elCell, i, j) {
    var cell = getCell(elCell); //TODO remove this function becuase we have i & j in params
    if (cell.isShown || cell.isMarked) return;
    cell.isMarked = true;
    gGame.markedCount++;
    if (checkGameOver()) {
        endGame(VICTORY);
        return;
    }
    showSurroundingCells(elCell, i, j);
    //saveState();
}

function checkGameOver() {
    return gGame.markedCount === gLevel.MINES && gGame.shownCount === gLevel.SIZE - gLevel.MINES; //TODO try improve the logic here
}


//uncovers adjacent cells
function showSurroundingCells(elCell, i, j) {
    for (var x = i - 1; x <= i + 1; x++) {
        if (x < 0 || x >= gBoard.length) continue;
        for (var y = j - 1; y <= i; y++) {
            if (y < 0 || y >= gBoard.length || (x === i && y === j)) continue;
            if (gBoard[x][y].isMine || gBoard[x][y].isShown) continue;
            //if (gBoard[x][y].minesAroundCount === 0) showSurroundingCells(x, y, /*elcell*/);
            gBoard[x][y].isShown = true; 
            renderUncoveredCell(elCell, i, j);
            gGame.shownCount++;

        }
    }
}

//helper functions//
function endGame(isVictory) {
    console.log("ending game");
    clearInterval(gTimerIntervalId);
    gGame.isOn = false;
    var smiley = isVictory ? VICTORY_FACE : DEFEAT_FACE;
    renderSmiley(smiley); //TODO maybe dont make separate function
    showAllMines();


}

function startGame(startPosI, startPosJ) {
    //TODO add these in the bonus version
    //buildBoard();
    //renderBoard();


    var startTime = new Date();
    gTimerIntervalId = setInterval(showTime, 1000, startTime);
    gGame.isOn = true;
   console.log("cell with id", document.getElementById('cell'+startPosI+'-'+startPosJ));
    return document.querySelector('#cell'+startPosI+'-'+startPosJ);


}

//changes the level is the game is not playing
function setLevel(size) {
    if (gGame.shownCount > 0 && gGame.isOn) return; //is the game is running
    gLevel.SIZE = size;
    gLevel.MINES = Math.ceil(size/3);
    init();
}