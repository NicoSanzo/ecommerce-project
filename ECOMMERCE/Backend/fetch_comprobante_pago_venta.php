<?php

    require "./Checking.php";


    if(!isset($_POST['numero_operacion'])){
        $response['error'] = "No llegaron las variables para realizar la busqueda de la operacion.";
        echo json_encode($response);
        exit;
    }

    require "./Conexion.php";

    $numero_operacion = $_POST['numero_operacion'];


    $query = "SELECT comprobante_pago, estado_pago, fecha_pago, metodo_pago FROM operacion WHERE numero = '$numero_operacion'";
    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    $operacion = mysqli_fetch_assoc($result);
    $response= [];
    $dataFile=[];

  if($operacion){

    $response['estado_pago']= $operacion['estado_pago'];
    $response['fecha_pago']= $operacion['fecha_pago'];
    $response['metodo_pago']= $operacion['metodo_pago'];

    if ($operacion['comprobante_pago']) {
        // Obtener el BLOB (comprobante de pago)
        $file = $operacion['comprobante_pago'];
    
        // se usa finfo_buffer para obtener el tipo MIME directamente desde los datos binarios
        $finfo = finfo_open(FILEINFO_MIME_TYPE); // Obtener solo el tipo MIME
        $mime_type = finfo_buffer($finfo, $file); // Analizar el BLOB
        finfo_close($finfo);
    
        // Codificamos el archivo a base64
        $file_encoded = base64_encode($file);
    
        // Retornar los datos al admin
        $dataFile['type'] = $mime_type;  // El tipo MIME del archivo
        $dataFile['file'] = $file_encoded;

        $response['comprobante'] = $dataFile;

        }
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