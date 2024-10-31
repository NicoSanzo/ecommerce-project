<?php

$response = []; // Inicializar la respuesta como un array

if (isset($_POST["inputFiltrado"])) {
    // Si se recibe el dato, asignarlo a la respuesta
    $response['data'] = $_POST["inputFiltrado"];
} else {
    // Si no se recibe el dato, devolver un mensaje de error
    $response['error'] = 'No se recibió ningún dato.';
}

// Convertir la respuesta a JSON y devolverla
echo json_encode($response);
?>


