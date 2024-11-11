import { Component, ViewChild, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';  // Importación correcta de ActivatedRoute
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

  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute  // Inyección de ActivatedRoute
  ) {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiY2FybG9za2NzIiwiYSI6ImNtMzF0eGliZTEyb2oybG9qM2phdGFxODYifQ.qbEM3FTUA_e68TWGAkDDlg';
  }

  ngAfterViewInit() {
    // Obtener parámetros de la URL
    this.activatedRoute.queryParams.subscribe((params: Params) => {  // Especificar tipo para params
      if (params['origen']) {
        this.origen = JSON.parse(params['origen']);
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
    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.origen.lng, this.origen.lat], // Usar las coordenadas del origen
      zoom: 14,
      interactive: true
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
    const [lng, lat] = suggestion.geometry.coordinates;

    // Centrar el mapa en la dirección seleccionada
    if (this.map) {
      this.map.flyTo({
        center: [lng, lat],
        zoom: 14,
        essential: true
      });

      // Limpiar las sugerencias y mostrar el botón
      this.suggestions = [];
      this.showButton = true;
    }
  }

  goToRoutePage() {
    // Navegar a la página de ruta, pasando el origen y destino como parámetros
    const destino = {
      lat: this.map.getCenter().lat,
      lng: this.map.getCenter().lng
    };
    this.navCtrl.navigateForward(['/ruta'], {
      queryParams: {
        origen: JSON.stringify(this.origen),
        destino: JSON.stringify(destino)
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
