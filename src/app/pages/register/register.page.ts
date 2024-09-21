import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; // Ajusta la ruta según corresponda
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: string = '';
  surname: string = '';
  email: string = '';
  dob: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  register() {
    if (this.password === this.confirmPassword) {
        // Llama al método de registro en el servicio
        if (this.authService.register(this.name, this.surname, this.email, this.dob, this.password)) {
            this.router.navigate(['/home']); // Redirige al usuario a la página de inicio
        }
    } else {
        console.error('Las contraseñas no coinciden');
        // Aquí puedes agregar un mensaje para el usuario
    }
}

}
