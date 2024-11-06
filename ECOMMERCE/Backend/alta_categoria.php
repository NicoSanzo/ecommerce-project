<?php
    require("./Checking.php");

    if(!isset($_POST['inputCatValue'])){
        $response['error'] = "No se obtuvo la información necesaria para poder realizar el alta de la categoria";
        echo json_encode($response);
        exit();
    }

    require("./Conexion.php");

    $query = "SELECT count(id) as cantidad FROM categoria;";
    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    $fila = mysqli_fetch_assoc($result);
    $id_siguiente_categoria = $fila['cantidad'] + 1;


    mysqli_free_result($result);

    $nombre = $_POST['inputCatValue'];
    $query = "INSERT INTO categoria VALUES ('$id_siguiente_categoria','$nombre')";
    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    $response['data'] = true;
    echo json_encode($response);
    mysqli_close($conn);
?>