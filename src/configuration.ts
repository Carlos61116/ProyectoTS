import * as $ from 'jquery';


$(document).ready(inicio);


function inicio() {
    jugadores();
    $("input[name='jg']").click(jugadores);
    $("#enviar").click(insertarCambios);
}

function jugadores() {
    var cant;
    $("#jugadores").html(" ");
    cant = ($("input[name='jg']:checked").val() as Number);
    for (var e: number = 0; e < cant; e++) {
        let im = document.createElement("input");
        im.id = "jugador" + (1 + e);
        im.placeholder = "Jugador" + (1 + e);
        $("#jugadores").append(im);
    }
}


function insertarCambios() {
    var jg = ($("input[name='jg']:checked").val() as Number);
    var cant = ($("#numRo").val() as Number);
    var prem = ($("#premio").val() as Number);
    
    var j1 = ($("#jugador1").val() as String);
    var j2 = ($("#jugador2").val() as String);
    
    var j3 = ($("#jugador3").val() as String);
    var j4 = ($("#jugador4").val() as String);
    
    $("#cambia").html("<img src='img/loading.gif'> <br> <p>Cargando, no abandones la página<p>");
    $.ajax({

        url: "../Controladores/confi.php",

        data: { jg: jg, cant: cant, prem: prem, j1: j1 ,j2: j2,j3: j3,j4: j4 },
        dataType: "json",
        async: true,
        type: "GET",

        success: function () {


            $("#cambia").html("<p>Se han realizado los cambios sin problemas</p>");

        }, error: function () {

            
            $("#cambia").html("<p>No se ha introducido debido a errores </p>");

        }
    });
}