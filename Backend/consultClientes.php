<?php

    include('conexion.php');

    $query = "SELECT Id, Nombre, Apellido FROM clientes";
    $resultQuery = mysqli_query($connection, $query);

    $rawdata = array(); //creamos un array
    //guardamos en un array multidimensional todos los datos de la consulta
    $i=0;
    while($row = mysqli_fetch_array($resultQuery)){
        $rawdata[$i] = $row;
        $i++;
    }
    echo json_encode($rawdata);

?>