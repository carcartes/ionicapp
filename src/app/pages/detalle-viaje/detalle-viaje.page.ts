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
    // Suscripción al estado de autenticación
    this.authService.authenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
      console.log(this.isAuthenticated ? 'Usuario autenticado' : 'Usuario no autenticado');
    });

    // Obtener el ID del viaje de los parámetros de la URL
    const viajeId = this.route.snapshot.paramMap.get('id');
    if (viajeId) {
      this.cargarViaje(viajeId);
    }
  }

  // Método para cargar el viaje
  async cargarViaje(viajeId: string) {
    try {
      // Obtener los datos del viaje utilizando el ID
      this.viaje = await this.viajeService.getViajeById(viajeId);
      console.log('Datos del viaje:', this.viaje);

      if (this.viaje && this.viaje.usuario_id) {
        // Obtener los datos del usuario que creó el viaje
        this.usuario = await this.authService.getUserData(this.viaje.usuario_id);
        console.log('Datos del usuario:', this.usuario);
      }
    } catch (error) {
      console.error('Error al cargar los detalles del viaje:', error);
    }
  }

  // Método para realizar la reserva del viaje
  async reservarViaje() {
    if (this.viaje && this.isAuthenticated) {
      const usuarioId = await this.authService.getUsuarioId(); // Obtener el id del usuario autenticado
  
      console.log('ID del usuario:', usuarioId);
      console.log('ID del viaje creador:', this.viaje.usuario_id);
  
      // Verificar si el usuario que intenta reservar es el mismo que creó el viaje
      if (this.viaje.usuario_id === usuarioId) {
        console.log('No puedes reservar tu propio viaje');
        const alert = await this.alertController.create({
          header: 'Acción no permitida',
          message: 'No puedes reservar tu propio viaje.',
          buttons: ['OK']
        });
    
        await alert.present();
        return; // Salir de la función si es el mismo usuario
      }
  
      // Verificar si el viaje y su ID son válidos
      if (!usuarioId || !this.viaje || !this.viaje.id) {
        console.log('Datos inválidos para la reserva');
        console.log('Viaje:', this.viaje);
        console.log('ID del viaje:', this.viaje ? this.viaje.id : 'No tiene ID');
        return;  // Si los datos están incompletos o el viaje no tiene un ID válido, salir
      }
  
      try {
        // Verificar si hay pasajeros disponibles
        if (this.viaje.pasajeros > 0) {
          // Llamar al servicio para reservar el viaje
          await this.viajeService.reservarViaje(usuarioId, this.viaje); // Llamar al método de reserva
          console.log('Viaje reservado con éxito');
  
          // Disminuir el número de pasajeros
          const nuevosPasajeros = this.viaje.pasajeros - 1;
          await this.viajeService.actualizarPasajeros(this.viaje.id, nuevosPasajeros);
  
          // Mostrar una alerta indicando que la reserva fue exitosa
          this.presentAlert('Reserva exitosa', 'El viaje ha sido reservado con éxito.');
  
          // Redirigir al usuario a la página de "mis-viajes"
          this.router.navigate(['/mis-viajes']);
        } else {
          console.log('No hay pasajeros disponibles');
          this.presentAlert('Error', 'No hay más asientos disponibles en este viaje.');
        }
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
