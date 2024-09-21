import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit {

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
  messages = [
    {
      id: 1,
      senderName: 'Juan Pérez',
      lastMessage: '¿Donde vienes?',
      timestamp: new Date()
    },
    {
      id: 2,
      senderName: 'Laura Martínez',
      lastMessage: 'Salgo en 5 minutos.',
      timestamp: new Date()
    },
    // Agrega más mensajes según sea necesario
  ];
}