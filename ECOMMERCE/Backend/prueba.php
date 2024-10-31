<?php
require("./Conexion.php");

if (isset($_POST["inputFiltrado"])) {
    $order = $_POST["inputFiltrado"];
    
    switch($order) {
        case "Todos":
            $response['data'] = Todos($conn);
            break;
        case "Menor Precio":
            $response['data'] = MenorPrecio($conn);
            break;
        case "Mayor Precio":
            $response['data'] = MayorPrecio($conn);
            break;
        case "Nombre: de A a Z":
            $response['data'] = AtoZ($conn);
            break;
        case "Nombre: de Z a A":
            $response['data'] = ZtoA($conn);
            break;
        default:
            $response['data'] = "nada";
    }
} else {
    // Si no se recibe el dato, devolver un mensaje de error
    $response['error'] = 'No se recibió parámetro de ordenamiento';
}

// Convertir la respuesta a JSON y devolverla
echo json_encode($response);


function Todos($conn) {
    $sql = "SELECT * FROM publicacion";
    return ejecutarConsulta($conn, $sql);
}

function MenorPrecio($conn) {
    $sql = "SELECT * FROM publicacion ORDER BY precio ASC";
    return ejecutarConsulta($conn, $sql);
}

function MayorPrecio($conn) {
    $sql = "SELECT * FROM publicacion ORDER BY precio DESC";
    return ejecutarConsulta($conn, $sql);
}

function AtoZ($conn) {
    $sql = "SELECT * FROM publicacion ORDER BY titulo ASC";
    return ejecutarConsulta($conn, $sql);
}

function ZtoA($conn) {
    $sql = "SELECT * FROM publicacion ORDER BY titulo DESC";
    return ejecutarConsulta($conn, $sql);
}

function ejecutarConsulta($conn, $sql) {
    $response = [];
    $result = mysqli_query($conn, $sql);
    while ($fila = mysqli_fetch_assoc($result)) {
        array_push($response, $fila);
    }
    return $response;
}
?>




