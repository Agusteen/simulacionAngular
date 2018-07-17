export class Recorrido {
    num: Number;
    rnd_detenido: Number;
    detenido: Boolean;
    rnd_cerca_limpiador: Number;
    cerca_limpiador: Boolean;
    rnd_limpia: Number;
    limpia: Boolean;
    rnd_rompe: Number;
    rompe: Boolean;
    costo: Number;

    constructor(){
        this.num = 0;
        this.rnd_detenido = -1;
        this.detenido = false;
        this.rnd_cerca_limpiador = -1;
        this.cerca_limpiador = false;
        this.rnd_limpia = -1;
        this.limpia = false;
        this.rnd_rompe = -1;
        this.rompe = false;
        this.costo = 0;
    }
}