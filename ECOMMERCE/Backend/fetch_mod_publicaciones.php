<?php
    require("./Checking.php");
    require("./Conexion.php");
    if(!isset($_POST['id'])){
        $response['error'] = "No se encuentran las variables necesarias para realizar el fetch de publicaciones.";
        echo json_encode($response);
        exit();
    }

    $response = [];
    $response['data'] = [];

    $id_publicacion = $_POST['id'];

    $query = "SELECT * FROM produ_publi WHERE publicacion_id = '$id_publicacion';";
    $result = mysqli_query($conn, $query);
    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }
    $fila = mysqli_fetch_assoc($result);
    mysql_free_result($result);
    $id_producto = $fila['producto_codigo'];

    $query = "SELECT * FROM producto WHERE codigo = '$id_producto';";
    $result = mysqli_query($conn,$query);
    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }
    $fila = mysqli_fetch_assoc($result);
    mysql_free_result($result);

    $object = new stdClass();
    $object->codigo_producto = $fila['codigo'];
    $object->modelo = $fila['modelo'];
    $object->color = $fila['color'];
    $object->alto = $fila['alto'];
    $object->ancho = $fila['ancho'];
    $object->profundidad = $fila['profundidad'];
    $object->peso = $fila['peso'];
    $object->marca_id = $fila['marca_id'];
    $object->categoria_id = $fila['categoria_id'];



    $query = "SELECT * FROM publicacion WHERE id = '$id_publicacion';";
    $result = mysqli_query($conn,$query);
    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }
    $fila = mysqli_fetch_assoc($result);
    mysql_free_result($result);

    $object->id_publicacion = $fila['id'];
    $object->titulo = $fila['titulo'];
    $object->precio = $fila['precio'];
    $object->stock = $fila['stock'];
    $object->imagen = $fila['imagen'];
    $object->descripcion = $fila['descripcion'];

    
    array_push($response['data'], $object);
    echo json_encode($response);
    mysqli_close($conn);


?>