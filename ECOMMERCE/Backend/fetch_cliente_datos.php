<?php
    require("./Checking.php");
    require("./Conexion.php");
    
    $response = [];
    $response['data'] = [];

     $id_user = $_SESSION['id_user'];
    $admin = $_SESSION['admin'];
    

     $query = "SELECT * FROM usuario WHERE id = '$id_user';";
     $result = mysqli_query($conn, $query);
     if(mysqli_num_rows($result) != 1){
        $response['error'] = "No existe el usuario...";
        echo json_encode($response);
        exit();
     }

     $fila = mysqli_fetch_assoc($result);

     $object = new stdClass();
     $object->username = $fila['username'];
     $object->mail = $fila['mail'];
     $object->fecha_alta = $fila['fecha_alta'];
     $object->nombre = $fila['nombre'];
     $object->apellido = $fila['apellido'];
     


     if(!$admin){
        $query = "SELECT * FROM cliente WHERE id = '$id_user';";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) != 1){
            $response['error'] = "No existe el cliente...";
            echo json_encode($response);
            exit();
        }

        $fila = mysqli_fetch_assoc($result);
        $object->dni = $fila['dni'];
        $object->celular = $fila['celular'];
        $object->fecha_nacimiento = $fila['fecha_nacimiento'];
        $object->dom_fis_dom_fis_id = $fila['dom_fis_dom_fis_id'];

        mysqli_free_result($result);


   

        $query = "SELECT dom_fis_dom_fis_id FROM cliente WHERE id = '$id_user'";
        $result = mysqli_query($conn, $query);

        if(!$result){
            $response['error'] = mysqli_error($conn);
            echo json_encode($response);
            exit();
        }

        $fila = mysqli_fetch_assoc($result);
        $dom_fis_id = $fila['dom_fis_dom_fis_id'];

        if($dom_fis_id){
            $query = "SELECT * FROM dom_fis WHERE dom_fis_id = '$dom_fis_id'";
            $result = mysqli_query($conn, $query);
            if(mysqli_num_rows($result) != 1){
                $response['error'] = "No existe el domicilio fiscal del cliente.";
                echo json_encode($response);
                exit();
            }
    
            $fila = mysqli_fetch_assoc($result);
            $object->direccion_fis = $fila['direccion'];
            $object->localidad_fis = $fila['localidad'];
            $object->provincia_fis = $fila['provincia'];
            $object->codigo_postal_fis = $fila['codigo_postal'];
            $object->dom_fis_id = $fila['dom_fis_id'];
    
            mysqli_free_result($result);

        }


        $query = "SELECT * FROM dom_env WHERE cliente_id = '$id_user';";
        $result = mysqli_query($conn, $query);
        
        if(mysqli_num_rows($result) == 1){
            $fila = mysqli_fetch_assoc($result);
            $object->direccion_env = $fila['direccion'];
            $object->localidad_env = $fila['localidad'];
            $object->provincia_env = $fila['provincia'];
            $object->codigo_postal_env = $fila['codigo_postal'];    
        }


     }else{
        mysqli_free_result($result);
        $query = "SELECT * from administrador WHERE id = '$id_user';";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) != 1){
            $response['error'] = "Error al encontrar al administrador.";
            echo json_encode($response);
            exit();
        }
        $fila = mysqli_fetch_assoc($result);
        $object->vencimiento_clave = $fila['vencimiento_clave'];
     }

  

    array_push($response['data'], $object);
    echo json_encode($response);
    mysqli_close($conn);

?>