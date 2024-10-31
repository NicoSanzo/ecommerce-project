<?php

require './PHPMailer-master/src/Exception.php';
require './PHPMailer-master/src/PHPMailer.php';
require './PHPMailer-master/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


$nombre= $_POST['nombre'];
$apellido = $_POST['apellido'];
$remitente = $_POST['email'];
$comentario = $_POST['mensaje'];
$asunto= "CONTACTO: olivia Design";


$mail = new PHPMailer(true);

try {
    // Configuración del servidor SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'sanzo170@gmail.com'; // Tu dirección de correo
    $mail->Password = 'dcie vlet gfak lmyc'; // Tu contraseña o contraseña de aplicación
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    // Configuración del remitente y destinatario
    $mail->setFrom($remitente, "$nombre $apellido"); 
    $mail->addAddress('sanzo170@outlook.com'); // Destinatario
    $mail->addReplyTo($remitente); // Respuestas a esta dirección

    // Contenido del correo
    $mail->isHTML(true); // Habilitar contenido HTML
    $mail->Subject = $asunto;
    $mail->Body = "<strong>Nombre:</strong> $nombre<br><strong>Apellido:</strong> $apellido<br><br> $comentario"; // Cuerpo en HTML

    $mail->send();// Envío del correo
    echo '¡Gracias por tu mensaje!';
} catch (Exception $e) {
    echo "Hubo un problema al enviar el correo";
}












?>