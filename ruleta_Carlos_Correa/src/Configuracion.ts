export class Configuracion{

    cantJug: number;

    numRon: number;

    rondas:number;

    constructor(c: number,n:number){
        this.cantJug = c;
        this.numRon = n;
        this.rondas = 0;
    }

    getJugadores(){
        return this.cantJug;
    }

    getRondas(){
        return this.numRon;
    }
    getRondasJugadas(){
        return this.rondas;
    }

    sumRondas(){
        this.rondas++;
    }
}