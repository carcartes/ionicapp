import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular'; // Importa AlertController

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  isAuthenticated: boolean = false;  // Inicialmente no autenticado

  constructor(
    private authService: AuthService, 
    private router: Router,
    private alertController: AlertController // Inyecta AlertController
  ) {
    // Nos suscribimos al estado de autenticación
    this.authService.authenticated$.subscribe(auth => {
      this.isAuthenticated = auth;  // Actualiza el estado de autenticación
    });
  }

  // Método para mostrar alertas
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Función de inicio de sesión
  async login() {
    if (this.username && this.password) {
      try {
        const isAuthenticated = await this.authService.login(this.username, this.password);
        if (isAuthenticated) {
          this.router.navigate(['/home']);
        } else {
          await this.presentAlert('Error', 'Credenciales incorrectas');
        }
      } catch (error) {
        await this.presentAlert('Error', 'Credenciales incorrectas');
      }
    } else {
      await this.presentAlert('Error', 'Por favor ingresa tus credenciales');
    }
  }

  // Método para redirigir a la página de registro
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
