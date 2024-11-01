<?php
require("./Conexion.php");

//($query = "SELECT * FROM publicacion WHERE titulo LIKE ('%" . $word ."%')";
$response['data'] = [];

if (isset($_POST["inputSearchValue"])) {

    $word = $_POST["inputSearchValue"];
    $query = "SELECT * FROM publicacion WHERE titulo LIKE ('%" . $word ."%')";
    $result = mysqli_query($conn, $query);
    
    if(mysqli_num_rows($result) > 0){
        while($fila = mysqli_fetch_assoc($result)){
            array_push($response['data'], $fila);
        }
    }else{
        $response['error'] = "No hay coincidencias con su búsqueda";
    }
    
} else {
    // Si no se recibe el dato, devolver un mensaje de error
    $response['error'] = 'No se recibió parámetro de búsqueda.';
}

// Convertir la respuesta a JSON y devolverla
echo json_encode($response);

?>




