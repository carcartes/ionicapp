import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-buscar-viajes',
  templateUrl: './buscar-viajes.page.html',
  styleUrls: ['./buscar-viajes.page.scss'],
})
export class BuscarViajesPage implements OnInit {
  origen: string | null = null;  // Dirección de origen
  destino: string | null = null; // Dirección de destino
  origenInput: string = '';  // Dirección de origen para el campo de entrada
  destinoInput: string = ''; // Dirección de destino para el campo de entrada
  viajes: any[] = [];  // Lista de viajes encontrados
  db: any;  // Referencia a Firestore
  isAuthenticated: boolean = false;
  driverName: string = '';

  constructor(private route: ActivatedRoute, public authService: AuthService) {
    const app = initializeApp(environment.firebaseConfig);
    this.db = getFirestore(app);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.origen = params['origen'] || null;
      this.destino = params['destino'] || null;

      // Pre-cargar los campos de búsqueda con los valores de origen y destino
      this.origenInput = this.origen || '';
      this.destinoInput = this.destino || '';

      console.log('Parámetros recibidos:', {
        origen: this.origen,
        destino: this.destino,
      });

      // Llamar a la búsqueda inicial
      this.buscarViajes();
    });
    this.authService.authenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
      console.log(this.isAuthenticated ? 'Usuario autenticado' : 'Usuario no autenticado');
    });
  }

  logout() {
    this.authService.logout();
    console.log('Sesión cerrada');
  }

  /**
   * Busca los viajes que coinciden con la dirección de origen y destino
   */
  async buscarViajes() {
    // Usar los valores de origenInput y destinoInput
    const origenBusqueda = this.origenInput.trim();
    const destinoBusqueda = this.destinoInput.trim();
  
    const viajesRef = collection(this.db, 'viajes');
  
    let q;
  
    // Condiciones según los campos ingresados
    if (origenBusqueda && destinoBusqueda) {
      // Filtrar por origen y destino
      q = query(viajesRef, where('origen', '==', origenBusqueda), where('destino', '==', destinoBusqueda));
    } else if (origenBusqueda) {
      // Filtrar solo por origen
      q = query(viajesRef, where('origen', '==', origenBusqueda));
    } else if (destinoBusqueda) {
      // Filtrar solo por destino
      q = query(viajesRef, where('destino', '==', destinoBusqueda));
    } else {
      // Sin filtros, obtener todos los viajes
      q = query(viajesRef);
    }
  
    try {
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.log('No se encontraron viajes que coincidan con los criterios.');
        this.viajes = [];
      } else {
        // Obtener la fecha actual en formato UTC
        const fechaActual = new Date();  // Esto obtiene la fecha actual en el horario local
        const fechaActualUTC = new Date(Date.UTC(fechaActual.getUTCFullYear(), fechaActual.getUTCMonth(), fechaActual.getUTCDate()));
  
        this.viajes = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const viajeFecha = new Date(data['fecha']);  // Convertir la fecha del viaje a objeto Date
  
          console.log('Viaje encontrado:', data);
  
          // Filtrar solo los viajes cuya fecha es posterior a la actual
          // Comparar las fechas en UTC utilizando getTime() para obtener el valor en milisegundos
          if (viajeFecha.getTime() > fechaActualUTC.getTime()) {
            return { id: doc.id, ...data };
          } else {
            return null; // No mostrar el viaje si la fecha ya pasó
          }
        }).filter(viaje => viaje !== null);  // Eliminar los viajes con fecha pasada
      }
    } catch (error) {
      console.error('Error al buscar viajes:', error);
    }
  }
  
}
