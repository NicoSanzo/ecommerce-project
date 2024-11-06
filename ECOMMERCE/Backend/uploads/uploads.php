/*
<?php
require("../Conexion.php");

*/
// Manejar la subida de imágenes


    // Mover el archivo subido
    

        $sql = "INSERT INTO images (url) VALUES ('$imageUrl')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["url" => $imageUrl]);
        } else {
            echo json_encode(["error" => "Database error: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "Error uploading file."]);
    }
}

// Obtener las imágenes
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM images");
    $images = [];
    while ($row = $result->fetch_assoc()) {
        $images[] = $row;
    }
    echo json_encode($images);
}

$conn->close();
?>