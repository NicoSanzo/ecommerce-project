<?php

session_start();

if (isset($_SESSION['usuario'])) {
    $User=[];
    $User['usuario']=$_SESSION['usuario'];
    $User['apellido']= $_SESSION['apellido'];
    $User['mail']= $_SESSION['mail'];
    $User['nombre']= $_SESSION['nombre'];
    $User['session_id']= $_SESSION['hash'];
    echo json_encode($User);
} else {
    http_response_code(401); // No autenticado
    echo json_encode(['error' => 'No autenticado']);
}
?>