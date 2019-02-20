"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var Jugador_1 = require("./Jugador");
var Configuracion_1 = require("./Configuracion");
var Palabras_1 = require("./Palabras");
$(document).ready(inicio);
var conf;
var jug = Array();
var palabras = Array();
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
            cargarJugadores();
            cargarPalabras();
            crearPanel();
        }, error: function () {
            $("#cambia").html("<p>Error al cargar los datos");
        }
    });
}
function cargarJugadores() {
    $.ajax({
        url: "Controladores/cargarJugadores.php",
        dataType: "json",
        async: false,
        type: "GET",
        success: function (datos) {
            for (var e = 0; e < datos.length; e++) {
                jug[e] = new Jugador_1.Jugador(datos[e][1]);
                if (e == 0) {
                    jug[e].activar();
                }
            }
            crearJugadores();
        }, error: function () {
            $("#cambia").html("<p>Error al cargar los datos");
        }
    });
}
function cargarPalabras() {
    $.ajax({
        url: "Controladores/cargarPalabras.php",
        dataType: "json",
        data: { cantPa: conf.getRondas() },
        async: false,
        type: "GET",
        success: function (datos) {
            for (var e = 0; e < datos.length; e++) {
                palabras[e] = new Palabras_1.Palabras(datos[e][1], datos[e][2]);
                console.log(palabras[e]);
            }
        }, error: function () {
            $("#cambia").html("<p>Error al cargar los datos");
        }
    });
}
function crearJugadores() {
    $("#cambia").html("");
    for (var e = 0; e < conf.getJugadores(); e++) {
        var di = document.createElement("div");
        di.id = "jg" + e;
        var tr = "<table><tr><th>" + jug[e].getNombre() + "</th></tr><tr><th>Dinero</th><td>" + jug[e].getdinero() + "</td></tr><tr><th>Bote</th><td>" + jug[e].getBote() + "</td></tr></table>";
        $("#cambia").append(di);
        if (jug[e].isActive())
            $("#jg" + e).addClass("cartas activo");
        else
            $("#jg" + e).addClass("cartas");
        $("#jg" + e).html(tr);
    }
}
function crearPanel() {
    for (var e = 0; e < palabras[0].getPalabra().length; e++) {
        var di = document.createElement("div");
        //  di.textContent = palabras[0].getPalabra().charAt(e);
        di.className = "adivinar";
        di.id = palabras[0].getPalabra().charAt(e);
        $("#palabra").append(di);
    }
    $("#pista").append("<p> Pista: " + palabras[0].getPista() + "</p>");
}
