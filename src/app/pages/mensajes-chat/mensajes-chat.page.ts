import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mensajes-chat',
  templateUrl: './mensajes-chat.page.html',
  styleUrls: ['./mensajes-chat.page.scss'],
})
export class MensajesChatPage implements OnInit {
  isAuthenticated: boolean = false;
  newMessage: string = '';
  chats: any[] = [];
  messageId: number | null = null; // Variable para almacenar el ID del mensaje

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.authenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
    });

    // Obtener el ID del mensaje de la ruta
    this.messageId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID del mensaje:', this.messageId);

    // Aquí podrías cargar los detalles del chat basados en el ID
    // Placeholder para los mensajes de chat
    this.chats = [
      { senderName: 'Usuario 1', message: 'Hola, ¿cómo estás?', timestamp: new Date() },
      { senderName: 'Usuario 2', message: 'Estoy bien, gracias. ¿Y tú?', timestamp: new Date() },
    ];
  }

  sendMessage() {
    console.log('Mensaje enviado:', this.newMessage);
    this.newMessage = '';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
