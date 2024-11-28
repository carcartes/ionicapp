import { Component, ViewChild, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';  // Importación correcta de ActivatedRoute
import { ViajeService } from '../../services/viaje.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-destino',
  templateUrl: './destino.page.html',
  styleUrls: ['./destino.page.scss'],
})
export class DestinoPage implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: mapboxgl.Map;
  searchQuery: string = '';
  suggestions: any[] = [];
  showMap: boolean = false;
  showButton: boolean = false;
  origen: any; // Guardar el origen recibido
  destinoDireccion: string = ''; // Dirección del destino

  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute, // Inyección de ActivatedRoute
    private viajeService: ViajeService // Inyecta el servicio ViajeService
  ) {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiY2FybG9za2NzIiwiYSI6ImNtMzF0eGliZTEyb2oybG9qM2phdGFxODYifQ.qbEM3FTUA_e68TWGAkDDlg';
  }

  ngAfterViewInit() {
    // Obtener parámetros de la URL
    this.activatedRoute.queryParams.subscribe((params: Params) => {  // Especificar tipo para params
      if (params['origen']) {
        this.origen = params['origen']; // Ahora recibimos la dirección, no coordenadas
        console.log('Origen recibido:', this.origen);

        // Inicializar el mapa en el origen
        this.initializeMap();
        setTimeout(() => {
          if (this.map) {
            this.map.resize();
          }
        }, 100);
      }
    });
  }

  initializeMap() {
    // Centrar el mapa usando las coordenadas del origen
    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-70.6483, -33.4569], // Centrado inicial
      zoom: 12
    });
  }

  async onSearch() {
    if (this.searchQuery.length > 3) {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.searchQuery}.json?access_token=pk.eyJ1IjoiY2FybG9za2NzIiwiYSI6ImNtMzF0eGliZTEyb2oybG9qM2phdGFxODYifQ.qbEM3FTUA_e68TWGAkDDlg&autocomplete=true&limit=5`
      );

      const data = await response.json();
      if (data.features && data.features.length > 0) {
        this.suggestions = data.features;
        this.showMap = true; // Mostrar el mapa después de que se realice la búsqueda
      }
    }
  }

  onSelectSuggestion(suggestion: any) {
    // Obtener la dirección
    this.destinoDireccion = suggestion.place_name;

    // Centrar el mapa en la dirección seleccionada
    const [lng, lat] = suggestion.geometry.coordinates;
    if (this.map) {
      this.map.flyTo({
        center: [lng, lat],
        zoom: 14,
        essential: true
      });

      // Limpiar las sugerencias y mostrar el botón
      this.suggestions = [];
      setTimeout(() => {
        this.showButton = true;  // Mostrar el botón después de 3 segundos
      }, 4300); // 3000 ms = 3 segundos
    }
  }

  goToRoutePage() {
    // Navegar a la página de ruta, pasando el origen y destino como parámetros
    const destino = this.destinoDireccion; // Usamos la dirección seleccionada

    // Guardar el destino usando el servicio ViajeService
    this.viajeService.setDestino(this.destinoDireccion); // Guardamos solo la dirección
    this.navCtrl.navigateForward(['/ruta'], {
      queryParams: {
        origen: this.origen, // Pasamos la dirección del origen
        destino: this.destinoDireccion // Pasamos la dirección del destino
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (this.map) {
      setTimeout(() => {
        this.map.resize();
      }, 100);
    }
  }
}
