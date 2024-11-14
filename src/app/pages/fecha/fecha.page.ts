import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ViajeService } from '../../services/viaje.service';

@Component({
  selector: 'app-fecha',
  templateUrl: 'fecha.page.html',
  styleUrls: ['fecha.page.scss'],
})
export class FechaPage {
  fecha: string = '';  // Variable para almacenar la fecha seleccionada
  minFecha: string = '';  // Variable para almacenar la fecha mínima
  maxFecha: string = '';  // Variable para almacenar la fecha máxima

  constructor(
    private navCtrl: NavController,
    private viajeService: ViajeService
  ) {
    // Establecer la fecha mínima como la fecha actual
    const hoy = new Date();
    this.minFecha = hoy.toISOString(); // Convertir la fecha a formato ISO

    // Establecer la fecha máxima como la fecha de hoy + 1 mes
    const maxFecha = new Date();
    maxFecha.setMonth(hoy.getMonth() + 1); // Sumar un mes a la fecha actual
    this.maxFecha = maxFecha.toISOString(); // Convertir la fecha máxima a formato ISO

    // Establecer la fecha por defecto como la fecha actual
    this.fecha = hoy.toISOString();  // Asignamos la fecha actual a la variable fecha
  }

  goToNextPage() {
    if (this.fecha) {
      // Guardar la fecha seleccionada en el servicio
      this.viajeService.setFecha(this.fecha);

      // Navegar a la siguiente página
      this.navCtrl.navigateForward('/pasajeros');
    } else {
      // Mostrar un mensaje si no se ha seleccionado una fecha
      alert('Por favor selecciona una fecha antes de continuar.');
    }
  }
}
