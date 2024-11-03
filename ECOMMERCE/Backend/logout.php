<?php
session_start();
session_destroy(); // Destruye la sesión
echo json_encode(['success' => true]);
?>