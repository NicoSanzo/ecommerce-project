<?php
require("./Conexion.php");


$word=$_POST["searchData"];


if (isset($_POST["inputOrder"])) {
    $order = $_POST["inputOrder"];
    
    switch($order) {
        case "Todos":
            $response['data'] = Todos($conn,$word);
            break;
        case "Menor Precio":
            $response['data'] = MenorPrecio($conn,$word);
            break;
        case "Mayor Precio":
            $response['data'] = MayorPrecio($conn,$word);
            break;
        case "Nombre: de A a Z":
            $response['data'] = AtoZ($conn,$word);
            break;
        case "Nombre: de Z a A":
            $response['data'] = ZtoA($conn,$word);
            break;
        default:
            $response['data'] = '';
    }
} else {
    // Si no se recibe el dato, devolver un mensaje de error
    $response['error'] = 'No se recibió parámetro de ordenamiento';
}

// Convertir la respuesta a JSON y devolverla
echo json_encode($response);


function Todos($conn,$word) {
    $sql = "SELECT * FROM publicacion WHERE titulo LIKE ('%" . $word ."%')";
    return ejecutarConsulta($conn, $sql);
}

function MenorPrecio($conn,$word) {
    $sql = "SELECT * FROM publicacion WHERE titulo LIKE ('%" . $word ."%') ORDER BY precio ASC";
    return ejecutarConsulta($conn, $sql);
}

function MayorPrecio($conn,$word) {
    $sql = "SELECT * FROM publicacion WHERE titulo LIKE ('%" . $word ."%') ORDER BY precio DESC";
    return ejecutarConsulta($conn, $sql);
}

function AtoZ($conn,$word) {
    $sql = "SELECT * FROM publicacion WHERE titulo LIKE ('%" . $word ."%') ORDER BY titulo ASC";
    return ejecutarConsulta($conn, $sql);
}

function ZtoA($conn,$word) {
    $sql = "SELECT * FROM publicacion WHERE titulo LIKE ('%" . $word ."%') ORDER BY titulo DESC";
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




