<?php
    require("./Checking.php");

    header('Content-Type: application/json'); // Encabezado JSON

    if(!isset($_POST['inputMarcaValue'])){
        $response['error'] = "No se obtuvo la información necesaria para poder realizar el alta de la marca";
        echo json_encode($response);
        exit();
    }

    require("./Conexion.php");

    $nombre = $_POST['inputMarcaValue'];
    $query = "INSERT INTO marca VALUES (NULL,'$nombre')";
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