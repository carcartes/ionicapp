import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; // Import AuthService
import { AlertController } from '@ionic/angular'; // Import AlertController

@Component({
  selector: 'app-publicar-viajes',
  templateUrl: './publicar-viajes.page.html',
  styleUrls: ['./publicar-viajes.page.scss'],
})
export class PublicarViajesPage implements OnInit {

  // Variables for form fields
  origen: string = '';
  destino: string = '';
  pasajeros: number = 1;
  fechaViaje: string = '';
  horaSalida: string = '';
  precio: number = 0; // New variable for price
  minDate: string = ''; // Minimum date variable
  isAuthenticated: boolean = false; // Track authentication status

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController // Inject AlertController
  ) { }

  ngOnInit() {
    // Subscribe to authentication changes
    this.authService.authenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
      console.log(this.isAuthenticated ? 'Usuario autenticado' : 'Usuario no autenticado');
    });

    // Retrieve query parameters for origen, destino, and pasajeros
    this.route.queryParams.subscribe(params => {
      if (params['origen']) {
        this.origen = params['origen'];
      }
      if (params['destino']) {
        this.destino = params['destino'];
      }
      if (params['pasajeros']) {
        this.pasajeros = +params['pasajeros'];  // Convert to number
      }
    });

    // Set the minimum date to today
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = today.getFullYear();
    this.minDate = `${year}-${month}-${day}`;
  }

  // Method to show confirmation alert
  async confirmarPublicacion() {
    const alert = await this.alertController.create({
      header: 'Confirmar Publicación',
      message: '¿Estás seguro de que deseas publicar el viaje?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, 
        {
          text: 'Publicar',
          handler: () => {
            this.publicarViaje(); // Call the method to publish the trip
          }
        }
      ]
    });
    
    await alert.present();
  }

  // Method to handle the publication of the trip
  async publicarViaje() {
    if (!this.isAuthenticated) {
      console.log('Usuario no autenticado. Redirigiendo a la página de inicio de sesión.');
      this.router.navigate(['/login']); // Redirect to login page
      return;
    }
    
    // Proceed with publishing the trip if authenticated
    console.log('Viaje publicado:', {
      origen: this.origen,
      destino: this.destino,
      pasajeros: this.pasajeros,
      fechaViaje: this.fechaViaje,
      horaSalida: this.horaSalida,
      precio: this.precio // Include price in the log
    });
    
    // Here you can include the logic to save the trip data (e.g., API call)
    
    // Show success alert after publishing the trip
    const successAlert = await this.alertController.create({
      header: 'Éxito',
      message: 'Viaje publicado exitosamente.',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            // Optionally, reset form fields if needed
            this.resetForm();
            // You can also navigate to home or any other page here
            this.router.navigate(['/home']); // Change '/home' to your desired route
          }
        }
      ]
    });

    await successAlert.present();
  }

  // Method to reset form fields
  private resetForm() {
    this.origen = '';
    this.destino = '';
    this.pasajeros = 1;
    this.fechaViaje = '';
    this.horaSalida = '';
    this.precio = 0;
  }

  // Method to handle logout
  logout() {
    this.authService.logout();
    console.log('Sesión cerrada. Redirigiendo a la página de inicio de sesión.');
    this.router.navigate(['/login']); // Redirect to login page
  }
}
