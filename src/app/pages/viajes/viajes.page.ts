import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; 
import { AlertController } from '@ionic/angular';  // Importar AlertController

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {

  isAuthenticated: boolean = false;
  viajes = [
    { origen: 'Concepcion', destino: 'Penco', fecha: '25 de Septiembre de 2024', conductor: 'Toreto', asientosDisponibles: 3 },
    { origen: 'Concepcion', destino: 'Hualpen', fecha: '28 de Septiembre de 2024', conductor: 'Toreto', asientosDisponibles: 2 }
  ];

  constructor(
    public authService: AuthService, 
    private router: Router,
    private alertController: AlertController  // Inyectar AlertController
  ) { }

  ngOnInit() {
    // Suscripción a cambios de autenticación
    this.authService.authenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
      console.log(this.isAuthenticated ? 'Usuario autenticado' : 'Usuario no autenticado');
    });
  }

  async confirmarCancelacion(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar Cancelación',
      message: '¿Estás seguro que quieres cancelar este viaje?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancelación abortada');
          }
        }, {
          text: 'Sí',
          handler: () => {
            this.eliminarViaje(index);
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarViaje(index: number) {
    this.viajes.splice(index, 1);  // Eliminar el viaje de la lista
    console.log('Viaje eliminado');
  }

  logout() {
    this.authService.logout();
    console.log('Sesión cerrada');
    this.router.navigate(['/login']);  // Redirigir al usuario a la página de login después de cerrar sesión
  }
}
