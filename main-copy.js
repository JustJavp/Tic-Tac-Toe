/* setInterval(function () {
    printDatabase();
}, 1000); */


var board = document.getElementById('board');
var playerActive = document.getElementById('playerActive');
var winner = '';
var boardMatrix = [['', '', ''], ['', '', ''], ['', '', '']];
var i = 0;


var yourTurn;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        for (let x = 1; x <= 3; x++) {
            for (let y = 1; y <= 3; y++) {
                document.getElementById('cell-' + x + y).addEventListener('click', play);
            }
        }
        if (this.responseText == 'X') {
            yourTurn = true;
            board.classList.remove('playing-o');
            board.classList.add('playing-x');
        } else {
            yourTurn = false;
            board.classList.remove('playing-x');
            board.classList.add('playing-o');
        }
    }
};
xmlhttp.open("POST", "login.php", true);
xmlhttp.send();



function play() {
    if (i == 9 || !(yourTurn)) {
        return;
    }
    i++;
    yourTurn = false;
    /* Cell move */
    var cellMovement = this.id;
    var playerIdentity = board.classList.contains('playing-x');

    var xValue = String(parseInt(cellMovement[5]) - 1);
    var yValue = String(parseInt(cellMovement[6]) - 1);
    boardMatrix[xValue][yValue] = playerActive.innerHTML;

    if (playerIdentity) {
        this.classList.add('x');
        playerActive.innerHTML = 'O';
    } else {
        this.classList.add('o');
        playerActive.innerHTML = 'X';
    }

    if (i == 9) {
        winner = 'draw';
    }

    for (let x = 0; x < 3; x++) {
        if ((boardMatrix[x][0] == boardMatrix[x][1]) && (boardMatrix[x][1] == boardMatrix[x][2])) {
            if (boardMatrix[x][0] != '') {
                winner = boardMatrix[x][0];
            }
        }
    }
    for (let y = 0; y < 3; y++) {
        if ((boardMatrix[0][y] == boardMatrix[1][y]) && (boardMatrix[1][y] == boardMatrix[2][y])) {
            if (boardMatrix[0][y] != '') {
                winner = boardMatrix[0][y];
            }
        }
    }
    if ((boardMatrix[0][0] == boardMatrix[1][1]) && (boardMatrix[2][2] == boardMatrix[1][1])) {
        winner = boardMatrix[0][0];
    }
    if ((boardMatrix[0][2] == boardMatrix[1][1]) && (boardMatrix[2][0] == boardMatrix[1][1])) {
        winner = boardMatrix[0][2];
    }
    if (winner) {
        console.log('se acabó esta ñerda...' + winner);
        i = 9;
    }

/* Send 

JSON.Stringify(boardMatrix)


Get
JSON.parse(this.responseText)
*/

    console.table(JSON.parse(JSON.stringify(boardMatrix)))
}
