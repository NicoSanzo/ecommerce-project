<?php

    require("./Checking.php");
    $dataSession= autenticarUsuario();   // es una funcion que se encuentra en checkign.php //toma los datos de usuario direco de la sesion

    $userid = $dataSession['id_user'];

    
    require("./Conexion.php");

    $query = "
        SELECT c.dni, u.nombre, u.apellido, d.* FROM cliente c
        JOIN usuario u ON c.id = u.id
        JOIN dom_fis d ON d.dom_fis_id = c.dom_fis_dom_fis_id
        WHERE c.id = '$userid';
    ";

    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    if(mysqli_num_rows($result) != 1){
        $query = "
            SELECT c.dni, u.nombre, u.apellido FROM cliente c
            JOIN usuario u ON u.id = c.id
            WHERE c.id = $userid;
        ";
        $result = mysqli_query($conn, $query);

        if(!$result){
            $response['error'] = mysqli_error($conn);
            echo json_encode($response);
            exit();
        }

        $fila = mysqli_fetch_assoc($result);
        $response['data'] = $fila;
        $response['msg'] = "No se encontró el domicilio fiscal";
        echo json_encode($response); 
        exit();
    }

    $fila = mysqli_fetch_assoc($result);
    $response['data'] = $fila;
    echo json_encode($response);
    mysqli_close($conn);
?>