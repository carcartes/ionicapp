import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage {
  email: string = ''; // Inicializa el email
  message: string = ''; // Inicializa el mensaje

  constructor(private router: Router) {}

  onSubmit() {
    // Aquí deberías implementar la lógica para enviar el enlace a tu backend
    console.log('Enviar enlace a:', this.email);

    // Simulación de respuesta exitosa
    this.message = 'Se ha enviado un enlace para restablecer tu contraseña a ' + this.email;
    this.email = ''; // Limpiar el campo
  }
}