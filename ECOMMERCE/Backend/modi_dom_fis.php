<?php
    require("./Checking.php");
    require("./Conexion.php");

    if(!verificarVariables()){
        $response['error'] = "No llegaron las variables necesarias para la modificación del usuario.";
        echo json_encode($reponse);
        exit();
    }

    $direccion = $_POST['direccion_fis'];
    $localidad = $_POST['localidad_fis'];
    $codigo_postal = $_POST['codigo_postal_fis'];
    $provincia = $_POST['provincia_fis'];

    $id_user = $_SESSION['id_user'];


    $query = "SELECT * FROM cliente WHERE id = '$id_user';";
    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    $fila = mysqli_fetch_assoc($result);
    $dom_fis_id = $fila['dom_fis_dom_fis_id'];

    $query = "UPDATE dom_fis SET direccion = '$direccion', localidad = '$localidad', codigo_postal = '$codigo_postal', provincia = '$provincia' WHERE dom_fis_id = '$dom_fis_id';";
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
        if(isset($_POST['direccion_fis']) && isset($_POST['localidad_fis']) && isset($_POST['codigo_postal_fis']) && isset($_POST['provincia_fis'])){
            return true;
        }
        return false;
    }
?>