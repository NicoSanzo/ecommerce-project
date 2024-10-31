
<?php
/*
$host = "bkrjdkcgbgoar2zmdogn-mysql.services.clever-cloud.com";         // Dirección del servidor de la base de datos
$username = "uwpn27hdw24lyzjj";    // Usuario de la base de datos
$password = "8YJQricO3yv1O5i9ZbT6"; // Contraseña del usuario
$database = "bkrjdkcgbgoar2zmdogn";     // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($host, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
} else {
    echo "Conexión exitosa a la base de datos.";
}*/

$username = "ADMIN"; // Reemplaza con tu nombre de usuario
$password = "IVKPi2arK2uPyG9"; // Reemplaza con tu contraseña
$connection_string = "(description=(retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.sa-santiago-1.oraclecloud.com))(connect_data=(service_name=g08f2411ef7472e_psfmort2pnbz6oxt_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))";

$conn = oci_connect($username, $password, $connection_string);

if (!$conn) {
    $e = oci_error();
    echo "Error al conectar: " . $e['message'];
} else {
    echo "Conexión exitosa!";
}

oci_close($conn);
?>

