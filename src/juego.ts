import * as $ from 'jquery';
import { Jugador } from './Jugador';
import { Configuracion } from './Configuracion';
import { Palabras } from './Palabras';

$(document).ready(inicio);

var conf: Configuracion;
var jug: Jugador[] = Array();
var palabras: Palabras[] = Array();

function inicio() {
    cargarConfiguracion();
    consonantes();
    $("#cons").click(consonantes);
    $("#voc").click(vocales);
    $("#adv").click(adivinar);
}

////////////////////////////////////// CONEXIONES CON LAS BASES DE DATOS //////////////////////////////////////
function cargarConfiguracion() {
    $.ajax({

        url: "Controladores/cargarJuego.php",

        dataType: "json",
        async: true,
        type: "GET",

        success: function (datos) {

            conf = new Configuracion(datos[0][0], datos[0][1]);
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
                jug[e] = new Jugador(datos[e][1]);
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
                palabras[e] = new Palabras((datos[e][1]).toUpperCase(), datos[e][2]);

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
    for (let e = 0; e < palabras[conf.getRondasJugadas()].getPalabra().length; e++) {
        var di = document.createElement("div");
        di.className = "adivinar " + palabras[conf.getRondasJugadas()].getPalabra().charAt(e);
        $("#palabra").append(di);
    }
    $("#pista").append("<p> Pista: " + palabras[conf.getRondasJugadas()].getPista() + "</p>");
}


function consonantes() {
    $("#letras").html("");
    var consonantes = new Array("B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "Ñ", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z");
    for (let e = 0; e < consonantes.length; e++) {
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
    for (let e = 0; e < vocales.length; e++) {
        var di = document.createElement("input");
        di.className = "letras";
        di.type = "button";
        di.value = vocales[e];
        di.onclick = comprarVocales;
        $("#letras").append(di);
    }
}
////////////////////////////////////// CREACIONES EN EL HTML /////////////////////////////////////






////////////////////////////////////// FUNCIONALIDAD EL JUEGO /////////////////////////////////////
function adivinarConsonante(this: any) {
    if (palabras[conf.getRondasJugadas()].getPalabra().indexOf(this.value) != -1 && !letraInsertada(this.value)) {
        $("." + this.value).text(this.value);
        sumar(100);
    } else {
        alert("No se encuentra la letra o ya ha sido introducida");
        pasarTurno();
    }
}

function comprarVocales(this: any) {
    var jugador: number = (jugadorActivo() as number);
    if (palabras[conf.getRondasJugadas()].getPalabra().indexOf(this.value) != -1 && !letraInsertada(this.value)) {
        if (jug[jugador].getdinero() < 50) {
            pasarTurno();
            alert("No tienes dinero suficiente, Se pasa de turno");
        } else {
            jug[jugador].restarDinero(50);
            $("." + this.value).text(this.value);
            crearJugadores();
        }
    } else {
        alert("No se encuentra la letra o ya ha sido introducida");
        pasarTurno();
    }

}



function adivinar() {
    var palabra: String = (prompt("Inserta la palabra") as String);
    if (palabras[conf.getRondasJugadas()].getPalabra() == palabra.toUpperCase().trim()) {
        alert("Has acertado!");
        SumarBote();
        rondaAcabada();

    } else {
        alert("Palabra incorrecta");
        pasarTurno();
    }
}

function pasarTurno() {
    var jugador: number = (jugadorActivo() as number);
    jug[jugador].desactivar();
    if (jugador == conf.getJugadores() - 1)
        jug[0].activar();
    else
        jug[++jugador].activar();
    crearJugadores();
}

function jugadorActivo() {
    for (let index = 0; index < jug.length; index++) {
        if (jug[index].isActive()) {
            return index;
        }
    }

}

function quiebra() {
    jug[jugadorActivo() as number].quiebra();
    pasarTurno();
}

function letraInsertada(ltr: String){
    return $("."+ltr).text() == ltr;
}

function sumar(cant: number) {
    var n: number = (jugadorActivo() as number);
    jug[n].sumarDinero(cant);
    crearJugadores();
}

function rondaAcabada(){
    if((conf.getRondas()-1)!=conf.getRondasJugadas()){
        reiniciarDinero();
        conf.sumRondas();
        crearJugadores();
        crearPanel();
    } else {
        var ganador:Jugador = comprobarGanador();
        alert("El ganador es: "+ganador.getNombre()+" con "+ganador.getBote()+"€");
        window.location.href = "index.html";
    }
}

function SumarBote(){
    var n: number = (jugadorActivo() as number);
    jug[n].sumarBote(jug[n].getdinero());
    crearJugadores();
}

function reiniciarDinero(){
    for (let index = 0; index < jug.length; index++) {
        jug[index].quiebra();
    }
}

function comprobarGanador(){
    var gan:Jugador;
    gan = jug[0];
    for (let index = 0; index < jug.length; index++) {
        if(jug[index].getBote()>gan.getBote()){
            gan = jug[index];
        }
    }
    return gan;
}

////////////////////////////////////// FUNCIONALIDAD EL JUEGO /////////////////////////////////////
