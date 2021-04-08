<?php

    $dataPlayerAddress = '../databases/dataPlayers.txt';
    $dataPlayerHandling = '';

    if (file_exists($dataPlayerAddress)) {
        $dataPlayerFile = fopen($dataPlayerAddress, 'r');
        $dataPlayerHandling = fgets($dataPlayerFile); 
        fclose($dataPlayerFile);
    }

    echo $dataPlayerHandling;

?>
