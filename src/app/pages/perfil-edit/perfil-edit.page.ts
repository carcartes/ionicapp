import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-edit',
  templateUrl: './perfil-edit.page.html',
  styleUrls: ['./perfil-edit.page.scss'],
})
export class PerfilEditPage implements OnInit {
  userData: any = {};  // Datos del usuario que se pueden editar

  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  async ngOnInit() {
    // Cargar los datos actuales del usuario cuando se ingresa a la página de edición
    const user = await this.afAuth.currentUser;
    if (user) {
      const userData = await this.authService.getUserData(user.uid);
      this.userData = userData || {};  // Si no existe, mantener los datos vacíos
    }
  }

  // Método para guardar los cambios en el perfil
  async saveProfileChanges() {
    const user = await this.afAuth.currentUser;
    if (user && this.userData) {
      try {
        // Actualizar los datos del usuario en Firestore
        await this.authService.updateUserData(user.uid, this.userData);
        console.log('Perfil actualizado');

        // Redirigir al perfil
        this.router.navigate(['/perfil']);  // Navegar directamente a la página de perfil
      } catch (error) {
        console.error('Error al actualizar el perfil:', error);
      }
    }
  }
}
