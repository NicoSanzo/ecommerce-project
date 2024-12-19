<?php
require("./Checking.php");
require("./Conexion.php");


$response = [];


if (!isset($_POST['numero_operacion'])) {
    $response['error'] = "No llegaron las variables para realizar la búsqueda de la operación.";
    echo json_encode($response);
    exit;
}

$numero_operacion = mysqli_real_escape_string($conn, $_POST['numero_operacion']);

// Consulta SQL
$query = "SELECT 
    o.numero AS operacion_numero, 
    o.total, 
    o.monto_envio, 
    o.fecha, 
    o.id_envio, 
    o.forma_envio, 
    o.metodo_pago, 
    o.external_reference, 
    o.estado_pago, 
    o.estado_compra, 
    o.factura, 
    o.fecha_pago, 
    o.fecha_entrega,

    -- Cliente y Usuario
    c.id AS cliente_id, 
    c.celular,
    c.dni,
    u.username, 
    u.mail, 
    u.nombre, 
    u.apellido,
    
    -- Domicilio Fiscal
    d.dom_fis_id, 
    d.direccion AS direccion_fiscal, 
    d.localidad AS localidad_fiscal, 
    d.provincia AS provincia_fiscal,
    d.codigo_postal AS cod_pos_fiscal,

    -- Domicilio Envío
    de.direccion AS direccion_fiscal, 
    de.localidad AS localidad_fiscal, 
    de.provincia AS provincia_fiscal,
    de.codigo_postal AS cod_pos_fiscal,

    -- Detalle Operación y Publicación
    doper.cantidad, 
    doper.descuento_aplicado, 
    doper.precio_unitario,
    p.id AS publicacion_id, 
    p.titulo, 
    p.precio, 
    p.stock, 
    p.imagen, 
    p.descripcion, 
    p.cantidad_vendida

FROM operacion o
LEFT JOIN cliente c ON o.cliente_id = c.id
LEFT JOIN usuario u ON c.id = u.id
LEFT JOIN dom_fis d ON c.dom_fis_dom_fis_id = d.dom_fis_id
LEFT JOIN dom_env de ON de.cliente_id = c.id AND o.forma_envio = 'Envio'
LEFT JOIN det_oper doper ON doper.operacion_numero = o.numero
LEFT JOIN publicacion p ON doper.publicacion_id = p.id

WHERE o.numero = '$numero_operacion';";


// Ejecutar la consulta
$result = mysqli_query($conn, $query);



if (!$result) {
    $response['error'] = mysqli_error($conn);
    echo json_encode($response);
    exit;
}


$operacion = null;
$det_oper = [];



while ($row = mysqli_fetch_assoc($result)) {
    // Datos generales de la operación
    if (!$operacion) {
        $operacion = [
            'numero' => $row['operacion_numero'],
            'total' => $row['total'],
            'monto_envio' => $row['monto_envio'],
            'fecha' => $row['fecha'],
            'id_envio' => $row['id_envio'],
            'forma_envio' => $row['forma_envio'],
            'metodo_pago' => $row['metodo_pago'],
            'external_reference' => $row['external_reference'],
            'estado_pago' => $row['estado_pago'],
            'estado_venta' => $row['estado_compra'],
            'factura' => $row['factura'] ? base64_encode($row['factura']) : null,
            'fecha_pago' => $row['fecha_pago'],
            'fecha_entrega' => $row['fecha_entrega'],
            'cliente' => [
                'id' => $row['cliente_id'],
                'dni' => $row['dni'],
                'celular' => $row['celular'],
                'username' => $row['username'],
                'mail' => $row['mail'],
                'nombre' => $row['nombre'],
                'apellido' => $row['apellido'],
                'dom_fis' => [
                    'direccion' => $row['direccion_fiscal'],
                    'localidad' => $row['localidad_fiscal'],
                    'provincia' => $row['provincia_fiscal'],
                    'codigo_postal' => $row['cod_pos_fiscal']
                ],
                'dom_env' => $row['direccion_fiscal'] ? [
                    'direccion' => $row['direccion_fiscal'],
                    'localidad' => $row['localidad_fiscal'],
                    'provincia' => $row['provincia_fiscal'],
                    'codigo_postal' => $row['cod_pos_fiscal']
                ] : null
            ]
        ];
    }

    // Detalle de operación
    if ($row['publicacion_id']) {
        $det_oper[] = [
            'cantidad' => $row['cantidad'],
            'descuento_aplicado' => $row['descuento_aplicado'],
            'precio_unitario' => $row['precio_unitario'],
            'publicacion' => [
                'id' => $row['publicacion_id'],
                'titulo' => $row['titulo'],
                'precio' => $row['precio'],
                'stock' => $row['stock'],
                'imagen' => $row['imagen'],
                'descripcion' => $row['descripcion'],
                'cantidad_vendida' => $row['cantidad_vendida']
            ]
        ];
    }
}


if ($operacion) {
    $operacion['det_oper'] = $det_oper;
    $response['data'] = $operacion;
} else {
    $response['error'] = "No se encontró ninguna operación con ese número.";
}

// Depuración de JSON
$json = json_encode($response, JSON_UNESCAPED_UNICODE);

if (json_last_error() !== JSON_ERROR_NONE) {
    $response['error'] = "Error en la codificación JSON: " . json_last_error_msg();
    echo json_encode($response);
} else {
    echo $json;
}

mysqli_close($conn);
?>
