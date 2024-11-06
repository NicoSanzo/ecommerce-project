<?php

session_start();   
if (!isset($_SESSION['usuario'])) {
    
    $response['error']='No autenticado';
    echo json_encode($response);
    session_destroy();
   
}
?>