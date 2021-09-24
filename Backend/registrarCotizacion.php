<?php
	
    include('conexion.php');

	$cotizacion = file_get_contents("php://input");		//Recive el mensaje
    $cotizacion = json_decode($producto,true);	//Convierte el string recivido en un json

    //Registrar cotizacion
    $Id_Cliente = $cotizacion['Cliente'];
    $Id_Trabajador = "1"; //
    date_default_timezone_set("America/Bogota"); //Zona horaria de bogota
    $Fecha = date('Y-m-d H:i:s', time());

    $query = "INSERT into contizaciones(Id, Id_Cliente, Id_Trabajador, Fecha) VALUES ('NULL', '$Id_Cliente', '$Id_Trabajador', '$Fecha')";
    
    $result = mysqli_query($connection, $query);
    if(!$result){
        echo "Error al guardar producto";
    }
    echo $result;

?>