<?php
    require("./Checking.php");

    header('Content-Type: application/json'); // Encabezado JSON

    if(!isset($_POST['inputCatValue'])){
        $response['error'] = "No se obtuvo la información necesaria para poder realizar el alta de la categoria";
        echo json_encode($response);
        exit();
    }

    require("./Conexion.php");

    $nombre = $_POST['inputCatValue'];
    $query = "INSERT INTO categoria VALUES (NULL,'$nombre')";
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