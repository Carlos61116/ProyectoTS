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
    consonantes();
    $("#cons").click(consonantes);
    $("#voc").click(vocales);
    $("#adv").click(adivinar);
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
                palabras[e] = new Palabras_1.Palabras((datos[e][1]).toUpperCase(), datos[e][2]);
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
    for (var e = 0; e < palabras[conf.getRondasJugadas()].getPalabra().length; e++) {
        var di = document.createElement("div");
        di.className = "adivinar " + palabras[conf.getRondasJugadas()].getPalabra().charAt(e);
        $("#palabra").append(di);
    }
    $("#pista").append("<p> Pista: " + palabras[conf.getRondasJugadas()].getPista() + "</p>");
}
function consonantes() {
    $("#letras").html("");
    var consonantes = new Array("B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "Ñ", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z");
    for (var e = 0; e < consonantes.length; e++) {
        var di = document.createElement("input");
        di.className = "letras";
        di.type = "button";
        di.value = consonantes[e];
        $("#letras").append(di);
        di.onclick = sd;
    }
}
function vocales() {
    $("#letras").html("");
    var vocales = new Array("A", "E", "I", "O", "U");
    for (var e = 0; e < vocales.length; e++) {
        var di = document.createElement("input");
        di.className = "letras";
        di.type = "button";
        di.value = vocales[e];
        di.onclick = sd;
        $("#letras").append(di);
    }
}
function sd() {
    if (palabras[conf.getRondasJugadas()].getPalabra().indexOf(this.value) != -1) {
        $("." + this.value).text(this.value);
    }
    else {
        alert("No se encuentra la letra");
        console.log(this.value + " Error");
    }
}
function adivinar() {
    var palabra = prompt("Inserta la palabra");
    if (palabras[conf.getRondasJugadas()].getPalabra() == palabra.toUpperCase().trim()) {
        alert("Has acertado!");
    }
    else {
        alert("Palabra incorrecta");
    }
}
