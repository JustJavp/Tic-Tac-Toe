<?php 
if (file_exists('usersDatabase.json')) {
    $fileContent = '';
    $file = fopen('usersDatabase.json', 'r');
    $fileContent = fgets($file);
    fclose($file);
    echo $fileContent;
}
?>