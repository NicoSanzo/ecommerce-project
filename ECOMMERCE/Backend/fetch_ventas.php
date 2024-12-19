<?php
    require ("./Conexion.php");
    require ("./Checking.php");

    $query = "SELECT * FROM operacion";
    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    if(mysqli_num_rows($result) == 0){
        $response['data'] = "No has realizado ninguna venta.";
    }

    //CONSEGUIMOS LOS DATOS DE LA QUERY
    $array_operaciones = [];
    while($fila = mysqli_fetch_assoc($result)){
        array_push($array_operaciones, $fila);
    }

    $query = "SELECT * FROM det_oper d
            JOIN publicacion p ON d.publicacion_id = p.id;";
    $result = mysqli_query($conn, $query);

    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    $array_det_oper = [];
    while($fila = mysqli_fetch_assoc($result)){
        array_push($array_det_oper, $fila);
    }

    $query = "
        SELECT c.*, u.username, u.mail, u.nombre, u.apellido FROM usuario u
        JOIN cliente c ON c.id = u.id";

    $first_enter = true;
    $userid = 0;
    foreach($array_operaciones as $operacion){
        $different = false;
        if($userid != $operacion['cliente_id']){
            $userid = $operacion['cliente_id'];
            $different = true;
        }

        if($first_enter && $different){
            $query = $query . " WHERE c.id IN ($userid";
            $first_enter = false;
        }else if ($different){
            $query = $query . ", $userid";
        }
    }
    $query = $query . ");";


    $result = mysqli_query($conn, $query);
    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    while($fila = mysqli_fetch_assoc($result)){
        $client_id = strval($fila['id']);
        $array_clientes[$client_id] = $fila;
    }
    
    $array_general = [];
    foreach($array_operaciones as $operacion){ 
        $object = new stdClass();
        $object->numero = $operacion['numero'];
        $object->total = $operacion['total'];
        $object->monto_envio = $operacion['monto_envio'];
        $object->cliente = $array_clientes[$operacion['cliente_id']];
        $object->fecha = $operacion['fecha'];
        $object->id_envio = $operacion['id_envio'];
        $object->forma_envio = $operacion['forma_envio'];
        $object->metodo_pago = $operacion['metodo_pago'];
        $object->external_reference = $operacion['external_reference'];
        $object->estado_pago = $operacion['estado_pago'];
        $object->estado_compra = $operacion['estado_compra'];
        if ($operacion['factura']==null){
            $object->factura = $operacion['factura'];
        }else{
            $object->factura = base64_encode($operacion['factura']);
        }
        $object->fecha_pago = $operacion['fecha_pago'];
        $object->fecha_entrega = $operacion['fecha_entrega'];

        //CAMPO DET_OPER
        $object->det_oper = [];

        foreach($array_det_oper as $det_oper){
            if($det_oper['operacion_numero'] == $object->numero){
                $detalle = new stdClass();
                $detalle->cantidad = $det_oper['cantidad'];
                $detalle->descuento_aplicado = $det_oper['descuento_aplicado'];
                $detalle->precio_unitario = $det_oper['precio_unitario'];
                $detalle->operacion_numero = $det_oper['operacion_numero'];

                $publi = new stdClass();
                $publi->id = $det_oper['id'];
                $publi->titulo = $det_oper['titulo'];
                $publi->precio = $det_oper['precio'];
                $publi->stock = $det_oper['stock'];
                $publi->imagen = $det_oper['imagen'];
                $publi->descripcion = $det_oper['descripcion'];
                $publi->cantidad_vendida = $det_oper['cantidad_vendida'];
                $detalle->publicacion = $publi;
                array_push($object->det_oper, $detalle);
            }
        }
        array_push($array_general, $object);
    }
    mysqli_close($conn);

    $response['data'] = $array_general;
    echo json_encode($response);
?>

