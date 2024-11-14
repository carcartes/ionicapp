import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  isAuthenticated: boolean = false;  // Inicialmente no autenticado

  constructor(private authService: AuthService, private router: Router) {
    // Nos suscribimos al estado de autenticación
    this.authService.authenticated$.subscribe(auth => {
      this.isAuthenticated = auth;  // Actualiza el estado de autenticación
    });
  }

  async login() {
    if (this.username && this.password) {
      try {
        const isAuthenticated = await this.authService.login(this.username, this.password);
        if (isAuthenticated) {
          this.router.navigate(['/home']);
        } else {
          alert('Credenciales incorrectas');
        }
      } catch (error) {
        alert('Credenciales incorrectas');
      }
    } else {
      alert('Por favor ingresa tus credenciales');
    }
  }
}
