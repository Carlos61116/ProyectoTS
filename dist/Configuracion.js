"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Configuracion = /** @class */ (function () {
    function Configuracion(c, n) {
        this.cantJug = c;
        this.numRon = n;
    }
    Configuracion.prototype.getJugadores = function () {
        return this.cantJug;
    };
    Configuracion.prototype.getRondas = function () {
        return this.numRon;
    };
    return Configuracion;
}());
exports.Configuracion = Configuracion;
