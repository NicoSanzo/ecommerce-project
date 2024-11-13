<?php
    require("./Checking.php");
    require("./Conexion.php");

    if(!verificarVariables()){
        $response['error'] = "No llegaron las variables necesarias para la modificación del usuario.";
        echo json_encode($reponse);
        exit();
    }

    $direccion = $_POST['direccion_env'];
    $localidad = $_POST['localidad_env'];
    $codigo_postal = $_POST['codigo_postal_env'];
    $provincia = $_POST['provincia_env'];
    $id_user = $_SESSION['id_user'];


    $query = "UPDATE dom_env SET direccion = '$direccion', localidad = '$localidad', codigo_postal = '$codigo_postal', provincia = '$provincia' WHERE cliente_id = '$id_user'";
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
        if(isset($_POST['direccion_env']) && isset($_POST['localidad_env']) && isset($_POST['codigo_postal_env']) && isset($_POST['provincia_env'])){
            return true;
        }
        return false;
    }
?>