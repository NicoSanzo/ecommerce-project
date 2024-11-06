<?php
require("./Conexion.php");



$sql = "SELECT * FROM publicacion";

$response= ejecutarConsulta($conn,$sql);

echo json_encode($response);


function ejecutarConsulta($conn, $sql) {
    $response = []; // Inicializa correctamente el arreglo 'data'
    $response['data']=[];
    $result = mysqli_query($conn, $sql);
    
    // Verifica si la consulta se realizó correctamente
    if ($result) {
        while ($fila = mysqli_fetch_assoc($result)) {
          
             array_push( $response['data'],$fila);   // Agrega el resultado al arreglo 'data'
        }
    } else {
        $response['error'] = 'Error en la consulta: ' . mysqli_error($conn);
    }
    
    return $response;
}
?>




