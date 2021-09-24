<?php

    include('conexion.php');

    $query = "SELECT Codigo, Nombre, Categoria, PrecioSalida, Imagen FROM productos";
    $resultQuery = mysqli_query($connection, $query);

    $rawdata = array(); //creamos un array
    $i=0;
    while($row = mysqli_fetch_array($resultQuery)){
        $rawdata[$i] = $row;
        $i++;
    }
    echo json_encode($rawdata);

?>