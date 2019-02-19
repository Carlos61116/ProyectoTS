<?php


$conexion = new PDO('mysql:host=127.0.0.1;dbname=ruleta','root','root');

$sql="select * from palabras";
$conexion->query("SET NAMES 'utf8'");
$resultados = $conexion->query($sql);
$datos = array();
foreach($resultados as $res){
    array_push($datos,$res);
}

echo json_encode($datos);


?>
