<?php
	
    include('conexion.php');

	$producto = file_get_contents("php://input");		//Recive el mensaje
    $producto = json_decode($producto,true);	//Convierte el string recivido en un json

    $Codigo = $producto['Codigo'];
    $Nombre = $producto['Nombre'];
    $Categoria = $producto['Categoria'];
    $Ubicacion = $producto['Ubicacion'];
    $Descripcion = $producto['Descripcion'];
    $PrecioEntrada = $producto['PrecioEntrada'];
    $PrecioSalida = $producto['PrecioSalida'];
    $Unidad = $producto['Unidad'];
    $Presentacion = $producto['Presentacion'];
    $CantidadInicial = $producto['CantidadInicial'];
    $CantidadMinima = $producto['CantidadMinima'];

    $query = "INSERT into productos(Codigo, Nombre, Categoria, Ubicacion, Descripcion, PrecioEntrada, PrecioSalida, Unidad, Presentacion, CantidadInicial, CantidadMinima, Imagen, Id_Proveedor) VALUES ('$Codigo', '$Nombre', '$Categoria', '$Ubicacion', '$Descripcion', '$PrecioEntrada', '$PrecioSalida', '$Unidad', '$Presentacion', '$CantidadInicial', '$CantidadMinima', 'NULL', 'NULL')";
    
    $result = mysqli_query($connection, $query);
    if(!$result){
        echo "Error al guardar producto";
    }

    echo $result;

?>