'use strict'
var gBoard;


function buildBoard() { 
    var board = []; //TODO change this so more logical
    for (var i = 0; i < gLevel.SIZE; i++) {
        var row = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            row.push({
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            });

        }
        board.push(row);
    }
    //fill with mines
    // if (gLevel.NAME !== 'manual') insertMines(board, currPosI, currPosJ);  
    // setMinesNegsCount(board);

    return board;
}


//helper functions//

function addMinesToBoard(currPosI, currPosJ) {
    insertMines(gBoard, currPosI, currPosJ);
    setMinesNegsCount(gBoard);
}

//adds mines to random locations on board when creating the board
function insertMines(board, currPosI, currPosJ) {
    //create array of positions
    var positions = getPositions(board, currPosI, currPosJ);
    
    for (var minesCount = 0; minesCount < gLevel.MINES; minesCount++) {      
        var randomIndex = getRandomNumber(positions.length);
        board[positions[randomIndex].i][positions[randomIndex].j].isMine = true;
        positions.splice(randomIndex, 1);
    } 
}

//inserts the number of neighbouring mines to the board
function setMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            //if (board[i][j].isMine) continue;
            board[i][j].minesAroundCount = getMinesCount({i:i, j:j}, board);
        }
    }

}

//returns the number of mines in neighbouring cells
function getMinesCount(cellLocation, board) {
    var count = 0;
    for (var x = cellLocation.i - 1; x <= cellLocation.i+1; x++) {
        if (x < 0 || x >= board.length) continue;
        for (var y = cellLocation.j - 1; y <= cellLocation.j+1; y++) {
            if (y < 0 || y >= board[0].length) continue;
            if (board[x][y].isMine) count++;
        }
    }
    return count;
}

function getPositions(board, currPosI, currPosJ) {
    var positions = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            
            if (i === currPosI && j === currPosJ) continue; 
            positions.push({i:i, j:j});       
        }
    }  
    return positions;
}