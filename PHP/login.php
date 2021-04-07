<?php

    $gameAddress = 'game.json';
    $turnAddress = 'turn.txt';

    if (!(file_exists($gameFile))) {
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