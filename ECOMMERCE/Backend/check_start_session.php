<?php
require_once '../../vendor/autoload.php';  // Asegúrate de que la librería firebase/php-jwt esté cargada

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret_key = "nico"; // es la misma clave que se utiliza en Userlogin.php para verificar el token

function verificarJWT($jwt) {
    global $secret_key;

    if (!$jwt) {
        return false;
    }

    try {
        $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
        return (array) $decoded;  // Devuelve el payload decodificado
    } catch (\Firebase\JWT\ExpiredException $e) {
        return "Token expirado"; // Caso de expiración
    } catch (Exception $e) {
        return false;
    }
}

// Verificar el JWT desde el encabezado
$headers = apache_request_headers();  // almacena los headers aca

if (isset($headers['authorization'])) {    // desde el front se envia un header con la codificacion del token
    

    $jwt = str_replace("Bearer ", "", $headers['authorization']);    
    $userData = verificarJWT($jwt);  // esta funcion decodifica el toquen y establece los datos de session en userData para enviarlos en la peticion
    $response;
    
    if ($userData === "Token expirado") {
        $response['error'] = "Token expirado";
        echo json_encode($response);
        exit;
    }
    
    if ($userData) {
        // El JWT es válido, puedes usar los datos del usuario
        $response['data']=$userData;
        echo json_encode($response);
        
    } else {
        // El token es inválido  
        $response['error']= "Token inválido";
        echo json_encode($response);
    }
} else {
    $response['error']= "Token no proporcionado";
    echo json_encode($response);
}
?>