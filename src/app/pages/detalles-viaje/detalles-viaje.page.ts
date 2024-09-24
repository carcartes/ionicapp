import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular'; // Importar AlertController

@Component({
  selector: 'app-detalles-viaje',
  templateUrl: './detalles-viaje.page.html',
  styleUrls: ['./detalles-viaje.page.scss'],
})
export class DetallesViajePage implements OnInit {
  origen: string = '';
  destino: string = '';
  horaSalida: string = '';
  horaLlegada: string = '';
  precio: number = 0;
  asientosDisponibles: number = 0;
  isAuthenticated: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    public alertController: AlertController // Inyectar AlertController
  ) { }

  ngOnInit() {
    // Obtener los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.origen = params['origen'];
      this.destino = params['destino'];
      this.horaSalida = params['horaSalida'];
      this.horaLlegada = params['horaLlegada'];
      this.precio = params['precio'];
      this.asientosDisponibles = params['asientosDisponibles'];
    });

    // Suscribirse al estado de autenticación
    this.authService.authenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
      console.log(this.isAuthenticated ? 'Usuario autenticado' : 'Usuario no autenticado');
    });
  }

  async presentConfirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmar Reserva',
      message: '¿Está seguro de que desea confirmar esta reserva?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Reserva cancelada');
          }
        },
        {
          text: 'Confirmar',
          handler: async () => {
            // Mostrar alerta de éxito
            const successAlert = await this.alertController.create({
              header: 'Éxito',
              message: 'Reserva confirmada con éxito.',
              buttons: [
                {
                  text: 'Aceptar',
                  handler: () => {
                    // Redirigir al inicio
                    this.router.navigate(['/home']); // Cambia '/home' por la ruta de tu página de inicio
                  }
                }
              ]
            });

            await successAlert.present();
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    this.authService.logout();
    console.log('Sesión cerrada');
    // Redirigir al usuario a la página de inicio de sesión o a otra página
    this.router.navigate(['/login']);
  }
}
