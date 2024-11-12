<?php
    if(!verificarVariables()){
        $response['error'] = "No llegaron las variables necesarias para hacer el alta del cliente...";
        echo json_encode($response);
        exit();
    }

    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $username = $_POST['usuario'];
    $mail = $_POST['email'];
    $dni = $_POST['dni'];
    $celular = $_POST['celular'];
    $fecha = date('Y-m-d');
    $hashed_password = hash("sha512", $_POST['contraseña']);

    require("./Conexion.php");

    $query = "INSERT INTO usuario VALUES(NULL,'$username','$mail','$hashed_password','$fecha','$nombre','$apellido');";
    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    $id_siguiente_usuario = mysqli_insert_id($conn);

    $query = "INSERT INTO cliente VALUES('$id_siguiente_usuario','$dni','$celular',NULL,NULL)";
    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    $response['data'] = true;
    echo json_encode($response);
    mysqli_close($conn);

    function verificarVariables(){
        if(isset($_POST['nombre']) && isset($_POST['apellido']) && isset($_POST['email']) && 
        isset($_POST['dni']) && isset($_POST['celular']) && isset($_POST['contraseña'])){
            return true;
        }
        return false;
    }
?>