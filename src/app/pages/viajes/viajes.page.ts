import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {

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

  viajes = [
    {
      id: 1,
      destino: 'Santiago - Valparaíso',
      fecha: new Date('2024-10-01T09:00:00'),
      conductor: 'Carlos Gómez',
      asientosDisponibles: 2
    },
    {
      id: 2,
      destino: 'Santiago - Concepción',
      fecha: new Date('2024-10-02T14:00:00'),
      conductor: 'Ana López',
      asientosDisponibles: 3
    },
    // Agrega más viajes según sea necesario
  ];
  
}
