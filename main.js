login();

function reloadPage() {
    reload = setInterval(function () {
        checkout();
    }, 100);
}
/* = = = = = = = = = = = = = 
       Global variables
 = = = = = = = = = = = = = */
var playerActive = document.getElementById('playerActive');
var playerIcon = document.getElementById('playerIcon');
var board = document.getElementById('board');
var boardMatrix = [['', '', ''], ['', '', ''], ['', '', '']];
var winner = '';
var playing = '';
var reload;

/* = = = = = = = = = = = = = 
       Login & SetUp
 = = = = = = = = = = = = = */
function login() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            /* GET PLAYER ID */
            playing = this.responseText;

            /* ADD OR REMOVE PLAYERS ICON */
            if (playing == 'O') {
                reloadPage();
                board.classList.remove('playing-x');
                board.classList.add('playing-o');
                playerIcon.append('O')
                

            } else {
                board.classList.remove('playing-o');
                board.classList.add('playing-x');
                playerIcon.append('X')
            }

            /* BIND CELL WITH PLAY FUNCTION */
            for (let x = 1; x <= 3; x++) {
                for (let y = 1; y <= 3; y++) {
                    document.getElementById('cell-' + x + y).addEventListener('click', play);
                }
            }

        }
    };
    xhttp.open("POST", "PHP/login.php", true);
    xhttp.send();
}

/* = = = = = = = = = = = = = 
          Checkout
 = = = = = = = = = = = = = */
function checkout() {
    var data = new FormData();
    data.append('player', playing);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText != 'false') {
                clearInterval(reload);
                /* GET GAME.JSON INFO */
                boardMatrix = JSON.parse(this.responseText);
                /* FILLING BOARD */
                for (let x = 1; x <= 3; x++) {
                    for (let y = 1; y <= 3; y++) {
                        var cell = document.getElementById('cell-' + x + y);

                        if (boardMatrix[x - 1][y - 1] == 'X') {
                            cell.classList.add('x');
                        }
                        else if (boardMatrix[x - 1][y - 1] == 'O') {
                            cell.classList.add('o');
                        }

                    }
                }
                /* GET "Now is Playing" */
                playerActive.innerHTML = playing;

                
                checkWin();
            }
        }
    };
    xhttp.open("POST", "PHP/checkout.php", true);
    xhttp.send(data);
}

/* = = = = = = = = = = = = = 
          Movement
 = = = = = = = = = = = = = */
function sendMove() {
    var data = new FormData();
    data.append('player', playing);
    data.append('board', JSON.stringify(boardMatrix));
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText != '') {
                alert(this.responseText);
            }
        }
    };
    xhttp.open("POST", "PHP/newMove.php", true);
    xhttp.send(data);
}

function checkWin() {
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
        alert('Ganó ' + winner);
    }
}

function play() {
    console.log(winner)
    console.log(playerActive.innerHTML)
    console.log(playing)
    /* Can't play if anyone won or not your turn */
    if (winner || (playing != playerActive.innerHTML)) {
        return;
    }
    /* Cell move */
    var cellMovement = this.id;
    var xValue = String(parseInt(cellMovement[5]) - 1);
    var yValue = String(parseInt(cellMovement[6]) - 1);
    
    boardMatrix[xValue][yValue] = playing;

    if (playing == 'X') {
        this.classList.add('x');
        playerActive.innerHTML = 'O';
    } else {
        this.classList.add('o');
        playerActive.innerHTML = 'X';
    }

    checkWin();

    sendMove();

    reloadPage();
}
