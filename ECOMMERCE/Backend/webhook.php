<?php
    //OBTENER HEADERS
    require("./Conexion.php");
    $xsignature = $_SERVER['HTTP_X_SIGNATURE'];
    $xRequestID = $_SERVER['HTTP_X_REQUEST_ID'];
    
    //SEPARAR HEADER X-SIGNATURE
    parse_str(str_replace(',', '&', $xsignature), $signature_parts);
    $ts =  $signature_parts['ts'];
    $hash =  $signature_parts['v1'];
    
    //OBTENER DATOS QUE MANDA MERCADOPAGO
    $json = file_get_contents("php://input");
    $object_mp = json_decode($json);
    $data_id = $object_mp->data->id;
    
    //CLAVE SECRETA
    $secret = "99ca188fd51ff648b59e14b660d40a516e71626466e36fc636e283a731e28be8";
    
    $manifest = "id:$data_id;request-id:$xRequestID;ts:$ts;";
    
    $sha = hash_hmac('sha256', $manifest, $secret);
    if ($sha === $hash) {
        // HMAC verification passed
        $url = "https://api.mercadopago.com/v1/payments/" . $data_id;

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer APP_USR-4438792683199166-111319-32c637e4aa108f2faec5148c0b1ce442-728183787',
            'Content-Type: application/json'// Reemplaza con tu token de acceso
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);

        $object = json_decode($response);
        $json = json_encode($object->metadata->json_data);

        $query = "INSERT INTO prueba VALUES('HMAC PASSED - JSON: $json');";
        
        http_response_code(200);
    } else {
        // HMAC verification failed
        $query = "INSERT INTO prueba VALUES('HMAC verification failed');";
    }
    $result = mysqli_query($conn, $query);
    
    mysqli_close($conn);
?>