import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-fecha',
  templateUrl: 'fecha.page.html',
  styleUrls: ['fecha.page.scss'],
})
export class FechaPage {
  constructor(private navCtrl: NavController) {}

  // Método para navegar a la siguiente página
  goToNextPage() {
    // Navegar a la siguiente página
    this.navCtrl.navigateForward('/pasajeros'); // Cambia '/siguiente-pagina' por la ruta de tu página destino
  }
}
