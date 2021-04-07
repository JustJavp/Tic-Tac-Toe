<?php 

    $gameAddress = 'game.json';
    $turnAddress = 'turn.txt';
    $data = $_POST['board'];
    $player = $_POST['player'];

    $gameFile = fopen($gameAddress, 'w');
    fwrite($gameFile, $data);
    fclose($gameFile);
    $turnFile = fopen($turnAddress, 'w');
    if ($player == 'X') {
        fwrite($turnFile, 'O');
    } else {
        fwrite($turnFile, 'X');
    }
    fclose($turnFile);

?>