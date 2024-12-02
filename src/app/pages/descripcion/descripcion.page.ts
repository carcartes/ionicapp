import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ViajeService } from '../../services/viaje.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-descripcion',
  templateUrl: 'descripcion.page.html',
  styleUrls: ['descripcion.page.scss'],
})
export class DescripcionPage {
  description: string = '';
  isPublishing: boolean = false; // Variable para controlar el estado de publicación

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private viajeService: ViajeService,
    private authService: AuthService
  ) {}

  async confirmPublicar() {
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
            this.handleDelayedPublish(); // Llamamos a la función con retraso
          },
        },
      ],
    });

    await alert.present();
  }

  async handleDelayedPublish() {
    if (this.isPublishing) return; // Evitar publicaciones múltiples

    this.isPublishing = true; // Deshabilitar el botón de publicación

    // Esperar 3 segundos (3000 milisegundos) antes de publicar el viaje
    setTimeout(async () => {
      await this.PublicarViaje();
      this.isPublishing = false; // Habilitar el botón de publicación nuevamente
    }, 1000); // 3 segundos de retraso
  }

  async PublicarViaje() {
    try {
      // Obtener el usuarioId desde el servicio AuthService
      const usuarioId = await this.authService.getUsuarioId();
      console.log('Usuario ID obtenido:', usuarioId);

      // Verificar si se pudo obtener el usuarioId
      if (!usuarioId) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo obtener el ID de usuario. Asegúrate de estar autenticado.',
          buttons: ['Aceptar'],
        });

        await alert.present();
        return;
      }

      console.log('Descripción del viaje:', this.description);

      // Verificar si la descripción está vacía
      if (!this.description || this.description.trim() === '') {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'La descripción no puede estar vacía.',
          buttons: ['Aceptar'],
        });

        await alert.present();
        return;
      }

      // Guardar la descripción en el servicio
      this.viajeService.setDescripcion(this.description);
      console.log('Descripción guardada en el servicio:', this.description);

      // Llamar al método publicarViaje() del servicio para guardar los datos en Firebase
      await this.viajeService.publicarViaje(usuarioId);

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
    } catch (error) {
      console.error('Error publicando el viaje:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al publicar el viaje. Intenta nuevamente.',
        buttons: ['Aceptar'],
      });

      await alert.present();
    }
  }
}
