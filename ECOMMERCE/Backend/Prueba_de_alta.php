<?php
require("./Checking.php");

/*
if(!verificarVariables()){
    $response['error'] = "No se obtuvo la información necesaria para poder realizar el alta de la publicación.";
    echo json_encode($response);
    exit();
}*/

/*
if (isset($_FILES['imagen'])) {
    $targetDir = "uploads/";
    $targetFile = $targetDir . basename($_FILES["imagen"]["name"]);

        if (move_uploaded_file($_FILES["imagen"]["tmp_name"], $targetFile)) {
                // Generar la URL completa
                $baseUrl = "api/uploads"; // Cambia esto si es necesario
                $imageUrl = $baseUrl . $targetFile;

        }
    }
else{
    $response['error'] = "la imagen fallo";
    echo json_encode($response);
    exit();
        
    }*/


    $response = ['data' => []];  // Inicializamos correctamente el array 'data'.

    $imageUrl = null;  // Inicializamos la variable para la URL de la imagen.
    
    if (isset($_FILES['imagen'])) {
        // Establecemos la ruta donde se subirá la imagen.
        $targetDir = 'uploads/';  // Asegúrate de que esta ruta sea accesible y escribible en el servidor.
        $imageName = basename($_FILES['imagen']['name']);
        $targetFilePath = $targetDir . $imageName;
        
        // Comprobamos si el archivo es una imagen válida (opcional, pero recomendable).
        $check = getimagesize($_FILES['imagen']['tmp_name']);
        if ($check !== false) {
            // Movemos el archivo cargado a la carpeta de destino en el servidor.
            if (move_uploaded_file($_FILES['imagen']['tmp_name'], $targetFilePath)) {
                // Establecemos la URL de la imagen (asegúrate de actualizarla con tu dominio y ruta correctos).
                $imageUrl = 'api/uploads/' . $targetFilePath;
            } else {
                // Si la carga de la imagen falla, enviamos un error 500.
                http_response_code(500);
                echo json_encode(['error' => 'No se pudo subir la imagen.']);
                exit;
            }
        } else {
            // Si el archivo no es una imagen válida, enviamos un error 400.
            http_response_code(400);
            echo json_encode(['error' => 'El archivo subido no es una imagen válida.']);
            exit;
        }
    } else {
        // Si no se subió ninguna imagen, podemos dejar $imageUrl como null o asignar una imagen por defecto.
        $imageUrl = null;  // O puedes asignar una URL de imagen por defecto si es necesario.
    }
    
    // Creamos el objeto con los datos del formulario.
    $object = new stdClass();
    $object->modelo = $_POST['modelo'] ?? '';  // Usamos el operador de fusión de null para evitar errores si no existe el índice.
    $object->marca = $_POST['marca_id'] ?? '';
    $object->categoria = $_POST['categoria_id'] ?? '';
    $object->color = $_POST['color'] ?? '';
    $object->alto = $_POST['alto'] ?? '';
    $object->ancho = $_POST['ancho'] ?? '';
    $object->profundidad = $_POST['profundidad'] ?? '';
    $object->peso = $_POST['peso'] ?? '';
    $object->titulo = $_POST['titulo'] ?? '';
    $object->precio = $_POST['precio'] ?? '';
    $object->stock = $_POST['stock'] ?? '';
    $object->imagen = $imageUrl;
    $object->descripcion = $_POST['descripcion'] ?? '';
    
    // Añadimos el objeto a la respuesta.
    array_push($response['data'], $object);
    
    // Enviamos la respuesta en formato JSON.
    echo json_encode($response);

  


   /*
    
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

    $query = "INSERT INTO producto VALUES ('$id_siguiente_producto','$modelo','$color','$alto','$ancho','$profundidad','$peso','$marca','$categoria');";
    $result = mysqli_query($conn, $query);
    
    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();

    }
    mysqli_free_result($result);

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
    
    $descripcion = retornarValor("descripcion");
    
    $query = "INSERT INTO publicacion VALUES ('$id_siguiente_publicacion','$titulo','$precio','$stock','$imageUrl','$descripcion');";
    $result = mysqli_query($conn, $query);
    
    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();

    }
    mysqli_free_result($result);

    $query = "INSERT INTO produ_publi VALUES('$id_siguiente_producto','$id_siguiente_publicacion')";
    $result = mysqli_query($conn, $query);
    
    if(!$result){
        $response['error'] = mysqli_error($conn);
        echo json_encode($response);
        exit();

    }
    mysqli_free_result($result);

    $response['data'] = true;
    echo json_encode($response);

*/
function verificarVariables(){
    if(isset($_POST['modelo']) && isset($_POST['marca_id']) && isset($_POST['categoria_id']) && isset($_POST['titulo']) && isset($_POST['precio']) && isset($_POST['stock']) && isset($_POST['imagen'])){
        return true;
    }
    return false;
}

function retornarValor($campo){
    if(isset($_POST[$campo]) && $_POST[$campo] != ""){
        return $_POST[$campo];
    }
    return null;
}



?>