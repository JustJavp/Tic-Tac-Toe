<?php

    $gameAddress = '../databases/game.json';
    $turnAddress = '../databases/turn.txt';
    $dataPlayerAddres = '../databases/dataPlayers.txt';
    $data = $_POST['data-player'];

    /* If you wanna do that first to open website is "x" and second is "o" */
/*     if (!(file_exists($gameAddress))) {
        $gameFile = fopen($gameAddress, 'w');
        fclose($gameFile);
        $turnFile = fopen($turnAddress, 'w');
        fwrite($turnFile, 'X');
        fclose($turnFile);
        echo 'X';
    } else {
        echo 'O';
    } */

    $dataplayerHandling = '';

    if (file_exists($dataPlayerAddres)) {
        $dataplayerFile = fopen($dataPlayerAddres, 'r');
        $dataplayerHandling = fgets($dataplayerFile);
        fclose($dataplayerFile);
    }

    if (!(file_exists($gameAddress))) {
        $gameFile = fopen($gameAddress, 'w');
        fclose($gameFile);
        $turnFile = fopen($turnAddress, 'w');
        fwrite($turnFile, 'X');
        fclose($turnFile);

        $dataplayerFile = fopen($dataPlayerAddres, 'w');
        fwrite($dataplayerFile, $data);
        fclose($dataplayerFile);
        echo 'true';
    } else {
        if (str_contains($dataplayerHandling, $data)) {
            echo 'false';
        } else {
            $dataplayerFile = fopen($dataPlayerAddres, 'w');
            fwrite($dataplayerFile, $dataplayerHandling.$data);
            fclose($dataplayerFile);
            echo 'true';
        }
    }





?>