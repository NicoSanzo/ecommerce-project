<?php
header('Content-Type: application/json'); // Encabezado JSON

require("./Checking.php");

$response = []; // Inicializa el array de respuesta para evitar valores nulos

if(!verificarVariables()){
    $response['error'] = "No se obtuvo la información necesaria para poder realizar el alta de la publicación.";
    echo json_encode($response);
    exit();
}

$response['data'] = []; // Inicializa el array 'data'

$imageUrl = null;  // Inicializa la variable para la URL de la imagen

if (isset($_FILES['imagen'])) {
    $targetDir = 'uploads/';
    $imageName = basename($_FILES['imagen']['name']);
    $targetFilePath = $targetDir . $imageName;

    $check = getimagesize($_FILES['imagen']['tmp_name']);
    if ($check !== false) {
        if (move_uploaded_file($_FILES['imagen']['tmp_name'], $targetFilePath)) {
            $imageUrl = 'api/uploads/' . $imageName; // Corrige la URL aquí
        } else {
            http_response_code(500);
            $response['error'] = "no se subio la imagen";
            echo json_encode($response);
            exit;
        }
    } else {
        http_response_code(400);
        $response['error'] = "imagen no valida";
        echo json_encode($response);
        exit;
    }
}

$modelo = $_POST['modelo'];
$marca = $_POST['marca_id'];
$categoria = $_POST['categoria_id'];
$color = retornarValor("color");
$alto = retornarValor("alto");
$ancho = retornarValor("ancho");
$profundidad = retornarValor("profundidad");
$peso = retornarValor("peso");

require("./Conexion.php");

$query = "SELECT count(codigo) AS cantidad FROM producto;";
$result = mysqli_query($conn, $query);
if(!$result ){
    $response['error'] = "No se pudo obtener el siguiente número de ID.";
    echo json_encode($response);
    exit();
}
$fila = mysqli_fetch_assoc($result);
$id_siguiente_producto = $fila['cantidad'] + 1;
mysqli_free_result($result);

$query = "INSERT INTO producto VALUES (
    '$id_siguiente_producto', 
    '$modelo', 
    " . ($color ? "'$color'" : "NULL") . ", 
    " . ($alto ? "'$alto'" : "NULL") . ", 
    " . ($ancho ? "'$ancho'" : "NULL") . ", 
    " . ($profundidad ? "'$profundidad'" : "NULL") . ", 
    " . ($peso ? "'$peso'" : "NULL") . ", 
    '$marca', 
    '$categoria'
);";
$result = mysqli_query($conn, $query);

if(!$result){
    $response['error'] = mysqli_error($conn);
    echo json_encode($response);
    exit();
}

$response['data'][] = "Paso ingreso Producto";

$query = "SELECT count(id) AS cantidad FROM publicacion;";
$result = mysqli_query($conn, $query);
if(!$result ){
    $response['error'] = "No se pudo obtener el siguiente número de ID.";
    echo json_encode($response);
    exit();
}
$fila = mysqli_fetch_assoc($result);
$id_siguiente_publicacion = $fila['cantidad'] + 1;
mysqli_free_result($result);

$titulo = $_POST['titulo'];
$precio = $_POST['precio'];
$stock = $_POST['stock'];
$imagen = $imageUrl;  // Usa la URL de la imagen cargada en vez de $_POST['imagen']
$descripcion = retornarValor("descripcion");

$query = "INSERT INTO publicacion VALUES ('$id_siguiente_publicacion','$titulo','$precio','$stock','$imagen'," . ($descripcion ? "'$descripcion'" : "NULL") . ");";
$result = mysqli_query($conn, $query);

if(!$result){
    $response['error'] = mysqli_error($conn);
    echo json_encode($response);
    exit();
}

$query = "INSERT INTO produ_publi VALUES('$id_siguiente_producto','$id_siguiente_publicacion')";
$result = mysqli_query($conn, $query);

if(!$result){
    $response['error'] = mysqli_error($conn);
    echo json_encode($response);
    exit();
}

$response['data'][] = "Publicación y producto creados exitosamente";
$response['success'] = true;
echo json_encode($response);
mysqli_close($conn);

function verificarVariables(){
    if(isset($_POST['modelo']) && isset($_POST['marca_id']) && isset($_POST['categoria_id']) && isset($_POST['titulo']) && isset($_POST['precio']) && isset($_POST['stock'])){
        return true;
    }
    return false;
}

function retornarValor($campo){
    return isset($_POST[$campo]) && $_POST[$campo] != "" ? $_POST[$campo] : null;
}
?>