<?php

require("./Checking.php");
$dataSession = autenticarUsuario();   // Obtiene los datos de la sesión
$userid = $dataSession['id_user'];

require("./Conexion.php");


$query = "
    SELECT c.dni, c.celular, u.nombre, u.apellido, d.direccion, d.localidad, d.provincia , d.codigo_postal
    FROM cliente c
    JOIN usuario u ON c.id = u.id
    JOIN dom_env d ON d.cliente_id = c.id
    WHERE c.id = $userid
";

$result = mysqli_query($conn, $query);


if (!$result) {
    $response['error'] = mysqli_error($conn);
    echo json_encode($response);
    exit();
}

if (mysqli_num_rows($result) > 0) {
    $fila = mysqli_fetch_assoc($result);
    $response['data'] = $fila;
    echo json_encode($response);
} else {
    $response['msg'] = "No se encontró el domicilio de envío";
    echo json_encode($response);
}

mysqli_close($conn);
?>