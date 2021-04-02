<?php 

$addRow = [
    'names' => $_POST['names'],
    'age' => $_POST['age']
];  
$fileContent = '';
if (file_exists('usersDatabase.json')) {
    $file = fopen('usersDatabase.json', 'r');
    $fileContent = fgets($file);
    fclose($file);
}
$file = fopen('usersDatabase.json', 'w');
if ($fileContent == '') {
    $addRow = [
        'Persona-0' => $addRow
    ];
    $addRow = json_encode($addRow);
    fwrite($file,$addRow);
} else {
    $fileContent = json_decode($fileContent, true);
    $fileContent += ['Persona-'.count($fileContent) => $addRow];
    $fileContent = json_encode($fileContent);
    fwrite($file, $fileContent);
}

fclose($file);

?>