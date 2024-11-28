import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; // Para obtener el ID del usuario
import { ViajeService } from 'src/app/services/viaje.service'; // Para manejar los viajes
import { Router } from '@angular/router';  // Inyectar Router
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-mis-viajes',
  templateUrl: './mis-viajes.page.html',
  styleUrls: ['./mis-viajes.page.scss'],
})
export class MisViajesPage implements OnInit {
  misViajes: any[] = []; // Viajes reservados por el usuario
  viajesComoConductor: any[] = []; // Viajes creados por el usuario como conductor
  usuarioId: string | null = null; // ID del usuario autenticado
  isAuthenticated: boolean = false; // Variable para verificar si el usuario está autenticado
  segmentModel: string = 'mis-viajes'; // Controla el segmento seleccionado

  constructor(
    private authService: AuthService, // Servicio para obtener el ID del usuario
    private viajeService: ViajeService, // Servicio para manejar los viajes
    private router: Router,
    private alertController: AlertController  // Inyectar Router
  ) {}

  ngOnInit() {
    // Suscripción al estado de autenticación
    this.authService.authenticated$.subscribe(async auth => {
      this.isAuthenticated = auth;
      console.log(this.isAuthenticated ? 'Usuario autenticado' : 'Usuario no autenticado');
      
      if (this.isAuthenticated) {
        // Obtener el ID del usuario autenticado
        try {
          const usuarioId = await this.authService.getUsuarioId();
          if (usuarioId) {
            this.usuarioId = usuarioId;
            this.cargarMisViajes(usuarioId); // Cargar los viajes reservados del usuario
            this.cargarViajesComoConductor(usuarioId); // Cargar los viajes como conductor
          }
        } catch (error) {
          console.error('Error al obtener el ID del usuario:', error);
        }
      } else {
        // Si el usuario no está autenticado, redirigir al login
        this.router.navigate(['/login']);
      }
    });
  }

  // Método para cargar los viajes reservados del usuario
  async cargarMisViajes(usuarioId: string) {
    try {
      this.misViajes = await this.viajeService.obtenerMisViajes(usuarioId); // Llamar al servicio para obtener los viajes reservados
      console.log('Viajes reservados cargados:', this.misViajes);
    } catch (error) {
      console.error('Error al cargar los viajes reservados:', error);
    }
  }

  // Método para cargar los viajes creados por el usuario como conductor
  async cargarViajesComoConductor(usuarioId: string) {
    try {
      // Llamar al método del servicio para obtener los IDs de los viajes como conductor
      const viajesIds = await this.viajeService.obtenerIdsDeViajesComoConductor(usuarioId); 

      // Crear un arreglo para almacenar los viajes
      const viajes = [];
      
      // Iterar sobre los IDs y obtener los detalles de cada viaje
      for (const id of viajesIds) {
        const viaje = await this.viajeService.getViajeById(id); // Usar el método existente del servicio
        if (viaje) {
          viajes.push({ ...viaje, id }); // Agregar el ID junto con los detalles del viaje
        }
      }

      this.viajesComoConductor = viajes; // Asignar los viajes al array
      console.log('Viajes como conductor cargados:', this.viajesComoConductor);
    } catch (error) {
      console.error('Error al cargar los viajes como conductor:', error);
    }
  }

  // Método para cancelar una reserva con confirmación

async cancelarReserva(index: number) {
  const viajeId = this.misViajes[index].id;
  const viaje = this.misViajes[index];  // Obtener el viaje de la lista de reservas

  const alert = await this.alertController.create({
    header: 'Confirmar Cancelación',
    message: '¿Estás seguro de que deseas cancelar esta reserva?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Cancelación de reserva cancelada');
        }
      },
      {
        text: 'Confirmar',
        handler: async () => {
          try {
            // Llamar al servicio para cancelar la reserva
            await this.viajeService.cancelarReserva(viajeId);
            this.misViajes.splice(index, 1);  // Eliminar el viaje de la lista de viajes reservados

            // Incrementar el número de pasajeros disponibles (sumar 1 asiento)
            if (viaje.pasajeros !== undefined) {
              viaje.pasajeros += 1;  // Sumar 1 asiento disponible
              // Actualizar la base de datos con el nuevo número de pasajeros
              await this.viajeService.actualizarViaje(viajeId, { pasajeros: viaje.pasajeros });
              console.log('Reserva cancelada y asientos actualizados');
            }
          } catch (error) {
            console.error('Error al cancelar el viaje:', error);
          }
        }
      }
    ]
  });

  await alert.present();
}



  // Método para editar un viaje
  editarViaje(index: number) {
    const viajeId = this.viajesComoConductor[index].id; // Obtener el ID del viaje
    this.router.navigate(['/viaje-edit', viajeId]); // Redirigir con el ID del viaje
  }

  // Método para eliminar un viaje con confirmación
  async eliminarViaje(index: number) {
    const viajeId = this.viajesComoConductor[index].id;

    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este viaje?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminación de viaje cancelada');
          }
        },
        {
          text: 'Confirmar',
          handler: async () => {
            try {
              await this.viajeService.eliminarViaje(viajeId);
              this.viajesComoConductor.splice(index, 1);
              console.log(`Viaje con ID ${viajeId} eliminado con éxito`);
            } catch (error) {
              console.error(`Error al eliminar el viaje con ID ${viajeId}:`, error);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
    console.log('Sesión cerrada');
    this.router.navigate(['/login']); // Redirigir al login después de cerrar sesión
  }
  

}
