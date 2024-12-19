<?php

    require "./Checking.php";

 
    if(!isset($_POST['numero_operacion'])){
        $response['error'] = "No llegaron las variables para realizar la busqueda de la operacion.";
        echo json_encode($response);
        exit;
    }

  
    require "./Conexion.php";

    $numero_operacion = $_POST['numero_operacion'];

    $query = "SELECT factura FROM operacion WHERE numero = '$numero_operacion'";
    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    $operacion = mysqli_fetch_assoc($result);

        
    if ($operacion['factura']) {  // Verificamos si existe la factura
        
        $file = $operacion['factura']; // Obtener el BLOB (comprobante de pago) 
        $file_encoded = base64_encode($file); // Codificamos el archivo a base64
        $response['data'] = $file_encoded;
        
        echo json_encode($response);
        exit();
    }
    else{
        $response['data']=null;
        echo json_encode($response);
        exit();
    }


    mysqli_close($conn);
?>