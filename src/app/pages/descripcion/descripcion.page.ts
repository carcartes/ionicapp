import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-descripcion',
  templateUrl: 'descripcion.page.html',
  styleUrls: ['descripcion.page.scss'],
})
export class DescripcionPage {
  constructor(private navCtrl: NavController, private alertController: AlertController) {}

  // Método para confirmar la publicación del viaje
  async confirmPublish() {
    const alert = await this.alertController.create({
      header: 'Confirmar Publicación',
      message: '¿Estás seguro de que deseas publicar el viaje?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Publicación cancelada');
          },
        },
        {
          text: 'Sí',
          handler: () => {
            this.showSuccessMessage();
          },
        },
      ],
    });

    await alert.present();
  }

  // Método para mostrar el mensaje de éxito y navegar al inicio
  async showSuccessMessage() {
    const alert = await this.alertController.create({
      header: 'Publicado con Éxito',
      message: 'Tu viaje ha sido publicado exitosamente.',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.navCtrl.navigateRoot('/home'); // Cambia '/home' por la ruta de tu página de inicio
        },
      }],
    });

    await alert.present();
  }
}
