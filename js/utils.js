'use strict'

var gLevel = {
    SIZE: 16,
    MINES: 2,
    NAME: 'easy'
}

function getRandomNumber(max, min=0) {
    return Math.floor(Math.random() * (max - min) + min);
}

function createEmptyBoard() {
    var board = [];
    var height = Math.sqrt(gLevel.SIZE);
    for (var i = 0; i < height; i++) {
        var row = [];
        for (var j = 0; j < height; j++) {
            row.push([]);
        }
        board.push(row);
    }
    return board;
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

function printCover(board) {
    var mines = []
    for (var i = 0; i < board.length; i++) {
        var row = [];
        for (var j = 0; j < board.length; j++) {
            //if (board[i][j].isMine) row.push(1)
            row.push(board[i][j].isShown);
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

function printMarked(board) {
    var counts = []
    for (var i = 0; i < board.length; i++) {
        var row = [];
        for (var j = 0; j < board.length; j++) {
            row.push(board[i][j].isMarked);
        }
        counts.push(row);
    }
    console.table(counts);
    return counts;
}

//returns the cell in gBoard from cell element of DOM
function getCell(elCell) {

}

function getCellElement(i, j) {
    return document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
}

function copyBoard(board) {
    var newBoard = [];
    for (var i = 0; i < board.length; i++) {
        var row = [];
        for (var j = 0; j < board.length; j++) {
            var newCell = Object.assign({}, board[i][j])
            row.push(newCell);
        }
        newBoard.push(row);
    }
    printCover(board);
    return newBoard;
}

function getRandomCoveredCell(board) {
    var cells = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (!board[i][j].isShown && !board[i][j].isMine) cells.push({i:i, j:j});
        }
    }
    if (cells.length === 0) {
        alert('all cells have been uncovered, mark the covered cells');
        return;
    }
    var result = cells[getRandomNumber(cells.length - 1)];
    console.log(result.i, result.j, " = random cell");
    return result;
}

// function coverAllCells() {
//     for (var i = 0; i < gBoard.length; i++) {
//         for (var j = 0; j < board[0].length; j++) {
//             getCellElement(i, j).innerText = '';
//         }
//     }
// }