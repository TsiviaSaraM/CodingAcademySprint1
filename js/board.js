'use strict'
var gBoard;


function buildBoard(currPosI=-1, currPosJ=-1) { 
    //build empty board
    //var board = createEmptyBoard();
    var board = gBoard; //TODO change this so more logical
    var height= Math.sqrt(gLevel.SIZE);
    for (var i = 0; i < height; i++) {
        //var row = [];
        for (var j = 0; j < height; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            };
        }
        //board.push(row);
    }
    //fill with mines
    if (gLevel.NAME !== 'manual') insertMines(board, currPosI, currPosJ);  
    setMinesNegsCount(board);
    // printMines(board);
    // printMinesCount(board)
    return board;
}


//helper functions//

//adds mines to random locations on board when creating the board
function insertMines(board, currPosI, currPosJ) {
    //create array of positions
    var positions = getPositions(board, currPosI, currPosJ);
    
    //console.log('positions', positions);
    for (var minesCount = 0; minesCount < gLevel.MINES; minesCount++) {
        //add mines randomly
        var randomIndex = getRandomNumber(positions.length);
        var position = positions[randomIndex];
        board[position.i][position.j].isMine = true;
        //console.log('mine', {i:position.i, j:position.j});
        //console.log('index', randomIndex);
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
           // console.log({i:x,j:y})
        }
    }
  //  console.log("end count", count);
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