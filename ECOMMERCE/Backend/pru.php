<?php
require("./Checking.php");

$response= [];



$formdata = $_POST['titulo'];
$formdata = $_POST['titulo'];
$formdata = $_POST['titulo'];
$formdata = $_POST['titulo'];
$formdata = $_POST['titulo'];
$formdata = $_POST['titulo'];

//$response['data1'] = $_POST['categoria_id'];
/*
$response['data'] = $_POST['color'];
$response['data'] = $_POST['alto'];
$response['data'] = $_POST['ancho'];
$response['data'] = $_POST['profundidad'];
$response['data'] = $_POST['peso'];
$response['data'] = $_POST['titulo'];
$response['data'] = $_POST['precio'];
$response['data'] = $_POST['stock'];
//$response['data'] = $_POST['imagen'];
$response['data'] = $_POST['descripcion'];*/



echo json_encode($formdata);
exit();
?>