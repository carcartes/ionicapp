import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importar Router
import { ViajeService } from 'src/app/services/viaje.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-viaje-edit',
  templateUrl: './viaje-edit.page.html',
  styleUrls: ['./viaje-edit.page.scss'],
})
export class ViajeEditPage implements OnInit {
  viaje: any = null;
  reservas: any[] = [];
  viajeId: string | null = null;
  isAuthenticated: boolean = false;
  minDate: string = '';
  maxDate: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Inyectar Router
    private viajeService: ViajeService,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.authService.authenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
      console.log(this.isAuthenticated ? 'Usuario autenticado' : 'Usuario no autenticado');
    });

    this.viajeId = this.route.snapshot.paramMap.get('id');
    console.log('ID del viaje desde la ruta:', this.viajeId);

    if (this.viajeId) {
      this.cargarViaje(this.viajeId);
      this.cargarReservas(this.viajeId);
    } else {
      console.error('No se ha proporcionado un ID de viaje válido.');
    }

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    const maxDateObj = new Date(today.setMonth(today.getMonth() + 1));
    this.maxDate = maxDateObj.toISOString().split('T')[0];
  }

  async cargarViaje(id: string) {
    try {
      this.viaje = await this.viajeService.getViajeById(id);
      console.log('Detalles del viaje:', this.viaje);
    } catch (error) {
      console.error('Error al cargar el viaje:', error);
    }
  }

  async cargarReservas(viajeId: string) {
    try {
      console.log(`Cargando reservas para el viaje con ID: ${viajeId}`);
      this.reservas = await this.viajeService.obtenerReservasPorIdViaje(viajeId);
      console.log('Reservas cargadas:', this.reservas);
    } catch (error) {
      console.error('Error al cargar las reservas del viaje:', error);
    }
  }

  async eliminarReserva(index: number) {
    const reservaId = this.reservas[index].id;
    console.log(`Eliminando reserva con ID: ${reservaId}`);
    try {
      await this.viajeService.eliminarReservaPorId(reservaId);
      this.reservas.splice(index, 1);
      console.log('Reserva eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
    }
  }

  async guardarCambios() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas guardar los cambios?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => console.log('Cambios cancelados'),
        },
        {
          text: 'Guardar',
          handler: async () => {
            if (this.viajeId) {
              const cambios = {
                fecha: this.viaje.fecha,
                pasajeros: this.viaje.pasajeros,
                asientosDisponibles: this.viaje.asientosDisponibles,
              };
              try {
                if (cambios.asientosDisponibles < 1 || cambios.asientosDisponibles > 4) {
                  throw new Error('Asientos disponibles debe estar entre 1 y 4.');
                }

                await this.viajeService.actualizarViaje(this.viajeId, cambios);
                console.log('Cambios guardados con éxito');

                // Redirigir a la página "mis-viajes" después de guardar
                this.router.navigate(['/mis-viajes']);
              } catch (error) {
                console.error('Error al guardar cambios:', error);
              }
            } else {
              console.error('No se pudo obtener el ID del viaje');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async logout() {
    try {
      await this.authService.logout();
      console.log('Sesión cerrada con éxito');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
