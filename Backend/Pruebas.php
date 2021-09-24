<?php
    $data = array();
    
    //database details
    $dbHost     = 'localhost';
    $dbUsername = 'root';
    $dbPassword = '';
    $dbName     = 'microproyectodaw';

    //create connection and select DB
    $db = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);
    if($db->connect_error){
        die("Unable to connect database: " . $db->connect_error);
    }
    
    //get user data from the database
    $query = "SELECT Id, Nombre, Apellido FROM clientes";
    
    $result = $db->query($query);

    // Hacemos un bucle con los datos obtenidos
    foreach ($result as $row) {
        $data[] = $row;
    }
    
    //returns data as JSON format
    echo json_encode($data);
?>