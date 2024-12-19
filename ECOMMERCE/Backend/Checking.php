<?php
require_once '../../vendor/autoload.php';  // Asegúrate de que la librería esté cargada correctamente

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret_key = "nico"; // Cambia esto por tu clave secreta

function verificarJWT($jwt) {
    global $secret_key;

    if (!$jwt) {
        return false;
    }

    try {
        $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
        return (array) $decoded;  // Devuelve el payload decodificado
    } catch (Exception $e) {
        return false;
    }
}


function capitalizeHeaderNames($headers) {
    $capitalizedHeaders = [];
    foreach ($headers as $key => $value) {
        // Convertir "header-name" a "Header-Name"
        $capitalizedKey = implode('-', array_map('ucfirst', explode('-', strtolower($key))));
        $capitalizedHeaders[$capitalizedKey] = $value;
    }
    return $capitalizedHeaders;
}


// Verificar el JWT desde el encabezado


function autenticarUsuario() {   // es una funcion del Checking sesion, se llama en cada require de script que necesita datos de session.
    
// Verificar el JWT desde el encabezado
    $headers = getallheaders(); // obtiene y almacena los headers aca
    $normalizedHeaders = capitalizeHeaderNames($headers); // les transforma la primera letra para que se adapte a cualquier entorno de servidor, ya que en local se mantiene con la primer letra minuscula y por ejemplo en hostinger se pasa con mayuscula. Esto provoca que no coincidan los nombres y no encuentre el header

    $response = [];

    if (isset($normalizedHeaders['Authorization'])) {
        $jwt = str_replace("Bearer ", "", $normalizedHeaders['Authorization']);
        $userData = verificarJWT($jwt);

        if ($userData) {
            return $userData;
        } else {
            $response['error'] = "Token inválido";
            echo json_encode($response);
            http_response_code(401);
            exit;
        }
    } else {
        $response['error'] = "Token no proporcionado";
        echo json_encode($response);
        http_response_code(401);
        exit;
    }
}

autenticarUsuario()
?>