export class Palabras{

    palabra: String;

    pista: String;

    constructor(p: String,pi:String){
        this.palabra = p;
        this.pista = pi;
    }

    getPalabra(){
        return this.palabra;
    }

    getPista(){
        return this.pista;
    }
}