<?php
    if(!isset($_POST['numero_operacion'])){
        $response['error'] = "No llegaron las variables para realizar el cambio de estado de envio.";
        echo json_encode($response);
        exit;
    }

    require ("./Conexion.php");
    require ("./Checking.php");

    $numero_operacion = $_POST['numero_operacion'];

    $query = "SELECT estado_compra, fecha_entrega FROM operacion WHERE numero = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "s", $numero_operacion);  // "s" for string parameter

    if (mysqli_stmt_execute($stmt)) {
        $result = mysqli_stmt_get_result($stmt);
        
        if ($row = mysqli_fetch_assoc($result)) {
            $response['data'] = $row;
        } else {
            $response['error'] = "No se encontraron resultados.";
        }
    } else {
        $response['error'] = mysqli_error($conn);
    }

    echo json_encode($response);
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
?>