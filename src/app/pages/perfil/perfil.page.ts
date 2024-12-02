import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  isAuthenticated: boolean = false;
  userData: any = {};  // Aquí guardaremos los datos del usuario

  constructor(public authService: AuthService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    // Suscripción al estado de autenticación
    this.authService.authenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
      console.log(this.isAuthenticated ? 'Usuario autenticado' : 'Usuario no autenticado');
      if (this.isAuthenticated) {
        this.loadUserData();  // Llamar para cargar los datos del usuario cuando está autenticado
      }
    });

    // Suscripción a los cambios de datos del usuario
    this.authService.userData$.subscribe(data => {
      if (data) {
        this.userData = data;  // Actualizar los datos cuando cambian
      }
    });
  }

  // Función para cargar los datos del usuario
  async loadUserData() {
    const user = await this.afAuth.currentUser;  // Obtener el usuario actual
    if (user) {
      const userData = await this.authService.getUserData(user.uid);  // Obtener datos desde Firestore
      this.userData = userData || {};  // Si no existe, mantener los datos vacíos
    }
  }

  logout() {
    this.authService.logout();
    console.log('Sesión cerrada');
  }

  // Método para calcular la edad
  calculateAge(dob: string): number | null {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    const month = new Date().getMonth();
    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && new Date().getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  }
}
