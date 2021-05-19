const MINE = '💣';
const FLAG = '🚩';

/*unit test*/
// var time = new Date();
// setInterval(showTime, 1000, time);

function renderBoard() {
    var strHTML = '';
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gBoard[0].length; j++) {
            strHTML += `<td class="covered" data-i="${i}" data-j="${j}" onclick="cellClicked(this, ${i}, ${j})" oncontextmenu="cellMarked(this, ${i}, ${j})" > </td>`;
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
    

}

function renderUncoveredCell(elCell, i, j) { 
    var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
    console.log("a cell was uncovered");
    console.log(elCell);
    var cell = gBoard[i][j];
    if (cell.isMine) elCell.innerText = MINE;
    else if (cell.minesAroundCount > 0) elCell.innerText = cell.minesAroundCount;
    else elCell.innerHTML = ' ';
    //debugger;
    elCell.className = "revealed";
}

function renderSmiley(value) {
    document.querySelector('.smiley').innerHTML = value;
}

function renderBestScore(score) {

}

function showTime(startTime) {
    var now = new Date();
    gGame.secsPassed = Math.floor((now - startTime)/1000);
    document.querySelector(".timer").innerText = gGame.secsPassed;

}

function showAllMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) {
                var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
                renderUncoveredCell(elCell, i, j);
                gGame.shownCount++;
            }
        }
    }
}


