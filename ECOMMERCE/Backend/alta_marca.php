<?php
    require("./Checking.php");

    header('Content-Type: application/json'); // Encabezado JSON

    if(!isset($_POST['inputMarcaValue'])){
        $response['error'] = "No se obtuvo la información necesaria para poder realizar el alta de la marca";
        echo json_encode($response);
        exit();
    }

    require("./Conexion.php");

    $query = "SELECT count(id) as cantidad FROM marca;";
    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    $fila = mysqli_fetch_assoc($result);
    $id_siguiente_marca = $fila['cantidad'] + 1;


    mysqli_free_result($result);

    $nombre = $_POST['inputMarcaValue'];
    $query = "INSERT INTO marca VALUES ('$id_siguiente_marca','$nombre')";
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