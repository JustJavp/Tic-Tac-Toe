<?php 
    $file = fopen('game.json', 'w');
    fwrite($file,json_encode($_POST['data']));
    fclose($file);
?>