<?php

    $gameAddress = '../databases/game.json';
    $turnAddress = '../databases/turn.txt';

    if (!(file_exists($gameAddress))) {
        $gameFile = fopen($gameAddress, 'w');
        fclose($gameFile);
        $turnFile = fopen($turnAddress, 'w');
        fwrite($turnFile, 'X');
        fclose($turnFile);
        echo 'X';
    } else {
        echo 'O';
    }

?>