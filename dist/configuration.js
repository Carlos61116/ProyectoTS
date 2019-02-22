"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
$(document).ready(inicio);
function inicio() {
    jugadores();
    $("input[name='jg']").click(jugadores);
    $("#enviar").click(insertarCambios);
}
function jugadores() {
    var cant;
    $("#jugadores").html(" ");
    cant = $("input[name='jg']:checked").val();
    for (var e = 0; e < cant; e++) {
        var im = document.createElement("input");
        im.id = "jugador" + (1 + e);
        im.placeholder = "Jugador" + (1 + e);
        $("#jugadores").append(im);
    }
}
function insertarCambios() {
    var jg = $("input[name='jg']:checked").val();
    var cant = $("#numRo").val();
    var prem = $("#premio").val();
    var j1 = $("#jugador1").val();
    var j2 = $("#jugador2").val();
    var j3 = $("#jugador3").val();
    var j4 = $("#jugador4").val();
    $("#cambia").html("<img src='img/loading.gif'> <br> <p>Cargando, no abandones la página<p>");
    $.ajax({
        url: "Controladores/confi.php",
        data: { jg: jg, cant: cant, prem: prem, j1: j1, j2: j2, j3: j3, j4: j4 },
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
