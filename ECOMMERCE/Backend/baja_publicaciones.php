<?php 
    require("./Checking.php");

    if(!isset($_POST['itemKey'])){
        $response['error'] = "No se obtuvo la información necesaria para poder realizar la baja de la publicación.";
        echo json_encode($response);
        exit();
    }

    require("./Conexion.php");

    $id_publicacion = $_POST['itemKey'];
    $query = "SELECT * FROM produ_publi WHERE publicacion_id = '$id_publicacion';";
    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    $fila = mysqli_fetch_assoc($result);
    $id_producto = $fila['producto_codigo'];
    mysqli_free_result($result);

    $query = "DELETE FROM produ_publi WHERE publicacion_id = '$id_publicacion' AND producto_codigo = '$id_producto';
    DELETE FROM producto WHERE codigo = '$id_producto';
    DELETE FROM publicacion WHERE id = '$id_publicacion';";

    $operation = mysqli_multi_query($conn, $query);
    if(!$operation){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    $response['data'] = true;
    echo json_encode($response);
    mysqli_close($conn);
?>