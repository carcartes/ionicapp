import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
})
export class PublicarPage implements OnInit {

  isAuthenticated: boolean = false;
  
  // Variables for form fields
  origen: string = '';
  destino: string = '';
  pasajeros: number = 1;  // Default value of 1 passenger

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    // Subscribe to authentication changes
    this.authService.authenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
      console.log(this.isAuthenticated ? 'Usuario autenticado' : 'Usuario no autenticado');
    });
  }

  logout() {
    this.authService.logout();
    console.log('Sesión cerrada');
  }

  // Navigate to the publicar-viajes page with query parameters
  goToPublicarViajes() {
    this.router.navigate(['/origen'], {
      
    });
  }
}
