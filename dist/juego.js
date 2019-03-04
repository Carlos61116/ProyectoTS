"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var Jugador_1 = require("./Jugador");
var Configuracion_1 = require("./Configuracion");
var Palabras_1 = require("./Palabras");
$(document).ready(inicio);
var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
var spinAngleStart = 0;
var canvas;
var options = [25, 50, "Quiebra", 250, 100, "Pasar turno", 25, 400, 45, "X2", 5, "Mitad"];
var startAngle = 0;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;
var ctx;
var outsideRadius = 200;
var textRadius = 160;
var insideRadius = 125;
var valor = 0;
var conf;
var jug = Array();
var palabras = Array();
function inicio() {
    drawRouletteWheel();
    cargarConfiguracion();
    consonantes();
    $("#cons").attr("disabled", "disabled");
    $("#voc").attr("disabled", "disabled");
    $("#adv").attr("disabled", "disabled");
    $("#cons").click(consonantes);
    $("#voc").click(vocales);
    $("#adv").click(adivinar);
    $("#spin").click(spin);
    $("#letras").html("");
}
////////////////////////////////////// CONEXIONES CON LAS BASES DE DATOS //////////////////////////////////////
function cargarConfiguracion() {
    $.ajax({
        url: "../Controladores/cargarJuego.php",
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
        url: "../Controladores/cargarJugadores.php",
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
            console.log(jug[0]);
            crearJugadores();
        }, error: function () {
            $("#cambia").html("<p>Error al cargar los datos");
        }
    });
}
function cargarPalabras() {
    $.ajax({
        url: "../Controladores/cargarPalabras.php",
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
////////////////////////////////////// CONEXIONES CON LAS BASES DE DATOS //////////////////////////////////////
////////////////////////////////////// CREACIONES EN EL HTML /////////////////////////////////////
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
    $("#palabra").html("");
    $("#pista").html("");
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
        di.onclick = adivinarConsonante;
        $("#letras").append(di);
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
        di.onclick = comprarVocales;
        $("#letras").append(di);
    }
}
////////////////////////////////////////// RULETA //////////////////////////////////////////////
function byte2Hex(n) {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
}
function RGB2Color(r, g, b) {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}
function getColor(item, maxitem) {
    var phase = 0;
    var center = 128;
    var width = 127;
    var frequency = Math.PI * 2 / maxitem;
    var red;
    var green;
    var blue;
    red = Math.sin(frequency * item + 2 + phase) * width + center;
    green = Math.sin(frequency * item + 0 + phase) * width + center;
    blue = Math.sin(frequency * item + 4 + phase) * width + center;
    return RGB2Color(red, green, blue);
}
function drawRouletteWheel() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 500, 500);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.font = 'bold 12px Helvetica, Arial';
        for (var i = 0; i < options.length; i++) {
            var angle = startAngle + i * arc;
            //ctx.fillStyle = colors[i];
            ctx.fillStyle = getColor(i, options.length);
            ctx.beginPath();
            ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
            ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();
            ctx.save();
            ctx.shadowOffsetX = -1;
            ctx.shadowOffsetY = -1;
            ctx.shadowBlur = 0;
            ctx.shadowColor = "rgb(220,220,220)";
            ctx.fillStyle = "black";
            ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 250 + Math.sin(angle + arc / 2) * textRadius);
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            var text = options[i];
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            ctx.restore();
        }
        //Arrow
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
        ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.fill();
    }
}
function spin() {
    esconder();
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel();
}
function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout(rotateWheel, 30);
}
function stopRotateWheel() {
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 30px Helvetica, Arial';
    valor = options[index];
    if (valor == "Pasar turno") {
        pasarTurno();
    }
    else if (valor == "Quiebra") {
        quiebra();
    }
    else if (valor == "Mitad") {
        var jugador = jugadorActivo();
        valor = -(jug[jugador].getdinero() / 2);
        $("#cons").removeAttr("disabled");
        $("#adv").removeAttr("disabled");
    }
    else if (valor == "X2") {
        var jugador = jugadorActivo();
        valor = jug[jugador].getdinero();
        $("#cons").removeAttr("disabled");
        $("#adv").removeAttr("disabled");
    }
    else {
        $("#cons").removeAttr("disabled");
        $("#adv").removeAttr("disabled");
    }
    ctx.restore();
}
function easeOut(t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}
function esconder() {
    $("#cons").attr("disabled", "disabled");
    $("#voc").attr("disabled", "disabled");
    $("#adv").attr("disabled", "disabled");
    $("#spin").attr("disabled", "disabled");
    $("#letras").html("");
}
////////////////////////////////////////// RULETA //////////////////////////////////////////////
////////////////////////////////////// CREACIONES EN EL HTML /////////////////////////////////////
////////////////////////////////////// FUNCIONALIDAD EL JUEGO /////////////////////////////////////
function adivinarConsonante() {
    if (palabras[conf.getRondasJugadas()].getPalabra().indexOf(this.value) != -1 && !letraInsertada(this.value)) {
        $("." + this.value).text(this.value);
        sumar(valor);
        $("#cons").attr("disabled", "disabled");
        $("#letras").html("");
        $("#adv").removeAttr("disabled");
        $("#voc").removeAttr("disabled");
        $("#spin").removeAttr("disabled");
    }
    else {
        alert("No se encuentra la letra o ya ha sido introducida");
        pasarTurno();
    }
    $("#spin").removeAttr("disabled");
}
function comprarVocales() {
    var jugador = jugadorActivo();
    if (palabras[conf.getRondasJugadas()].getPalabra().indexOf(this.value) != -1 && !letraInsertada(this.value)) {
        if (jug[jugador].getdinero() < 50) {
            pasarTurno();
            alert("No tienes dinero suficiente, Se pasa de turno");
        }
        else {
            jug[jugador].restarDinero(50);
            $("." + this.value).text(this.value);
            crearJugadores();
        }
    }
    else {
        alert("No se encuentra la letra o ya ha sido introducida");
        pasarTurno();
    }
}
function adivinar() {
    var palabra = prompt("Inserta la palabra");
    if (palabras[conf.getRondasJugadas()].getPalabra() == palabra.toUpperCase().trim()) {
        alert("Has acertado!");
        SumarBote();
        rondaAcabada();
        esconder();
        $("#spin").removeAttr("disabled");
    }
    else {
        alert("Palabra incorrecta");
        pasarTurno();
    }
}
function pasarTurno() {
    var jugador = jugadorActivo();
    jug[jugador].desactivar();
    if (jugador == conf.getJugadores() - 1)
        jug[0].activar();
    else
        jug[++jugador].activar();
    esconder();
    $("#spin").removeAttr("disabled");
    crearJugadores();
}
function jugadorActivo() {
    for (var index = 0; index < jug.length; index++) {
        if (jug[index].isActive()) {
            return index;
        }
    }
}
function quiebra() {
    jug[jugadorActivo()].quiebra();
    pasarTurno();
}
function letraInsertada(ltr) {
    return $("." + ltr).text() == ltr;
}
function sumar(cant) {
    var n = jugadorActivo();
    jug[n].sumarDinero(cant);
    crearJugadores();
}
function rondaAcabada() {
    if ((conf.getRondas() - 1) != conf.getRondasJugadas()) {
        reiniciarDinero();
        conf.sumRondas();
        crearJugadores();
        crearPanel();
    }
    else {
        var ganador = comprobarGanador();
        alert("El ganador es: " + ganador.getNombre() + " con " + ganador.getBote() + "€");
        window.location.href = "index.html";
    }
}
function SumarBote() {
    var n = jugadorActivo();
    jug[n].sumarBote(jug[n].getdinero());
    crearJugadores();
}
function reiniciarDinero() {
    for (var index = 0; index < jug.length; index++) {
        jug[index].quiebra();
    }
}
function comprobarGanador() {
    var gan;
    gan = jug[0];
    for (var index = 0; index < jug.length; index++) {
        if (jug[index].getBote() > gan.getBote()) {
            gan = jug[index];
        }
    }
    return gan;
}
////////////////////////////////////// FUNCIONALIDAD EL JUEGO /////////////////////////////////////
