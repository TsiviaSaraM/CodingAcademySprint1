var gLevel = {
    SIZE: 4,
    MINES: 2
}

function getRandomNumber(max, min=0) {
    return Math.floor(Math.random() * (max - min) + min);
}

function createEmptyBoard() {
    var board = [];
    height = width = Math.sqrt(gLevel.SIZE);
    for (var i = 0; i < height; i++) {
        var row = [];
        for (var j = 0; j < width; j++) {
            row.push([]);
        }
        board.push(row);
    }
    return board;
}

function getPositions(width, height) {
    var positions = [];
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            positions.push({i:i, j:j});       
        }
    }
   
    return positions;
}


//functions for debugging
function printMines(board) {
    var mines = []
    for (var i = 0; i < board.length; i++) {
        var row = [];
        for (var j = 0; j < board.length; j++) {
            //if (board[i][j].isMine) row.push(1)
            row.push(board[i][j].isMine);
        }
        mines.push(row);
    }
    console.table(mines);
}

function printMinesCount(board) {
    var counts = []
    for (var i = 0; i < board.length; i++) {
        var row = [];
        for (var j = 0; j < board.length; j++) {
            row.push(board[i][j].minesAroundCount);
        }
        counts.push(row);
    }
    console.table(counts);
}

//returns the cell in gBoard from cell element of DOM
function getCell(elCell) {

}