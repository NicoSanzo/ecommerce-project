<?php
require("./Checking.php");
require("./Conexion.php");

$response = []; // Inicializamos un array para la respuesta.

if (!verificarVariables()) {
    $response['error'] = "No se obtuvieron las variables necesarias para modificar la publicación.";
    echo json_encode($response);
    exit();
}

if (isset($_FILES['imagen'])) {
    $targetDir = 'uploads/';
    $imageName = basename($_FILES['imagen']['name']);
    $targetFilePath = $targetDir . $imageName;

    $check = getimagesize($_FILES['imagen']['tmp_name']);
    if ($check !== false) {
        if (move_uploaded_file($_FILES['imagen']['tmp_name'], $targetFilePath)) {
            $imageUrl = 'api/uploads/' . $imageName; // URL correcta
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
} else {
    $imageUrl = null;
}

$modelo = $_POST['modelo'];
$color = retornarValor("color");
$alto = retornarValor("alto");
$ancho = retornarValor("ancho");
$profundidad = retornarValor("profundidad");
$peso = retornarValor("peso");
$marca_id = $_POST['marca_id'];
$categoria_id = $_POST['categoria_id'];
$id_publicacion = $_POST['id_publicacion'];
$codigo_producto = $_POST['codigo_producto'];

try {
    $query = "UPDATE producto SET modelo = '$modelo', color = '$color', alto = '$alto', ancho = '$ancho', profundidad = '$profundidad', peso = '$peso', marca_id = '$marca_id', categoria_id = '$categoria_id' WHERE codigo = '$codigo_producto';";
    $result = mysqli_query($conn, $query);
    if (!$result) {
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    $titulo = $_POST['titulo'];
    $precio = $_POST['precio'];
    $stock = $_POST['stock'];
    $descripcion = retornarValor("descripcion");

    if ($imageUrl === null) {
        $query = "UPDATE publicacion SET titulo = '$titulo', precio = '$precio', stock = '$stock', descripcion = '$descripcion' WHERE id = '$id_publicacion';";
    } else {
        $query = "UPDATE publicacion SET titulo = '$titulo', precio = '$precio', stock = '$stock', imagen = '$imageUrl', descripcion = '$descripcion' WHERE id = '$id_publicacion';";
    }

    $result = mysqli_query($conn, $query);
    if (!$result) {
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();
    }

    $response['data'] = true;
    echo json_encode($response);
    mysqli_close($conn);
} catch (Exception $ex) {
    $response['error'] = "Hubo un error al modificar la publicación: " . $ex->getMessage();
    echo json_encode($response);
    exit();
}

function verificarVariables(){
    return isset($_POST['modelo'], $_POST['marca_id'], $_POST['categoria_id'], $_POST['titulo'], $_POST['precio'], $_POST['stock'], $_POST['id_publicacion'], $_POST['codigo_producto']);
}

function retornarValor($campo) {
    return isset($_POST[$campo]) && $_POST[$campo] !== "" ? $_POST[$campo] : null;
}
?>