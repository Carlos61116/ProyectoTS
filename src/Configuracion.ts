class Configuracion{

    cantJug: number;

    numRon: number;

    constructor(c: number,n:number){
        this.cantJug = c;
        this.numRon = n;
    }

    getJugadores(){
        return this.cantJug;
    }

    getRondas(){
        return this.numRon;
    }
}