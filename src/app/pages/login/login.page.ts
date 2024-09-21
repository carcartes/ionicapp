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

  login() {
    if (this.username && this.password) {
      // Aquí deberías llamar a un servicio de backend real
      if (this.authService.login(this.username, this.password)) {
        this.router.navigate(['/home']);  // Redirecciona al home después del login
      } else {
        alert('Credenciales incorrectas');
      }
    } else {
      alert('Por favor ingresa tus credenciales');
    }
  }
}
