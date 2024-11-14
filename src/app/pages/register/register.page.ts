import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
  phone: string = '';
  isAuthenticated: boolean = false;  // Inicialmente no autenticado

  constructor(private authService: AuthService, private router: Router) {
    // Suscribirse al estado de autenticación
    this.authService.authenticated$.subscribe(auth => {
      this.isAuthenticated = auth;  // Actualiza el estado de autenticación
    });
  }

  // Función de validación de campos
  validateFields(): boolean {
    // Verificar si algún campo está vacío
    if (!this.name || !this.surname || !this.email || !this.dob || !this.password || !this.confirmPassword || !this.phone) {
      alert('Todos los campos son obligatorios.');
      return false;
    }

    // Validar que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return false;
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zAZ]{2,6}$/;
    if (!emailRegex.test(this.email)) {
      alert('Por favor ingresa un correo electrónico válido');
      return false;
    }

    // Validar formato de teléfono
    const phoneRegex = /^9\d{8}$/; // El teléfono debe comenzar con 9 y tener 9 dígitos
    if (!phoneRegex.test(this.phone)) {
      alert('El teléfono debe comenzar con 9 y tener 9 dígitos');
      return false;
    }

    // Validar que los nombres y apellidos contengan solo letras
    const nameSurnameRegex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ]+$/; // Solo letras y caracteres especiales del español
    if (!nameSurnameRegex.test(this.name)) {
      alert('El nombre no puede contener números ni caracteres especiales.');
      return false;
    }

    if (!nameSurnameRegex.test(this.surname)) {
      alert('El apellido no puede contener números ni caracteres especiales.');
      return false;
    }

    // Validar la fecha de nacimiento
    const currentDate = new Date();
    const birthDate = new Date(this.dob);
    const minYear = 1900;

    // Verificar que la fecha de nacimiento no sea menor a 1900 y no sea en el futuro
    if (birthDate.getFullYear() < minYear || birthDate > currentDate) {
      alert('La fecha de nacimiento no puede ser menor a 1900 ni superior a la fecha actual');
      return false;
    }

    return true;
  }

  // Función que se ejecuta al hacer click en el botón de registro
  onRegister() {
    // Primero validamos todos los campos
    if (this.validateFields()) {
      // Lógica de registro, como llamar al servicio de registro
      this.authService.register(this.name, this.surname, this.email, this.dob, this.password, this.phone)
        .then(() => {
          alert('Registro exitoso');
          this.router.navigate(['/home']);
        })
        .catch(error => {
          alert('Error en el registro: ' + error.message);
        });
    }
  }
}
