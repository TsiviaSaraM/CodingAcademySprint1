'use strict'

const MINE = '💣';
const FLAG = '🚩';

function renderUncoveredCell(elCell, i, j) { 
    var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
    var cell = gBoard[i][j];
    elCell.innerText = getCellContent(i, j);
    elCell.className = "revealed";
}

function renderHints() {
    var strHTML = '';
  strHTML += `Hints remaining: <span class="unused" data-id=${1} onclick="setHintMode(this)" >💡 </span> 
   <span class="unused" data-id=${2} onclick="setHintMode(this)">💡 </span>
   <span class="unused" data-id=${3} onclick="setHintMode(this)">💡</span>`;

   document.querySelector('.hints').innerHTML = strHTML;
}

function getCellContent(i, j) {
    var cell = gBoard[i][j];
    if (cell.isMine) return MINE;
    else if (cell.minesAroundCount > 0) return cell.minesAroundCount;
    else return ' ';
}

function coverCellEl(elCell) {
    elCell.innerHTML = '';
    elCell.className = "covered";
}

function renderSmiley(value) {
    document.querySelector('.smiley').innerHTML = value;
}

function showAllMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) {
                var elCell = getCellElement(i, j);
                renderUncoveredCell(elCell, i, j);
                gGame.shownCount++;
            }
        }
    }
}

//TODO function renderBestScore()

function renderBoard() {
    var strHTML = '';
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gBoard[0].length; j++) {
            var className;
            var innerText = '';
            if (gBoard[i][j].isShown) {
                var className = 'revealed';
                if (gBoard[i][j].isMine) innerText = MINE;
                else if (gBoard[i][j].minesAroundCount > 0) innerText = gBoard[i][j].minesAroundCount;
            } else{
                className = 'covered';
                if (gBoard[i][j].isMarked) innerText = FLAG;
            } 

            strHTML += `<td class="${className}" data-i="${i}" data-j="${j}" onclick="cellClicked(${i}, ${j})" 
                oncontextmenu="cellMarked(${i}, ${j})" >${innerText}</td>`;
            }
            strHTML += '</tr>';
        }
        var elBoard = document.querySelector('.board');
        elBoard.innerHTML = strHTML;
}