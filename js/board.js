var gBoard = createEmptyBoard();



var gBoard = [];


function buildBoard() {

    //build empty board
    //var board = createEmptyBoard();
    board = gBoard; //TODO change this so more logical
    console.log(board);
    height = width = Math.sqrt(gLevel.SIZE);
    for (var i = 0; i < height; i++) {
        //var row = [];
        for (var j = 0; j < width; j++) {
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
    insertMines(board);
    setMinesNegsCount(board);
    printMines(board);
    printMinesCount(board)
    return board;
}


//helper functions//

//adds mines to random locations on board when creating the board
function insertMines(board) {
    //create array of positions
    var positions = getPositions(board.length, board.length);
    console.log('positions', positions);
    for (var minesCount = 0; minesCount < gLevel.MINES; minesCount++) {
        //add mines randomly
        var randomIndex = getRandomNumber(positions.length);
        var position = positions[randomIndex];
        board[position.i][position.j].isMine = true;
        console.log('mine', {i:position.i, j:position.j});
        console.log('index', randomIndex);
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