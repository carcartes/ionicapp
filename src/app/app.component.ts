import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;
  name: string = '';
  surname: string = '';
  email: string = '';
  dob: string = '';
  password: string = '';
  confirmPassword: string = '';
  phone: string = ''; // Agregamos el campo para el teléfono

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) {}

  ngOnInit() {
    this.authService.authenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
    });
  }

  // Función para cerrar sesión
  async logout() {
    await this.authService.logout();  // Llama al servicio para cerrar sesión
    this.router.navigate(['/login']);
    console.log('Sesión cerrada');

    // Muestra una alerta de confirmación
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Has cerrado sesión correctamente',
      buttons: ['OK']
    });
    await alert.present();
  }

  onRegister() {
    if (this.password === this.confirmPassword) {
      // Lógica de registro, como llamar al servicio de registro
      this.authService.register(this.name, this.surname, this.email, this.dob, this.password, this.phone)
        .then(() => {
          alert('Registro exitoso');
          this.router.navigate(['/home']);
        })
        .catch(error => {
          alert('Error en el registro: ' + error.message);
        });
    } else {
      alert('Las contraseñas no coinciden');
    }
  }
}
