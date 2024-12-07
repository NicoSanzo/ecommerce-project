<?php
    header("Access-Control-Allow-Origin: *"); // Permitir solicitudes desde cualquier origen
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    require '../../vendor/autoload.php';
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
    $object->subtotalConDescuento = $_POST['subtotalConDescuento'];
    $object->Envio = $_POST['Envio'];
    $object->tipoEntrega = $_POST['tipoEntrega'];
    $object->porcentajeDescuento = $_POST['porcentajeDescuento'];
    $object->userid = $_POST['userid'];
    $object->metodo_pago = $_POST['metodo_pago'];

    $json = json_encode($object);
    
    //$json2 = urlencode($json);
    
    $success = "http://localhost/ecommerce-project/ECOMMERCE/Backend/success.php?id=94290910065";
    $preference = $client->create([
      "items" => [
          [
              "title" => "My product",
              "quantity" => 1,
              "unit_price" => 100
          ]
      ],
      "notification_url" => "https://yellow-mongoose-874974.hostingersite.com/webhook.php",
      "external_reference" => "P001",
      "metadata" => [
        "json_data" => $json
      ],
      "back_urls" => [
          "success" => "https://yellow-mongoose-874974.hostingersite.com/infoCompra", // URL al completarse el pago
          "failure" => "https://yellow-mongoose-874974.hostingersite.com/Contacto", // URL si el pago fue rechazado
          "pending" => "https://yellow-mongoose-874974.hostingersite.com/Home" // URL si el pago está pendiente
      ],
      "auto_return" => "approved" // Redirige automáticamente al success después de pago aprobado
    ]);
    
    if ($preference && isset($preference->id)) {
      //echo "Preferencia creada correctamente:\n";
      echo json_encode($preference->id);
      exit();
      //echo "URL de pago: " . $preference->init_point . "\n";
    } else {
        echo "No se pudo crear la preferencia.";
    }
 ?>


/*
    // Step 1: Require the library from your Composer vendor folder
    require_once '../../vendor/autoload.php';

    use MercadoPago\Client\Common\RequestOptions;
    use MercadoPago\Client\Payment\PaymentClient;
    use MercadoPago\Exceptions\MPApiException;
    use MercadoPago\MercadoPagoConfig;

    // Step 2: Set production or sandbox access token
    MercadoPagoConfig::setAccessToken("APP_USR-7111131958621539-112623-18e5a6e4c34a716eba1b837ed40af242-2118953311");
    // Step 2.1 (optional - default is SERVER): Set your runtime enviroment from MercadoPagoConfig::RUNTIME_ENVIROMENTS
    // In case you want to test in your local machine first, set runtime enviroment to LOCAL
    MercadoPagoConfig::setRuntimeEnviroment(MercadoPagoConfig::LOCAL);

    // Step 3: Initialize the API client
    $client = new PaymentClient();

    $idempotency_key = uniqid();

    try {

        // Step 4: Create the request array
        $request = [
            "transaction_amount" => 100,
            "token" => "YOUR_CARD_TOKEN",
            "description" => "description",
            "installments" => 1,
            "payment_method_id" => "visa",
            "payer" => [
                "email" => "user@test.com",
            ]
        ];

        // Step 5: Create the request options, setting X-Idempotency-Key
        $request_options = new RequestOptions();
        $request_options->setCustomHeaders(["X-Idempotency-Key: <SOME_UNIQUE_VALUE>"]);

        // Step 6: Make the request
        $payment = $client->create($request, $request_options);
        echo $payment->id;

    // Step 7: Handle exceptions
    } catch (MPApiException $e) {
        echo "Status code: " . $e->getApiResponse()->getStatusCode() . "\n";
        echo "Content: ";
        var_dump($e->getApiResponse()->getContent());
        echo "\n";
    } catch (\Exception $e) {
        echo $e->getMessage();
    }
 */  
?>