"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Jugador = /** @class */ (function () {
    function Jugador(nombre) {
        this.nombre = nombre;
        this.dinero = 0;
        this.bote = 0;
    }
    Jugador.prototype.getNombre = function () {
        return this.nombre;
    };
    Jugador.prototype.getBote = function () {
        return this.bote;
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
    Jugador.prototype.sumarBote = function (din) {
        this.bote += din;
    };
    return Jugador;
}());
exports.Jugador = Jugador;
