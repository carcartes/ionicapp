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

  constructor(private authService: AuthService, private router: Router) { }

  async login() {
    if (this.username && this.password) {
      // Usa await para esperar la respuesta del login
      const isAuthenticated = await this.authService.login(this.username, this.password);
      if (isAuthenticated) {
        this.router.navigate(['/home']);
      } else {
        alert('Credenciales incorrectas');
      }
    } else {
      alert('Por favor ingresa tus credenciales');
    }
  }
}
