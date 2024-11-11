<?php

session_start();   
if (isset($_SESSION['usuario'])) {
    $User=[];
    $User['usuario']=$_SESSION['usuario'];
    $User['apellido']= $_SESSION['apellido'];
    $User['mail']= $_SESSION['mail'];
    $User['nombre']= $_SESSION['nombre'];
    $User['session_id']= $_SESSION['hash'];
    $User['id_user']= $_SESSION['id_user'];
    $User['admin']= $_SESSION['admin'];

    echo json_encode($User);
} else {
    $response['error']='No autenticado';
    echo json_encode($response);
}
?>