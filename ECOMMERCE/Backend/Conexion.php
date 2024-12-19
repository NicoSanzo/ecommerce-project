
<?php

$host = "srv1781.hstgr.io";         // Dirección del servidor de la base de datos
$username = "u505134983_OliviaDesignDB";    // Usuario de la base de datos
$password = "Proyecto1234"; // Contraseña del usuario
$database = "u505134983_OLIVIA_DESIGN";     // Nombre de la base de datos

// Crear conexión
$conn = mysqli_connect($host, $username, $password, $database);

if(!$conn){
    die("Conexión fallida" . mysqli_connect_error());
}

?>

