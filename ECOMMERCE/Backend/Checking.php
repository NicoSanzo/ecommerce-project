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

function autenticarUsuario() {   // es una funcion del Checking sesion, se llama en cada require de script que necesita datos de session.
    $headers = apache_request_headers();
    $response = [];

    if (isset($headers['authorization'])) {
        $jwt = str_replace("Bearer ", "", $headers['authorization']);
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