export class Jugador {

    nombre: string;

    dinero: number;

    bote: number;

    activo: boolean;

    constructor(nombre: string) {
        this.nombre = nombre;
        this.dinero = 0;
        this.bote = 0;
        this.activo = false;
    }

    getNombre() {
        return this.nombre;
    }

    getBote() {
        return this.bote;
    }

    getdinero() {
        return this.dinero;
    }

    sumarDinero(din: number) {
        this.dinero += din;
    }

    quiebra() {
        this.dinero = 0;
    }

    restarDinero(din: number) {
        this.dinero -= din;
    }

    sumarBote(din: number) {
        this.bote += din;
    }

    activar() {
        this.activo = true;
    }

    desactivar() {
        this.activo = false;
    }

    isActive() {
        return this.activo;
    }

}