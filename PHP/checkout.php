<?php

    $gameAddress = 'game.json';
    $turnAddress = 'turn.txt';
    $player = $_POST['player'];

    $turnFile = fopen($turnAddress, 'r');
    $turnHandling = fgets($turnFile); 

    if ($player == $turnHandling) {
        $gameFile = fopen($gameAddress, 'r'); 
        echo fgets($gameFile);
        fclose($gameFile);
    } else {
        echo 'false'; 
    }

    fclose($turnFile);
?>