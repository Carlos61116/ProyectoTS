export class Configuracion{

    palabra: String;

    pista: String;

    constructor(p: String,pi:String){
        this.palabra = p;
        this.pista = pi;
    }

    getJugadores(){
        return this.palabra;
    }

    getRondas(){
        return this.pista;
    }
}