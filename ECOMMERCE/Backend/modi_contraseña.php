<?php
    require("./Checking.php");
    require("./Conexion.php");

    if(!isset($_POST['contraseña_actual']) && !isset($_POST['contraseña_nueva'])){
        $response['error '] = "No llegaron las variables para hacer la modifiación de la contraseña.";
        echo json_encode($response);
        exit();
    }

    $contraseña_actual = hash("sha512", $_POST['contraseña_actual']); 
    $contraseña_nueva = hash("sha512", $_POST['contraseña_nueva']);
    $id_user = $_SESSION['id_user'];

    $query = "SELECT * FROM usuario WHERE contrasena = '$contraseña_actual' AND id = '$id_user';";
    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    if(mysqli_num_rows($result) != 1){
        $response['contraseña_incorrecta'] = "La contraseña actual ingresada no es correcta.";
        echo json_encode($response);
        exit();
    }

    $query = "UPDATE usuario SET contrasena = '$contraseña_nueva' WHERE id = '$id_user';";
    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    $response['data'] = true;
    echo json_encode($response);
    mysqli_close($conn);
?>