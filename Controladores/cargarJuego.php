<?php

    $conexion = new PDO('mysql:host=127.0.0.1;dbname=ruleta','root','root');

    $statement = $conexion->prepare('select * from configuracion');

    $resultados = $statement->execute();
    
    



?>