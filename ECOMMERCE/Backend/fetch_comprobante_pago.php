<?php

    require "./Checking.php";

    $dataSession= autenticarUsuario();   // es una funcion que se encuentra en checkign.php //toma los datos de usuario direco de la sesion
    $userid = $dataSession['id_user'];


    if(!isset($_POST['numero_operacion'])){
        $response['error'] = "No llegaron las variables para realizar la busqueda de la operacion.";
        echo json_encode($response);
        exit;
    }

    require "./Conexion.php";

    $numero_operacion = $_POST['numero_operacion'];


    $query = "SELECT comprobante_pago , cliente_id FROM operacion WHERE numero = '$numero_operacion'";
    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    $operacion = mysqli_fetch_assoc($result);

        // Verificamos si el cliente_id de la operación corresponde al usuario autenticado
    if ($operacion['cliente_id'] != $userid) {
        $response['error'] = "No tienes permiso para acceder a esta operación.";
        echo json_encode($response);
        exit();
    }
    else if ($operacion['comprobante_pago']) {
        // Obtener el BLOB (comprobante de pago)
        $file = $operacion['comprobante_pago'];
    
      
    
        // Usamos finfo_buffer para obtener el tipo MIME directamente desde los datos binarios
        $finfo = finfo_open(FILEINFO_MIME_TYPE); // Obtener solo el tipo MIME
        $mime_type = finfo_buffer($finfo, $file); // Analizar el BLOB
        finfo_close($finfo);
    
        // Codificamos el archivo a base64
        $file_encoded = base64_encode($file);
    
        // Retornar los datos al cliente
        $response['type'] = $mime_type;  // El tipo MIME del archivo
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