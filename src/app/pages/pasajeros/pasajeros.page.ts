import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pasajeros',
  templateUrl: 'pasajeros.page.html',
  styleUrls: ['pasajeros.page.scss'],
})
export class PasajerosPage {
  passengerCount: number = 1; // Contador inicial de pasajeros

  constructor(private navCtrl: NavController) {}

  // Método para aumentar el contador de pasajeros
  increasePassengers() {
    if (this.passengerCount < 5) { // Ajusta el máximo según tus necesidades
      this.passengerCount++;
    }
  }

  // Método para disminuir el contador de pasajeros
  decreasePassengers() {
    if (this.passengerCount > 1) { // Ajusta el mínimo según tus necesidades
      this.passengerCount--;
    }
  }

  // Método para navegar a la siguiente página
  goToNextPage() {
    // Navegar a la siguiente página
    this.navCtrl.navigateForward('/precio'); // Cambia '/siguiente-pagina' por la ruta de tu página destino
  }
}
