<?php

    require("./Conexion.php");

    $response['data'] = [];
    $response['data']['categoria'] = [];
    $response['data']['marca'] = [];

    $query = "SELECT * FROM categoria;";
    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }
    
    while($fila = mysqli_fetch_assoc($result)){
        array_push($response['data']['categoria'], $fila);
    }

    mysqli_free_result($result);

    $query = "SELECT * FROM marca;";
    $result = mysqli_query($conn, $query);
    
    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    while($fila = mysqli_fetch_assoc($result)){
        array_push($response['data']['marca'], $fila);
    }

    mysqli_free_result($result);
    echo json_encode($response);
?>