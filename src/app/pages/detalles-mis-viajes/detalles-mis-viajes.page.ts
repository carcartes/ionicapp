import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';  // Import Router for navigation

@Component({
  selector: 'app-detalles-mis-viajes',
  templateUrl: './detalles-mis-viajes.page.html',
  styleUrls: ['./detalles-mis-viajes.page.scss'],
})
export class DetallesMisViajesPage implements OnInit {

  isAuthenticated: boolean = false;

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
    this.router.navigate(['/login']);  // Navigate to login page after logout
  }

  // Add any other methods specific to DetallesMisViajesPage, such as navigating to other pages or handling trip details
}
