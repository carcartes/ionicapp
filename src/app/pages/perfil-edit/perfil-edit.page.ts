import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil-edit',
  templateUrl: './perfil-edit.page.html',
  styleUrls: ['./perfil-edit.page.scss'],
})
export class PerfilEditPage implements OnInit {
  profile = {
    firstName: 'Mario',
    lastName: 'Zapata',
    phone: '+56 9 1234 5678',
    email: 'test@example.com',
    birthDate: '2000-01-01',
  };

  isAuthenticated: boolean = false;

  constructor(private navCtrl: NavController, public authService: AuthService) {}

  ngOnInit() {
    // Subscribe to authentication status
    this.authService.authenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
      console.log(this.isAuthenticated ? 'Usuario autenticado' : 'Usuario no autenticado');
    });
  }

  // Method to submit the form
  onSubmit() {
    // Logic to update the profile, such as sending the data to a service
    console.log('Profile updated:', this.profile);
    this.navCtrl.navigateBack('/perfil'); // Navigate back to the profile page
  }

  // Method to log out the user
  logout() {
    this.authService.logout();
    console.log('Sesión cerrada');
  }
}
