export class Jugador {

        nombre: string;

        dinero: number;

        bote: number;

        constructor(nombre: string){
            this.nombre = nombre;
            this.dinero = 0;
            this.bote = 0;
        }

        getNombre(){
            return this.nombre;
        }

        getBote(){
            return this.bote;
        }

        getdinero(){
            return this.dinero;
        }

        sumarDinero(din:number){
            this.dinero +=din;
        }

        restarDinero(din:number){
            if(din<this.dinero)
                this.dinero -=din;
            else   
                return false;
        }

        sumarBote(din:number){
            this.bote +=din;
        }

}