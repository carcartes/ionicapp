import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Viaje } from '../../interfaces/viaje.interface';
import { todosLosViajes } from '../../data/viajes-data';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-buscar-viajes',
  templateUrl: './buscar-viajes.page.html',
  styleUrls: ['./buscar-viajes.page.scss'],
})
export class BuscarViajesPage implements OnInit {
  
  origen: string = '';     
  destino: string = '';    
  todosLosViajes: Viaje[] = todosLosViajes;
  viajesDisponibles: Viaje[] = [...this.todosLosViajes];
  isAuthenticated: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, public authService: AuthService) { }

  ngOnInit() {
    // Suscribirse al estado de autenticación
    this.authService.authenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
      console.log(this.isAuthenticated ? 'Usuario autenticado' : 'Usuario no autenticado');
    });

    // Obtén los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      if (params['origen']) {
        this.origen = params['origen'];
      }
      if (params['destino']) {
        this.destino = params['destino'];
      }
      this.buscarViajes(); // Ejecuta la búsqueda con los parámetros recibidos
    });
  }

  buscarViajes() {
    this.viajesDisponibles = this.todosLosViajes.filter(viaje => {
      const origenCoincide = viaje.origen === this.origen;
      const destinoCoincide = this.destino ? viaje.destino.toLowerCase().includes(this.destino.toLowerCase()) : true;

      return origenCoincide && destinoCoincide;
    });
  }

  reservarViaje(viaje: Viaje) {
    if (!this.isAuthenticated) {
      console.log('Usuario no autenticado. No se puede reservar el viaje.');
      return;
    }
    console.log('Reservando viaje:', viaje);
  }

  logout() {
    this.authService.logout();
    console.log('Sesión cerrada');
    // Redirigir al usuario a la página de inicio de sesión o a otra página
    this.router.navigate(['/login']);
  }
}
