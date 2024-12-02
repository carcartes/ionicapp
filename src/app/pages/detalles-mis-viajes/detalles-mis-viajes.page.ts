import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViajeService } from 'src/app/services/viaje.service';
import { AuthService } from 'src/app/services/auth.service';
import { Timestamp } from 'firebase/firestore';
import mapboxgl from 'mapbox-gl';
import { Router } from '@angular/router';



@Component({
  selector: 'app-detalles-mis-viajes',
  templateUrl: './detalles-mis-viajes.page.html',
  styleUrls: ['./detalles-mis-viajes.page.scss'],
})
export class DetallesMisViajesPage implements OnInit, OnDestroy {
  viajeId: string | null = null;
  viaje: any = null;
  nombreConductor: string = '';
  map: mapboxgl.Map | null = null;
  origen: [number, number] = [0, 0]; // Coordenadas del origen
  destino: [number, number] = [0, 0]; // Coordenadas del destino
  mapboxToken = 'pk.eyJ1IjoiY2FybG9za2NzIiwiYSI6ImNtMzF0eGliZTEyb2oybG9qM2phdGFxODYifQ.qbEM3FTUA_e68TWGAkDDlg';
  isAuthenticated: boolean = false;  // Estado de autenticación del usuario
  telefonoConductor: string = ''; 
  


  constructor(
    private router: Router, // Inyectar el servicio Router
    private route: ActivatedRoute,
    private viajeService: ViajeService,
    private authService: AuthService
    
  ) {}

  ngOnInit() {
    // Suscripción al estado de autenticación
    this.authService.authenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
      console.log(this.isAuthenticated ? 'Usuario autenticado' : 'Usuario no autenticado');
    });

    this.route.paramMap.subscribe(params => {
      this.viajeId = params.get('id');
      if (this.viajeId) {
        this.cargarDetallesViaje(this.viajeId); // Cargar los detalles del viaje
      }
    });
  }

  async cargarDetallesViaje(id: string) {
    try {
      const viajeData = await this.viajeService.getViajeReservadoById(id);
      if (!viajeData) {
        console.log('El viaje no fue encontrado');
      } else {
        this.viaje = viajeData.viaje;

        if (this.viaje.fecha instanceof Timestamp) {
          this.viaje.fecha = this.viaje.fecha.toDate().toLocaleString();
        }

        await this.obtenerNombreConductor(this.viaje.usuario_id);
        await this.obtenerTelefonoConductor(this.viaje.usuario_id)
        
        // Convertir las direcciones de origen y destino a coordenadas
        this.origen = await this.convertirDireccionACoordenadas(this.viaje.origen);
        this.destino = await this.convertirDireccionACoordenadas(this.viaje.destino);

        this.cargarMapa(); // Cargar el mapa
      }
    } catch (error) {
      console.error('Error al cargar los detalles del viaje:', error);
    }
  }

  async obtenerNombreConductor(usuarioId: string) {
    try {
      const usuario = await this.authService.getUserData(usuarioId);
      
      // Verificación explícita para asegurar que usuario es un objeto
      if (usuario && typeof usuario === 'object' && 'name' in usuario && 'surname' in usuario) {
        this.nombreConductor = `${usuario.name} ${usuario.surname}`;
        console.log('Nombre del conductor: ', this.nombreConductor);
      } else {
        console.error('Usuario no encontrado o datos incompletos');
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  }
  
  async obtenerTelefonoConductor(usuarioId: string) {
    try {
      const usuario = await this.authService.getUserData(usuarioId);
  
      // Verificación explícita para asegurar que usuario es un objeto y tiene el campo 'phone'
      if (usuario && typeof usuario === 'object' && 'phone' in usuario) {
          this.telefonoConductor = `${usuario.phone}`;
          console.log('Telefono del conductor:', this.telefonoConductor);
        } else {
          console.error('El usuario no tiene un teléfono válido o está vacío');
        }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  }

  abrirWhatsApp() {
    // Verifica si el teléfono está disponible
    if (!this.telefonoConductor) {
      alert('El teléfono del conductor no está disponible aún.');
      return;
    }
  
    // Agrega el prefijo +56 al número de teléfono
    const telefonoConductorConCodigo = '+56' + this.telefonoConductor.replace(/\D/g, ''); // Elimina cualquier carácter no numérico
  
    // Prepara el mensaje a enviar
    const mensaje = `Hola, estoy interesado en el viaje de ${this.viaje.origen} a ${this.viaje.destino}.`;
  
    // Construye la URL de WhatsApp con el número y el mensaje
    const url = `https://wa.me/${telefonoConductorConCodigo}?text=${encodeURIComponent(mensaje)}`;
  
    // Abre WhatsApp con la URL generada
    window.open(url, '_blank');
  }
  
  
  // Método para convertir una dirección en coordenadas usando la API de geocodificación de Mapbox
  async convertirDireccionACoordenadas(direccion: string): Promise<[number, number]> {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(direccion)}.json?access_token=${this.mapboxToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const coordenadas = data.features[0].geometry.coordinates;
        return [coordenadas[0], coordenadas[1]]; // Retorna [longitud, latitud]
      } else {
        console.error('No se encontraron coordenadas para la dirección');
        return [0, 0]; // Coordenadas predeterminadas si no se encuentra la dirección
      }
    } catch (error) {
      console.error('Error al obtener coordenadas:', error);
      return [0, 0]; // Coordenadas predeterminadas en caso de error
    }
  }

  cargarMapa() {
    if (this.map) {
      this.map.remove(); // Limpiar el mapa si ya existe
    }

    mapboxgl.accessToken = this.mapboxToken; // Usar el token proporcionado

    this.map = new mapboxgl.Map({
      container: 'map', // ID del contenedor del mapa
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
      center: this.origen, // Coordenadas del centro (por ejemplo, el origen)
      zoom: 12
    });

    // Crear una ruta entre el origen y el destino
    this.obtenerRuta(this.origen, this.destino);
  }

  obtenerRuta(origen: [number, number], destino: [number, number]) {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origen[0]},${origen[1]};${destino[0]},${destino[1]}?alternatives=false&steps=true&geometries=geojson&access_token=${this.mapboxToken}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const route = data.routes[0].geometry.coordinates;
        
        // Asegurarse de que la propiedad 'properties' sea un objeto vacío
        const routeData: GeoJSON.FeatureCollection = {
          type: 'FeatureCollection',  // Usar 'FeatureCollection' en lugar de 'Feature'
          features: [{
            type: 'Feature',  // Esto representa una característica de GeoJSON
            geometry: {
              type: 'LineString',
              coordinates: route
            },
            properties: {}  // Propiedad 'properties' vacía
          }]
        };

        this.map?.addSource('route', {
          type: 'geojson',
          data: routeData
        });

        this.map?.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          paint: {
            'line-color': '#0074cc',
            'line-width': 5
          }
        });
      })
      .catch(error => console.error('Error al obtener la ruta:', error));
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove(); // Limpiar el mapa cuando se destruye el componente
    }
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log('Sesión cerrada');
  }
}
