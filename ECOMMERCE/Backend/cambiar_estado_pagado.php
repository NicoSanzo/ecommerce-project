<?php
    if(!isset($_POST['numero_operacion'])){
        $response['error'] = "No llegaron las variables para realizar la busqueda de la operacion.";
        echo json_encode($response);
        exit;
    }

    require ("./Conexion.php");
    require ("./Checking.php");

    $fecha = new DateTime();
    $fecha->modify('-3 hours');
    $fecha = $fecha->format('Y-m-d H:i:s');

    $numero_operacion = $_POST['numero_operacion'];
    $query = "UPDATE operacion SET estado_pago = 'Aprobado', fecha_pago = '$fecha' WHERE numero = '$numero_operacion'";
    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    $response['success'] = true;
    echo json_encode($response);
    mysqli_close($conn);
?>