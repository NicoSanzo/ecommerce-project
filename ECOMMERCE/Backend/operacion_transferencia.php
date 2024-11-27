<?php
    require("./Checking.php");

    if(!verificarVariables()){
        $response['error'] = "No se obtuvo la información necesaria para poder realizar la operación.";
        echo json_encode($response);
        exit();
    }
   

    require("./Conexion.php");
    $userid = $_POST['userid'];

    $query = "
        SELECT d.* FROM cliente c
        JOIN dom_fis d ON c.dom_fis_dom_fis_id = d.dom_fis_id
        WHERE c.id = '$userid';
    ";

    $result = mysqli_query($conn, $query);
    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    $fila = mysqli_fetch_assoc($result);

   



    if($fila['direccion'] == null || $fila['direccion'] == ""){
        $response['incompleto'] = true;
        echo json_encode($response);
        exit();
    }else{
        $response['incompleto'] = false;
    }

/*
    $publicaciones = "llego";
    echo json_encode($publicaciones);
    exit();*/

    $total = $_POST['subtotalConDescuento'];
    $monto_envio = $_POST['Envio'];
    $fecha = date('Y-m-d');
    $forma_envio = $_POST['tipoEntrega'];
    $metodo_pago = $_POST['metodo_pago'];
    $estado = "Pendiente de pago.";
    $descuento = $_POST['porcentajeDescuento'];
    $publicaciones= json_decode($_POST['publisEnviadas']);
    
    //CARGA DE LA OPERACION

    $query = "INSERT INTO operacion VALUES (NULL, '$total', '$monto_envio', '$userid', '$fecha', NULL, '$forma_envio', '$metodo_pago', '$estado', NULL)";
    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

   

    $id_siguiente_operacion = mysqli_insert_id($conn);


   


    //CARGA DET_OPER DE TODAS LA PUBLICACIONES QUE SE COMPRARON


 
    $query = "INSERT INTO det_oper VALUES";
    $first_enter = true;
    foreach($publicaciones as $publicacion){
        if($first_enter){
            $query = $query . " ('$publicacion->cantidad','$publicacion->precio','$descuento','$id_siguiente_operacion','$publicacion->id')";
            $first_enter = false;
        }
        else{
            $query = $query . ", ('$publicacion->cantidad','$publicacion->precio','$descuento','$id_siguiente_operacion','$publicacion->id')";
        }
    }

  


    $query = $query . ";";

    if($first_enter){
        $response['error'] = "No se pudo ingresar el detalle de la operación.";
        echo json_encode($response);
        exit();
    }



    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }


    //MODIFICACION STOCK - 1  Y CANTIDAD VENTIDA + 1 DE TODAS LAS PUBLICACIONES QUE SE COMPRARON

    $query = "UPDATE publicacion SET stock = stock - 1, cantidad_vendida = cantidad_vendida + 1 WHERE";
    $first_enter = true;
    foreach($publicaciones as $publicacion){
        if($first_enter){
            $query = $query . " id = '$publicacion->id'";
            $first_enter = false;
        }
        else{
            $query = $query . " AND id = '$publicacion->id'";
        }
    }

    $query = $query . ";";

    if($first_enter){
        $response['error'] = "No se pudo modificar el stock ni aumentar la cantidad vendida.";
        echo json_encode($response);
        exit();
    }

    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    $response['success'] = "¡La operación fue realizada con éxito!";
    echo json_encode($response);
    mysqli_close($conn);

    function verificarVariables(){
        if(!isset($_POST['publisEnviadas']) && !isset($_POST['subtotalConDescuento']) && !isset($_POST['tipoEntrega']) && 
        !isset($_POST['porcentajeDescuento']) && !isset($_POST['Envio']) && !isset($_POST['userid']) && !isset($_POST['metodo_pago'])){
            return false;
        }
        return true;
    }
?>