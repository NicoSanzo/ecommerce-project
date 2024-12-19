<?php
    header("Access-Control-Allow-Origin: *"); // Permitir solicitudes desde cualquier origen
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    
    require("./Conexion.php");
    
    require "./Checking.php";
    $dataSession = autenticarUsuario();
    $userid = $dataSession['id_user'];
    
    require '../vendor/autoload.php';
    use MercadoPago\Client\Preference\PreferenceClient;
    use MercadoPago\Client\Common\RequestOptions;
    use MercadoPago\MercadoPagoConfig;
    use MercadoPago\Client\Payment\PaymentClient;
    $cliente = new PaymentClient();
    $idempotency_key = uniqid();

    MercadoPagoConfig::setAccessToken("APP_USR-4438792683199166-111319-32c637e4aa108f2faec5148c0b1ce442-728183787");
    //MercadoPagoConfig::setRuntimeEnviroment(MercadoPagoConfig::LOCAL);

    $client = new PreferenceClient();
    $request_options = new RequestOptions();
    $request_options->setCustomHeaders(["X-Idempotency-Key: $idempotency_key"]);

    $publisEnviadas = json_decode($_POST['publisEnviadas']);

    $object= new stdClass();
    $object->publisEnviadas = $publisEnviadas;
    $object->total = $_POST['total'];
    $object->Envio = $_POST['Envio'];
    $object->tipoEntrega = $_POST['tipoEntrega'];
    $object->porcentajeDescuento = $_POST['porcentajeDescuento'];
    $object->userid = $userid;
    $object->metodo_pago = $_POST['metodo_pago'];
    
    $fecha = new DateTime();
    $fecha->modify('-3 hours');
    $fecha = $fecha->format('Y-m-d H:i:s');
    $object->fecha = $fecha;
    
    $fecha_pago = new DateTime();
    $fecha_pago->modify('-3 hours');
    $fecha_pago = $fecha_pago->format('Y-m-d H:i:s');
    $object->fecha_pago = $fecha;
    
    $json = json_encode($object);
    
   //OBTENER ULTIMO ID Y CREAR EL CAMPO EXTERNAL_REFERENCE
    
    $query = "SELECT numero FROM operacion ORDER BY numero DESC LIMIT 1;";
    $result = mysqli_query($conn, $query);

    if(!$result){
      $response['error'] = mysqli_error($conn);
      echo json_encode($response);
      exit();
    }

    $fila = mysqli_fetch_assoc($result);
    $id_ultima_operacion = $fila['numero'] + 1;
    $external_reference = "P" . $id_ultima_operacion;
    
    //CREACION ARRAY DE ITEMS
    
    $items = [];
    foreach($publisEnviadas as $publicacion){
     $item['title'] = $publicacion->titulo ?? "Sin título";
     $item['quantity'] = $publicacion->cantidad;
     $item['unit_price'] = (float) str_replace(',', '.', $publicacion->precio);
     array_push($items, $item);
    }
    
    if($object->tipoEntrega == "Envio"){
        $item['title'] = "Envio";
        $item['quantity'] = 1;
        $item['unit_price'] = (float) str_replace(',', '.', $object->Envio);
        array_push($items, $item);
    }
    
    $preference = $client->create([
      "items" =>  $items,
      "notification_url" => "https://yellow-mongoose-874974.hostingersite.com/webhook_final.php",
      "external_reference" => $external_reference,
      "metadata" => [
        "json_data" => $json
      ],
      "back_urls" => [
          "success" => "https://yellow-mongoose-874974.hostingersite.com/Compras", // URL al completarse el pago
          "failure" => "https://yellow-mongoose-874974.hostingersite.com/Contacto", // URL si el pago fue rechazado
          "pending" => "https://yellow-mongoose-874974.hostingersite.com/infoCompra" // URL si el pago está pendiente
      ],
      "auto_return" => "approved" // Redirige automáticamente al success después de pago aprobado
    ]);
    
    
    if ($preference && isset($preference->id)) {
      //echo "Preferencia creada correctamente:\n";
      $response['PreferenceID'] = $preference->id;
      echo json_encode($response);
      exit();
      
      //echo "URL de pago: " . $preference->init_point . "\n";
    } else {
        
    
        echo json_encode("No se pudo crear la preferencia.");
    }
 ?>