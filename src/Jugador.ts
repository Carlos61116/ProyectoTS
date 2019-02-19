class Jugador {

        nombre: string;

        dinero: number;

        constructor(nombre: string){
            this.nombre = nombre;
            this.dinero = 0;
        }

        getNombre(){
            return this.getNombre;
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

}