"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var Jugador_1 = require("./Jugador");
var Configuracion_1 = require("./Configuracion");
$(document).ready(inicio);
var conf;
function inicio() {
    cargarConfiguracion();
}
function cargarConfiguracion() {
    $.ajax({
        url: "Controladores/cargarJuego.php",
        dataType: "json",
        async: true,
        type: "GET",
        success: function (datos) {
            conf = new Configuracion_1.Configuracion(datos[0][0], datos[0][1]);
            cargarJugadores(conf);
        }, error: function () {
            $("#cambia").html("<p>Error al cargar los datos");
        }
    });
}
function cargarJugadores(conf) {
    var jugadores = Array();
    $.ajax({
        url: "Controladores/cargarJugadores.php",
        dataType: "json",
        async: true,
        type: "GET",
        success: function (datos) {
            for (var e = 0; e < datos.length; e++) {
                var Jg = new Jugador_1.Jugador(datos[e][1]);
                jugadores[e] = Jg;
            }
            crearJugadores(conf, jugadores);
        }, error: function () {
            $("#cambia").html("<p>Error al cargar los datos");
        }
    });
}
function crearJugadores(conf, jg) {
    $("#cambia").html("");
    for (var e = 0; e < conf.getJugadores(); e++) {
        var di = document.createElement("div");
        di.id = "jg" + e;
        var tr = "<table><tr><th>" + jg[e].getNombre() + "</th></tr><tr><th>Dinero</th><td>" + jg[e].getdinero() + "</td></tr><tr><th>Bote</th><td>" + jg[e].getBote() + "</td></tr></table>";
        $("#cambia").append(di);
        if (e == 0)
            $("#jg" + e).addClass("cartas activo");
        else
            $("#jg" + e).addClass("cartas");
        $("#jg" + e).html(tr);
    }
}
/*
<table><tr><th>Nombre</th><td>-</td></tr><tr><th>Dinero</th><td>200</td></tr><tr><th>Bote</th><td>50</td></tr>
</table>
*/ 
