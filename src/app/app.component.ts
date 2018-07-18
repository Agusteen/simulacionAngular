import { Component } from '@angular/core';
import { Recorrido } from './recorrido.model';
import { ruta1_rojo, ruta2_azul } from './rangos-rutas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cant_simulaciones: number = 50;
  paga: Boolean = false;
  showTable: Boolean = false;

  barValue: number = 0;
  loading: Boolean = false;
  flagSimulado = false;
  flagSimuladoCompleto = false;

  costo_acumulado: number = 0;

  costo_acumuladoR1p: number = 0;
  costo_acumuladoR2p: number = 0;

  costo_acumuladoR1np: number = 0;
  costo_acumuladoR2np: number = 0;

  simulacionesR1: Array<any>;
  simulacionesR2: Array<any>;

  msg: string = 'Para cantidades mayor a 10 mil la performance degrada';
  cancelar: boolean = false;

  constructor() {

  }

  prepararSim() {
    if (this.cant_simulaciones > 0 && this.cant_simulaciones < 10000) {
      this.simulacionesR1 = new Array();
      this.simulacionesR2 = new Array();
      this.loading = true;
      this.start();
      this.showTable = true;
    } else {
      this.msg = 'Debe ser un numero mayor a 0'
    }

  }

  async start() {
    let update = Math.round(this.cant_simulaciones / 10);


    for (let i = 1; i <= this.cant_simulaciones; i++) {
      let ruta: Recorrido[] = [];
      ruta1_rojo.forEach((value, index) => {
        ruta.push(this.simular(i, value, index)[0]);
      });
      if (i % update == 0) {
        if (this.cancelar) {
          this.cancelar = false;
          return;
        }
        this.barValue = (i / this.cant_simulaciones) / 2;
        await this.wait(0.01);
      }
      this.simulacionesR1.push(ruta);
    }

    this.guardarCosto(1);

    for (let i = 1; i <= this.cant_simulaciones; i++) {
      let ruta: Recorrido[] = [];
      ruta2_azul.forEach((value, index) => {
        ruta.push(this.simular(i, value, index)[0]);

      });
      if (i % update == 0) {
        if (this.cancelar) {
          this.cancelar = false;
          return;
        }
        this.barValue = 0.5 + (i / this.cant_simulaciones) / 2;
        await this.wait(0.01);
      }
      this.simulacionesR2.push(ruta);
    };
    this.guardarCosto(2);
    this.loading = false;
    this.flagSimulado = true;
  }

  guardarCosto(ruta) {
    if (ruta == 1) {
      if (this.paga) {
        this.costo_acumuladoR1p = this.costo_acumulado;
      } else {
        this.costo_acumuladoR1np = this.costo_acumulado;
      }
      this.costo_acumulado = 0;
    } else {
      if (this.paga) {
        this.costo_acumuladoR2p = this.costo_acumulado;
      } else {
        this.costo_acumuladoR2np = this.costo_acumulado;
      }
      this.costo_acumulado = 0;
    }
  }

  wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 100);
  }

  simular(num: Number, ruta, semaforo): [Recorrido, Number] {

    var simulacionRuta: Recorrido;
    simulacionRuta = new Recorrido();
    simulacionRuta.num = num;

    let rnd_detenido = this.getRandomNumber();

    simulacionRuta.rnd_detenido = rnd_detenido;

    if (rnd_detenido < ruta.lim_detenido) {
      simulacionRuta.detenido = true;
      let rnd_cerca_limpiador = this.getRandomNumber();

      simulacionRuta.rnd_cerca_limpiador = rnd_cerca_limpiador;
      simulacionRuta.cerca_limpiador = true;

      if (rnd_cerca_limpiador < ruta.lim_cerca) {
        let rnd_limpia = this.getRandomNumber();

        simulacionRuta.rnd_limpia = rnd_limpia;

        if (rnd_limpia < ruta.lim_limpia) {
          simulacionRuta.limpia = true;
          if (this.paga) {
            simulacionRuta.costo = 0.5;
            this.costo_acumulado += 0.5;
          } else {
            let rnd_rompe = this.getRandomNumber();

            simulacionRuta.rnd_rompe = rnd_rompe;

            if (rnd_rompe < ruta.lim_daño) {
              simulacionRuta.rompe = true;
              simulacionRuta.costo = 500;
              this.costo_acumulado += 500;
            }
          }
        }
      }
    }

    return [simulacionRuta, this.costo_acumulado];
  }

  repetir() {
    this.flagSimuladoCompleto = true;
    this.paga = !this.paga;
    this.loading = true;
    this.start();
    this.showTable = true;
  }

  reset() {
    this.flagSimulado = false;
    this.costo_acumulado = 0;
    this.costo_acumuladoR1p = 0;
    this.costo_acumuladoR2p = 0;
    this.costo_acumuladoR1np = 0;
    this.costo_acumuladoR2np = 0;
    this.showTable = false;
    this.flagSimuladoCompleto = false;
  }

  cancel() {
    this.cancelar = true;
    this.loading = false;
    this.reset();
  }

}
