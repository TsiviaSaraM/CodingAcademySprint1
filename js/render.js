'use strict'

const MINE = '💣';
const FLAG = '🚩';

function renderBoard() {
    var elBoard = document.querySelector('.board');
    var strHTML = '';

    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gBoard[0].length; j++) {
            var className;
            var innerText = '';

            if (gBoard[i][j].isShown) {
                className = 'revealed';
                if (gBoard[i][j].isMine) innerText = MINE;
                else if (gBoard[i][j].minesAroundCount > 0) innerText = gBoard[i][j].minesAroundCount;
            } else {
                className = 'covered';
                if (gBoard[i][j].isMarked) innerText = FLAG;
            } 

            strHTML += `<td class="${className}" data-i="${i}" data-j="${j}" onclick="cellClicked(${i}, ${j})" 
                oncontextmenu="cellMarked(${i}, ${j})" >${innerText}</td>`;
            }
            strHTML += '</tr>';
        }
        elBoard.innerHTML = strHTML;
}

function renderCell(elCell, i, j) {
    //var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
    if (gBoard[i][j].isShown) {
        elCell.innerText = getCellContent(i, j);
        elCell.className = "revealed";
    } else if (gBoard[i][j].isMarked) {
        elCell.innerText = FLAG;
        elCell.className = "covered";
    } else   
    {
        elCell.innerHTML = '';
        elCell.className = "covered";
    }
}

function renderHints() {
    var strHTML = '';
  strHTML += `Hints remaining: <span class="unused" data-id=${1} onclick="setHintMode(this)" >💡 </span> 
   <span class="unused" data-id=${2} onclick="setHintMode(this)">💡 </span>
   <span class="unused" data-id=${3} onclick="setHintMode(this)">💡</span>`;

   document.querySelector('.hints').innerHTML = strHTML;
}

function renderLevels() {
    document.querySelector('.easy-score').innerText = localStorage.scoreEasy;
    document.querySelector('.medium-score').innerText = localStorage.scoreMedium;
    document.querySelector('.hard-score').innerText = localStorage.scoreHard;
}

function renderSmiley(value) {
    document.querySelector('.smiley').innerHTML = value;
}

function getCellContent(i, j) {
    var cell = gBoard[i][j];
    if (cell.isMine) return MINE;
    else if (cell.minesAroundCount > 0) return cell.minesAroundCount;
    else return ' ';
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
