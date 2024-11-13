<?php
    if(!verificarVariables()){
        $response['error'] = "No llegaron las variables necesarias para hacer el alta del cliente...";
        echo json_encode($response);
        exit();
    }
    require("./Conexion.php");

    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $username = $_POST['usuario'];
    $mail = $_POST['email'];
    $dni = $_POST['dni'];
    $celular = $_POST['celular'];
    $fecha = date('Y-m-d');
    $hashed_password = hash("sha512", $_POST['contraseña']);

    $query = "SELECT * FROM usuario WHERE mail = '$mail';";
    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    if(mysqli_num_rows($result) == 1){
        $response['error'] = "Ya existe un usuario registrado con ese mail.";
        echo json_encode($response);
        exit();
    }

    mysqli_free_result($result);

    $query = "SELECT * FROM usuario WHERE username = '$username';";
    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    if(mysqli_num_rows($result) == 1){
        $response['error'] = "Ya existe un usuario registrado con ese usuario.";
        echo json_encode($response);
        exit();
    }

    mysqli_free_result($result);

    $query = "INSERT INTO usuario VALUES(NULL,'$username','$mail','$hashed_password','$fecha','$nombre','$apellido');";
    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    $id_siguiente_usuario = mysqli_insert_id($conn);

    $query = "INSERT INTO dom_fis VALUES(NULL,NULL,NULL,NULL,NULL)";
    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    $id_siguiente_dom_fis = mysqli_insert_id($conn);

    $query = "INSERT INTO cliente VALUES('$id_siguiente_usuario','$dni','$celular',NULL,'$id_siguiente_dom_fis')";
    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    $query = "INSERT INTO dom_env VALUES(NULL,NULL,NULL,NULL,'$id_siguiente_usuario')";
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
        isset($_POST['dni']) && isset($_POST['celular']) && isset($_POST['contraseña']) && isset($_POST['usuario'])){
            return true;
        }
        return false;
    }
?>