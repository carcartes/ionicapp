import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ViajeService } from '../../services/viaje.service';  // Importa tu servicio

@Component({
  selector: 'app-autos',
  templateUrl: 'autos.page.html',
  styleUrls: ['autos.page.scss'],
})
export class AutosPage {
  auto: string = '';  // Variable para almacenar el modelo de auto

  constructor(
    private navCtrl: NavController, 
    private viajeService: ViajeService,
    private alertController: AlertController  // Inyecta el AlertController
  ) {}

  // Método para ir a la siguiente página y guardar el auto
  async goToNextPage() {
    if (this.auto.trim() !== '') {
      // Guardar el auto solo si el campo no está vacío
      this.viajeService.setAuto(this.auto);  // Llamamos al servicio para guardar el auto
      console.log('Auto guardado:', this.auto);

      // Navegar a la página siguiente
      this.navCtrl.navigateForward('/descripcion');
    } else {
      // Si el campo está vacío, mostrar una alerta
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor ingresa un modelo de auto.',
        buttons: ['OK']
      });

      await alert.present();  // Mostrar la alerta
    }
  }
}
