<?php

require "./Checking.php";

$dataSession = autenticarUsuario(); // Función que toma los datos del usuario desde la sesión
$userid = $dataSession['id_user'];

if (!isset($_POST['numero_operacion']) || !isset($_FILES['file'])) {
    $response['error'] = "No llegaron las variables necesarias o el archivo para realizar la operación.";
    echo json_encode($response);
    exit();
}

require "./Conexion.php";

$numero_operacion = $_POST['numero_operacion'];

// Obtener el cliente_id de la operación
$query = "SELECT cliente_id FROM operacion WHERE numero = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "s", $numero_operacion);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if (!$result) {
    $response['error'] = mysqli_error($conn);
    echo json_encode($response);
    exit();
}

$operacion = mysqli_fetch_assoc($result);

// Verificar si el cliente_id corresponde al usuario autenticado
if ($operacion['cliente_id'] != $userid) {
    $response['error'] = "No tienes permiso para acceder a esta operación.";
    echo json_encode($response);
    exit();
}

// Validar el archivo subido
$archivoTmp = $_FILES['file']['tmp_name'];
$archivoContenido = file_get_contents($archivoTmp);

// Validaciones adicionales
$maxSize = 5 * 1024 * 1024;
$allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];

if ($_FILES['file']['size'] > $maxSize) {
    $response['error'] = "El archivo es demasiado grande. Máximo permitido: 5MB.";
    echo json_encode($response);
    exit();
}

if (!in_array($_FILES['file']['type'], $allowedTypes)) {
    $response['error'] = "Tipo de archivo no permitido. Solo se permiten PDF, JPEG y PNG.";
    echo json_encode($response);
    exit();
}

// Actualizar el comprobante de pago
$query = "UPDATE operacion SET comprobante_pago = ? WHERE numero = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "bs", $archivoContenido, $numero_operacion);
mysqli_stmt_send_long_data($stmt, 0, $archivoContenido);

if (mysqli_stmt_execute($stmt)) {
    $response['success'] = "Operación actualizada con éxito.";
} else {
    $response['error'] = "Error al actualizar la operación: " . mysqli_error($conn);
}

echo json_encode($response);
mysqli_close($conn);

?>