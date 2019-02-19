<?php
    $devolver = "";
    $conexion = new PDO('mysql:host=127.0.0.1;dbname=ruleta','root','root');

    $jg = $_GET["jg"];
    $cant = $_GET["cant"];
    $premio = $_GET["prem"];

   

    $statement = $conexion->prepare('update configuracion set numJugadores=?, numRondas = ?, premio = ?');
    $statement ->bindParam(1,$jg);
    $statement ->bindParam(2,$cant);
    $statement ->bindParam(3,$premio);
    $resultados = $statement->execute();

    
    $borrar = $conexion->prepare('delete from jugadores');

    $resultados = $borrar->execute();

    $j1 = $_GET['j1'];
    $devolver .= insertar(1,$j1);
    $j2 = $_GET['j2'];
    $devolver .= insertar(2,$j2);
    if(isset($_GET['j3']) && !empty($_GET['j3'])){
        $j3 = $_GET['j3'];
        $devolver .= insertar(3,$j3);
    }
    if(isset($_GET['j4']) && !empty($_GET['j4'])){
        $j4 = $_GET['j4'];
        $devolver .= insertar(4,$j4);
    }


    function insertar($in,$jg){
        $con = new PDO('mysql:host=127.0.0.1;dbname=ruleta','root','root');
        $insertar = $con->prepare("insert into jugadores values ($in,'$jg') ");
        $resultados = $insertar->execute(); 
        return $resultados;
    }

    echo $devolver;





?>