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

  async cancelarReserva(index: number) {
    const reserva = this.misViajes[index]; // Obtenemos la reserva
    const viajeId = reserva.viaje?.id; // ID del viaje asociado a la reserva
    const pasajerosActuales = reserva.viaje?.pasajeros; // Número actual de pasajeros
  
    if (!viajeId) {
      console.error('No se encontró el ID del viaje asociado a la reserva.');
      return;
    }
  
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
              // Eliminar la reserva
              await this.viajeService.cancelarReserva(reserva.id);
              this.misViajes.splice(index, 1); // Remover de la lista local
  
              // Actualizar el número de pasajeros en el viaje
              if (pasajerosActuales !== undefined) {
                const nuevosPasajeros = pasajerosActuales; // Incrementar pasajeros disponibles
                await this.viajeService.actualizarPasajeros(viajeId, nuevosPasajeros);
                console.log(`Reserva cancelada y pasajeros actualizados a ${nuevosPasajeros}`);
              } else {
                console.warn('No se pudo actualizar el número de pasajeros: campo no definido.');
              }
            } catch (error) {
              console.error('Error al cancelar la reserva o actualizar pasajeros:', error);
            }
          }
        }
      ]
    });
  
    await alert.present();
  }
  



  // Método para editar un viaje
async editarViaje(index: number) {
  const viaje = this.viajesComoConductor[index];
  
  if (viaje.pasajeros !== viaje.pasajeros2) {
    const alert = await this.alertController.create({
      header: 'Acción no permitida',
      message: 'No puedes editar este viaje porque ya se ha reservado un asiento.',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }

  const viajeId = viaje.id; // Obtener el ID del viaje
  this.router.navigate(['/viaje-edit', viajeId]); // Redirigir con el ID del viaje
}

  // Método para eliminar un viaje con validación
async eliminarViaje(index: number) {
  const viaje = this.viajesComoConductor[index];

  if (viaje.pasajeros !== viaje.pasajeros2) {
    const alert = await this.alertController.create({
      header: 'Acción no permitida',
      message: 'No puedes eliminar este viaje porque ya se ha reservado un asiento.',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }

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
            const viajeId = viaje.id;
            await this.viajeService.eliminarViaje(viajeId);
            this.viajesComoConductor.splice(index, 1);
            console.log(`Viaje con ID ${viajeId} eliminado con éxito`);
          } catch (error) {
            console.error(`Error al eliminar el viaje con ID ${viaje.id}:`, error);
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

  ionViewWillEnter() {
    // Recargar los datos cada vez que la vista va a entrar
    if (this.isAuthenticated && this.usuarioId) {
      this.cargarMisViajes(this.usuarioId); // Recargar los viajes reservados
      this.cargarViajesComoConductor(this.usuarioId); // Recargar los viajes como conductor
    }
  }
}
