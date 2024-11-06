<?php
require("./Conexion.php");

header('Content-Type: application/json');
$response['data'] = [];

if (isset($_POST["itemKey"])) {

    $id = $_POST["itemKey"];

    $query = "SELECT 
    publi.id AS publicacion_id,
    publi.titulo,
    publi.precio,
    publi.stock,
    publi.imagen,
    publi.descripcion,
    prod.codigo AS producto_codigo,
    prod.modelo,
    prod.color,
    prod.alto,
    prod.ancho,
    prod.profundidad,
    prod.peso,
    cat.nombre AS categoria_nombre,
    mar.nombre AS marca_nombre
FROM 
    publicacion publi
JOIN 
    produ_publi pp ON publi.id = pp.publicacion_id
JOIN 
    producto prod ON pp.producto_codigo = prod.codigo
JOIN
    categoria cat ON prod.categoria_id = cat.id
JOIN
    marca mar ON prod.marca_id = mar.id
WHERE 
    publi.id =$id"; 

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