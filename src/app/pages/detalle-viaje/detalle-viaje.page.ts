import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViajeService } from '../../services/viaje.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';  // Importar AlertController

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage implements OnInit {
  viaje: any;  // Datos del viaje
  usuario: any;  // Datos del usuario (conductor)
  isAuthenticated: boolean = false;  // Estado de autenticación del usuario

  constructor(
    private route: ActivatedRoute,
    private viajeService: ViajeService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController  // Inyectar AlertController
  ) {}

  ngOnInit() {
    this.authService.authenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
      console.log(this.isAuthenticated ? 'Usuario autenticado' : 'Usuario no autenticado');
    });

    const viajeId = this.route.snapshot.paramMap.get('id');
    if (viajeId) {
      this.viajeService.getViajeById(viajeId).then(
        (data) => {
          this.viaje = data;
          console.log('Datos del viaje:', this.viaje);

          if (this.viaje && this.viaje.usuario_id) {
            this.authService.getUserData(this.viaje.usuario_id).then(
              (userData) => {
                if (userData) {
                  this.usuario = userData;
                  console.log('Datos del usuario:', this.usuario);
                }
              },
              (error: any) => {
                console.error('Error al obtener datos del usuario:', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error al cargar los detalles del viaje:', error);
        }
      );
    }
  }

  // Método para reservar el viaje
  async reservarViaje() {
    // Verificar si los datos del usuario y del viaje están correctamente definidos
    if (this.viaje && this.isAuthenticated) {
      const usuarioId = await this.authService.getUsuarioId();  // Obtener el id del usuario autenticado

      console.log('ID del usuario:', usuarioId);
      console.log('ID del viaje creador:', this.viaje.usuario_id);

      // Verificar si el usuario que intenta reservar es el mismo que creó el viaje
      if (this.viaje.usuario_id === usuarioId) {
        console.log('No puedes reservar tu propio viaje');
        return; // Si el usuario intenta reservar su propio viaje, no hacer nada
      }

      try {
        if (!usuarioId || !this.viaje) {
          console.log('Datos inválidos para la reserva');
          return;  // Si los datos están incompletos o no se encuentran, salir
        }

        await this.viajeService.reservarViaje(usuarioId, this.viaje);  // Llamar al método de reserva
        console.log('Viaje reservado con éxito');

        // Mostrar una alerta indicando que la reserva fue exitosa
        this.presentAlert('Reserva exitosa', 'El viaje ha sido reservado con éxito.');

        // Redirigir al usuario a la página de "mis-viajes"
        this.router.navigate(['/mis-viajes']);
      } catch (error) {
        console.error('Error al reservar el viaje:', error);
      }
    } else {
      console.log('Faltan datos para reservar el viaje o el usuario no está autenticado');
    }
  }

  // Método para mostrar la alerta de reserva exitosa
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log('Sesión cerrada');
  }
}
