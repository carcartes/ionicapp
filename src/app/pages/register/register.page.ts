import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa AlertController
import * as emailjs from 'emailjs-com';

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
  isLoading: boolean = false;  // Estado del botón (desactivado al inicio)

  constructor(
    private authService: AuthService, 
    private router: Router,
    private alertController: AlertController // Inyecta AlertController
  ) {
    // Suscribirse al estado de autenticación
    this.authService.authenticated$.subscribe(auth => {
      this.isAuthenticated = auth;  // Actualiza el estado de autenticación
    });
  }

  // Función de validación de campos
  async validateFields(): Promise<boolean> {
    // Verificar si algún campo está vacío
    if (!this.name || !this.surname || !this.email || !this.dob || !this.password || !this.confirmPassword || !this.phone) {
      await this.presentAlert('Error', 'Todos los campos son obligatorios.');
      return false;
    }

    // Validar que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      await this.presentAlert('Error', 'Las contraseñas no coinciden');
      return false;
    }

     // Validar que la contraseña tenga al menos 8 caracteres
    if (this.password.length < 8) {
      await this.presentAlert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return false;
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zAZ]{2,6}$/;
    if (!emailRegex.test(this.email)) {
      await this.presentAlert('Error', 'Por favor ingresa un correo electrónico válido');
      return false;
    }

    // Validar formato de teléfono
    const phoneRegex = /^9\d{8}$/; // El teléfono debe comenzar con 9 y tener 9 dígitos
    if (!phoneRegex.test(this.phone)) {
      await this.presentAlert('Error', 'El teléfono debe comenzar con 9 y tener 9 dígitos');
      return false;
    }

    // Validar que los nombres y apellidos contengan solo letras
    const nameSurnameRegex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ]+$/; // Solo letras y caracteres especiales del español
    if (!nameSurnameRegex.test(this.name)) {
      await this.presentAlert('Error', 'El nombre no puede contener números ni caracteres especiales.');
      return false;
    }

    if (!nameSurnameRegex.test(this.surname)) {
      await this.presentAlert('Error', 'El apellido no puede contener números ni caracteres especiales.');
      return false;
    }

    // Validar la fecha de nacimiento
    const currentDate = new Date();
    const birthDate = new Date(this.dob);
    const minYear = 1900;

    // Verificar que la fecha de nacimiento no sea menor a 1900 ni superior a la fecha actual
    if (birthDate.getFullYear() < minYear || birthDate > currentDate) {
      await this.presentAlert('Error', 'La fecha de nacimiento no puede ser menor a 1900 ni superior a la fecha actual');
      return false;
    }

    // Calcular la edad
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    // Si la persona no ha cumplido 18 años, mostrar alerta
    if (age < 18 || (age === 18 && (birthDate.getMonth() > month || (birthDate.getMonth() === month && birthDate.getDate() > day)))) {
      await this.presentAlert('Error', 'Debe ser mayor de 18 años');
      return false;
    }

    return true;
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

  // Función que se ejecuta al hacer click en el botón de registro
  async onRegister() {
    // Primero validamos todos los campos
    if (await this.validateFields()) {
      // Desactivar el botón mientras se procesa el registro
      this.isLoading = true;
  
      // Lógica de registro
      this.authService.register(this.name, this.surname, this.email, this.dob, this.password, this.phone)
        .then(() => {
          this.presentAlert('Éxito', 'Registro exitoso');
  
          // Enviar correo de confirmación al usuario
          this.sendConfirmationEmail(this.email);
  
          // Redirigir al usuario a la página /home
          this.router.navigate(['/home']);
        })
        .catch(error => {
          this.presentAlert('Error', 'Error en el registro: ' + error.message);
        })
        .finally(() => {
          // Habilitar el botón después de que se haya procesado la reserva o se haya producido un error
          this.isLoading = false;
        });
    }
  }
  

  // Método para enviar el correo de confirmación
sendConfirmationEmail(userEmail: string) {
  const message = `¡Hola ${this.name} ${this.surname}! Tu cuenta ha sido registrada exitosamente en TelevoApp. ¡Bienvenido!`;

  emailjs.send(
    'service_rboxxi7', // Tu ID de servicio en EmailJS
    'template_w5po80v', // Tu plantilla en EmailJS
    {
      to_email: userEmail,
      message: message,
    },
    'A8_cR57zcZlOcbDan' // Tu public key de EmailJS
  )
  .then((response) => {
    console.log('Correo enviado al usuario con éxito:', response);
  })
  .catch((error) => {
    console.error('Error al enviar el correo:', error);
  });
}
}
