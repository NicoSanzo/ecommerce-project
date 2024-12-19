<?php
require("./Conexion.php");
require_once ('../../vendor/autoload.php'); 

use \Firebase\JWT\JWT;

ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);
ini_set('session.cookie_samesite', 'Strict');


$secret_key = "nico";  //Clave para establecer en el JWT, se codifica y se asigan al token 

$response = [];

if (isset($_POST['username']) && isset($_POST['password'])) {
    $usernameOrEmail = mysqli_real_escape_string($conn, $_POST['username']);
    $password = $_POST['password'];

    // Preparar la consulta
    $sql = "SELECT * FROM usuario WHERE (username = '$usernameOrEmail' OR mail = '$usernameOrEmail')";
    $result = mysqli_query($conn, $sql);

    // Verificar si el usuario existe
    if ($result && mysqli_num_rows($result) > 0) {
        $usuario = mysqli_fetch_assoc($result);
        $password = hash("sha512", $password);
        
        // Comparar la contraseña hasheada
        if ($password === $usuario['contrasena']) {

             // Verificar si el usuario es administrador
             $query = "SELECT * FROM administrador WHERE id = '" . $usuario['id'] . "';";
             $result_admin = mysqli_query($conn, $query);
             if (mysqli_num_rows($result_admin) != 1) {
                 $admin = false;
             } else {
                 $admin = true;
             }

            // Definir el payload del JWT
            $payload = array(
                "iss" => "localhost",  // Emisor del token
                "iat" => time(),       // Fecha de emisión
                "exp" => time() + 7200, // Expiración del token (2 horas)
                "id_user" => $usuario['id'],
                "username" => $usuario['username'],
                "nombre" => $usuario['nombre'],
                "apellido" => $usuario['apellido'],
                "mail" => $usuario['mail'],
                "isAdmin"=> $admin,
            );

             // Generar el token JWT
             $jwt = JWT::encode($payload, $secret_key,'HS256');

            // Manda el token generado y el estado
            $response['status'] = "success";
            $response['token'] = $jwt;
            
        } else {
            $response['error'] = "Usuario o mail incorrecto";
        }
    } else {
        $response['error'] = "Usuario o mail incorrecto";
    }

    // Devolver la respuesta como JSON
    echo json_encode($response);
}

mysqli_close($conn);
?>