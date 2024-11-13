import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ViajeService } from '../../services/viaje.service';  // Asegúrate de que la ruta del servicio sea correcta

@Component({
  selector: 'app-fecha',
  templateUrl: 'fecha.page.html',
  styleUrls: ['fecha.page.scss'],
})
export class FechaPage {
  fecha: string = '';  // Variable para almacenar la fecha seleccionada

  constructor(
    private navCtrl: NavController,
    private viajeService: ViajeService  // Inyectamos el servicio para almacenar la fecha
  ) {}

  // Método para navegar a la siguiente página y guardar la fecha
  goToNextPage() {
    if (this.fecha) {
      // Guardar la fecha seleccionada en el servicio
      this.viajeService.setFecha(this.fecha);

      // Navegar a la siguiente página
      this.navCtrl.navigateForward('/pasajeros'); // Cambia '/pasajeros' por la ruta de la siguiente página
    } else {
      // Mostrar un mensaje si no se ha seleccionado una fecha
      alert('Por favor selecciona una fecha antes de continuar.');
    }
  }
}
