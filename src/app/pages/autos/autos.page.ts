import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-autos',
  templateUrl: 'autos.page.html',
  styleUrls: ['autos.page.scss'],
})
export class AutosPage {
  constructor(private navCtrl: NavController) {}

  // Método para añadir más autos (solo visual)
  addMoreCars() {
    // Este método es solo visual y no realiza ninguna acción
  }

  goToNextPage() {
    this.navCtrl.navigateForward('/descripcion');
  }
}
