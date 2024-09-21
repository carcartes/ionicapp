import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  isAuthenticated: boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.authenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
      console.log(this.isAuthenticated ? 'Usuario autenticado' : 'Usuario no autenticado');
    });
  }

  logout() {
    this.authService.logout();
    console.log('Sesión cerrada');
  }
}
