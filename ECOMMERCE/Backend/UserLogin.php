<?php
require("./Conexion.php");

session_start();

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
            $_SESSION['usuario'] = $usuario['username']; // Almacena los datos de usuario de la session
            $_SESSION['apellido']= $usuario['apellido'];
            $_SESSION['mail']= $usuario['mail'];
            $_SESSION['nombre']= $usuario['nombre'];
            $_SESSION['id_user']= $usuario['id'];
            $_SESSION['hash'] = session_id();
            
            mysqli_free_result($result);
            $id_usuario = $usuario['id'];
            $query = "";

            $query = "SELECT * FROM administrador WHERE id = '$id_usuario';";
            $result = mysqli_query($conn, $query);
            if(mysqli_num_rows($result) != 1){
                $_SESSION['admin'] = false;
            }
            else{
                $_SESSION['admin'] = true;
            }

            $response['status'] = "success";
            
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