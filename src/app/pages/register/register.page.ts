import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name: string = '';
  surname: string = '';
  email: string = '';
  dob: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService) { }

  onRegister() {
    if (this.password === this.confirmPassword) {
      // Lógica de registro, como llamar al servicio de registro
      this.authService.register(this.name, this.surname, this.email, this.dob, this.password)
        .then(() => {
          alert('Registro exitoso');
        })
        .catch(error => {
          alert('Error en el registro: ' + error.message);
        });
    } else {
      alert('Las contraseñas no coinciden');
    }
  }
}
