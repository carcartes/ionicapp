import { Component, ViewChild, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ViajeService } from '../../services/viaje.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-origen',
  templateUrl: './origen.page.html',
  styleUrls: ['./origen.page.scss'],
})
export class OrigenPage implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: mapboxgl.Map;
  searchQuery: string = ''; // Almacena la búsqueda del usuario
  suggestions: any[] = []; // Almacena las sugerencias de búsqueda
  showButton: boolean = false; // Propiedad para controlar la visibilidad del botón

  constructor(
    private navCtrl: NavController,
    private viajeService: ViajeService // Inyecta el servicio ViajeService
  ) {
    // Inicializa Mapbox con tu API Key
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiY2FybG9za2NzIiwiYSI6ImNtMzF0eGliZTEyb2oybG9qM2phdGFxODYifQ.qbEM3FTUA_e68TWGAkDDlg';
    
  }

  ngAfterViewInit() {
    if (this.mapContainer) {
      this.initializeMap();
      setTimeout(() => {
        if (this.map) {
          this.map.resize();
        }
      }, 100);
    }
  }

  // Inicializa el mapa
  initializeMap() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-70.6483, -33.4569], // Centrado inicial en Santiago, Chile
      zoom: 12,
      interactive: true
    });
  }

  // Realiza la búsqueda con Mapbox y sugiere direcciones
  async onSearch() {
    if (this.searchQuery.length > 3) {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.searchQuery}.json?access_token=pk.eyJ1IjoiY2FybG9za2NzIiwiYSI6ImNtMzF0eGliZTEyb2oybG9qM2phdGFxODYifQ.qbEM3FTUA_e68TWGAkDDlg&autocomplete=true&limit=5`
      );
      
      const data = await response.json();
      console.log(data);

      if (data.features && data.features.length > 0) {
        this.suggestions = data.features;
      }
    }
  }

  // Cuando el usuario selecciona una dirección de las sugerencias
  onSelectSuggestion(suggestion: any) {
    const [lng, lat] = suggestion.geometry.coordinates;

    // Centra el mapa en la dirección seleccionada
    if (this.map) {
      this.map.flyTo({
        center: [lng, lat], 
        zoom: 14,
        essential: true
      });

      // Muestra el botón solo cuando se selecciona una dirección
      this.showButton = true;

      // Limpiar las sugerencias después de seleccionar
      this.suggestions = [];
      this.searchQuery = suggestion.place_name; // Actualiza la barra de búsqueda
    }
  }

  // Navega a la siguiente página (destino) y pasa el origen
  goToNextPage() {
    const origen = this.map.getCenter(); // Obtener el origen del mapa
    // Guardar el origen usando el servicio ViajeService
    this.viajeService.setOrigen({ lat: origen.lat, lng: origen.lng });
    this.navCtrl.navigateForward('/destino', {
      queryParams: {
        origen: JSON.stringify({ lat: origen.lat, lng: origen.lng })
      }
    });
  }

  // Agregar un Listener para manejar los cambios de tamaño de la ventana
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (this.map) {
      setTimeout(() => {
        this.map.resize();
      }, 100);
    }
  }
}