<?php
header('Content-Type: application/json'); // Encabezado JSON


require("./Checking.php");

$response = []; // Inicializa el array de respuesta para evitar valores nulos

// Verificar las variables requeridas
if(!verificarVariables()){
    $response['error'] = "No se obtuvo la información necesaria para poder realizar el alta de la publicación.";
    echo json_encode($response);
    exit();
}

$response['data'] = []; // Inicializa el array 'data'

$imageUrl = null;  // Inicializa la variable para la URL de la imagen

// Verificar si la imagen está presente en la solicitud
if (isset($_FILES['imagen'])) {
    $targetDir = 'uploads/';
    $imageName = basename($_FILES['imagen']['name']);
    $targetFilePath = $targetDir . $imageName;

    $check = getimagesize($_FILES['imagen']['tmp_name']);
    if ($check !== false) {
        if (move_uploaded_file($_FILES['imagen']['tmp_name'], $targetFilePath)) {
            $imageUrl = '/api/uploads/' . $imageName; // URL correcta
        } else {
            http_response_code(500);
            $response['error'] = "No se subió la imagen";
            echo json_encode($response);
            exit();
        }
    } else {
        http_response_code(400);
        $response['error'] = "Imagen no válida";
        echo json_encode($response);
        exit();
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

// Insertar en la tabla producto
$query = "INSERT INTO producto VALUES (
    NULL, 
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
    $response['error'] = mysqli_error($conn) ;
    echo json_encode($response);

    exit();
}

$id_siguiente_producto = mysqli_insert_id($conn);

$titulo = $_POST['titulo'];
$precio = $_POST['precio'];
$stock = $_POST['stock'];
$imagen = $imageUrl;  // Usa la URL de la imagen cargada en vez de $_POST['imagen']
$descripcion = retornarValor("descripcion");

// Insertar en la tabla publicacion
$query = "INSERT INTO publicacion VALUES (NULL, '$titulo', '$precio', '$stock', '$imagen', " . ($descripcion ? "'$descripcion'" : "NULL") . ", 0);";
$result = mysqli_query($conn, $query);

if(!$result){
    $response['error'] = mysqli_error($conn). "fallo en publicacion" . $precio. "precio" . $stock . "stock" . $descripcion ;
    echo json_encode($response);
    exit();
}

$id_siguiente_publicacion = mysqli_insert_id($conn);

// Relacionar producto y publicación
$query = "INSERT INTO produ_publi VALUES('$id_siguiente_producto', '$id_siguiente_publicacion')";
$result = mysqli_query($conn, $query);

if(!$result){
    $response['error'] = mysqli_error($conn);
    echo json_encode($response);
    exit();
}

//$response['success'] = true;

$json_response = json_encode($response);
if ($json_response === false) {
    // Error en la codificación JSON
    $response['error'] = json_last_error_msg();
    http_response_code(500);
    echo json_encode($response);
} else {
    // Respuesta correcta
     $response['success'] = true;
     echo json_encode($response);
}

mysqli_close($conn);

// Función para verificar las variables requeridas
function verificarVariables(){
    return isset($_POST['modelo']) && isset($_POST['marca_id']) && isset($_POST['categoria_id']) && isset($_POST['titulo']) && isset($_POST['precio']) && isset($_POST['stock']);
}

// Función para retornar valores o NULL si no existe
function retornarValor($campo){
    return isset($_POST[$campo]) && $_POST[$campo] != "" ? $_POST[$campo] : null;
}
?>
