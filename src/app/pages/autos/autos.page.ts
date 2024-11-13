import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ViajeService } from '../../services/viaje.service';  // Importa tu servicio

@Component({
  selector: 'app-autos',
  templateUrl: 'autos.page.html',
  styleUrls: ['autos.page.scss'],
})
export class AutosPage {
  auto: string = '';  // Variable para almacenar el modelo de auto

  constructor(private navCtrl: NavController, private viajeService: ViajeService) {}

  // Método para guardar el auto en el servicio
  saveAuto() {
    if (this.auto.trim() !== '') {
      this.viajeService.setAuto(this.auto);  // Llamamos al servicio para guardar el auto
      console.log('Auto guardado:', this.auto);
    } else {
      console.log('Por favor ingrese un modelo de auto');
    }
  }

  // Método para ir a la siguiente página
  goToNextPage() {
    this.navCtrl.navigateForward('/descripcion');
  }
}
