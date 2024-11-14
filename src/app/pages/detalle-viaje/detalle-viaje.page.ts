import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViajeService } from '../../services/viaje.service';
import { AuthService } from 'src/app/services/auth.service'; // Importar el AuthService para obtener datos del usuario autenticado
import { Router } from '@angular/router';  // Importar Router

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
    private viajeService: ViajeService, // Servicio para obtener detalles del viaje
    private authService: AuthService,  // Servicio para obtener datos del usuario autenticado
    private router: Router // Inyectar el servicio Router
  ) {}

  ngOnInit() {
    // Suscripción al estado de autenticación
    this.authService.authenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
      console.log(this.isAuthenticated ? 'Usuario autenticado' : 'Usuario no autenticado');
    });

    const viajeId = this.route.snapshot.paramMap.get('id');  // Obtener el ID del viaje

    if (viajeId) {
      // Obtener los datos del viaje como una Promesa
      this.viajeService.getViajeById(viajeId).then(
        (data) => {
          this.viaje = data;  // Asignar los datos del viaje
          console.log('Datos del viaje:', this.viaje);  // Verificar los datos del viaje

          if (this.viaje && this.viaje.usuario_id) {
            // Si existe usuario_id, obtener los datos del usuario
            this.authService.getUserData(this.viaje.usuario_id).then(
              (userData) => {
                if (userData) {
                  this.usuario = userData;  // Asignar los datos del usuario (conductor)
                  console.log('Datos del usuario:', this.usuario);  // Verificar los datos del usuario
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

      console.log('ID del usuario:', usuarioId);  // Verificar el usuarioId
      console.log('ID del viaje creador:', this.viaje.usuario_id);  // Verificar el usuario_id del viaje

      // Verificar si el usuario que intenta reservar es el mismo que creó el viaje
      if (this.viaje.usuario_id === usuarioId) {
        console.log('No puedes reservar tu propio viaje');
        return; // Si el usuario intenta reservar su propio viaje, no hacer nada
      }

      try {
        // Verificar que los datos sean válidos
        if (!usuarioId || !this.viaje) {
          console.log('Datos inválidos para la reserva');
          return;  // Si los datos están incompletos o no se encuentran, salir
        }

        // Llamar al método de reservarViaje del servicio
        await this.viajeService.reservarViaje(usuarioId, this.viaje);
        console.log('Viaje reservado con éxito');

        // Redirigir al usuario a la página de "mis-viajes"
        this.router.navigate(['/mis-viajes']);
      } catch (error) {
        console.error('Error al reservar el viaje:', error);
      }
    } else {
      console.log('Faltan datos para reservar el viaje o el usuario no está autenticado');
    }
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log('Sesión cerrada');
  }
}
