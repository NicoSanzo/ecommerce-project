<?php
    require("./Checking.php");
    require("./Conexion.php");

    $dataSession= autenticarUsuario();  
    $id_user = $dataSession['id_user'];

  // Verificar si el usuario está autenticado
if (!isset($id_user)) {
    $response['error'] = 'No se ha iniciado sesión.';
    echo json_encode($response);
    exit();
}

if (!verificarVariables()) {
    $response['error'] = "No llegaron las variables necesarias para la modificación del usuario.";
    echo json_encode($response);
    exit();
}

// Obtener las variables
$username = $_POST['usuario'];
$mail = $_POST['mail'];
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];


// Validación de correo electrónico
if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
    $response['error'] = 'Correo electrónico no válido.';
    echo json_encode($response);
    exit();
}

// Consultas preparadas para evitar inyecciones SQL
$query = "UPDATE usuario SET username = ?, mail = ?, nombre = ?, apellido = ? WHERE id = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "ssssi", $username, $mail, $nombre, $apellido, $id_user);
$result = mysqli_stmt_execute($stmt);

if (!$result) {
    $response['error'] = mysqli_error($conn);
    echo json_encode($response);
    exit();
}
mysqli_stmt_close($stmt);

$response['data'] = true;
echo json_encode($response);

// Actualización en la tabla cliente
$dni = $_POST['dni'];
$celular = $_POST['celular'];
$fecha_nacimiento = $_POST['fecha_nacimiento'];

$query = "UPDATE cliente SET dni = ?, celular = ?, fecha_nacimiento = ? WHERE id = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "ssss", $dni, $celular, $fecha_nacimiento, $id_user);
$result = mysqli_stmt_execute($stmt);

if (!$result) {
    $response['error'] = mysqli_error($conn);
    echo json_encode($response);
    exit();
}
mysqli_stmt_close($stmt);

// Respuesta exitosa


function verificarVariables() {
    return isset($_POST['usuario'], $_POST['mail'], $_POST['nombre'], $_POST['apellido'], $_POST['dni'], $_POST['celular'], $_POST['fecha_nacimiento']);
}
?>