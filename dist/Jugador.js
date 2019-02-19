"use strict";
var Jugador = /** @class */ (function () {
    function Jugador(nombre) {
        this.nombre = nombre;
        this.dinero = 0;
    }
    Jugador.prototype.getNombre = function () {
        return this.getNombre;
    };
    Jugador.prototype.getdinero = function () {
        return this.dinero;
    };
    Jugador.prototype.sumarDinero = function (din) {
        this.dinero += din;
    };
    Jugador.prototype.restarDinero = function (din) {
        if (din < this.dinero)
            this.dinero -= din;
        else
            return false;
    };
    return Jugador;
}());
