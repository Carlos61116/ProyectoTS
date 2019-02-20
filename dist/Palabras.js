"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Palabras = /** @class */ (function () {
    function Palabras(p, pi) {
        this.palabra = p;
        this.pista = pi;
    }
    Palabras.prototype.getPalabra = function () {
        return this.palabra;
    };
    Palabras.prototype.getPista = function () {
        return this.pista;
    };
    return Palabras;
}());
exports.Palabras = Palabras;
