import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { GeoJSON } from 'geojson';
import { ViajeService } from '../../services/viaje.service';  // Asegúrate de que la ruta al servicio sea correcta

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.page.html',
  styleUrls: ['./ruta.page.scss']
})
export class RutaPage implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: mapboxgl.Map;
  origen: any;
  destino: any;
  distancia: number = 0;  // Variable para almacenar la distancia
  origenDireccion: string = '';
  destinoDireccion: string = '';
  showButton = false; // Propiedad para controlar la visibilidad del botón

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private viajeService: ViajeService  
  ) {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiY2FybG9za2NzIiwiYSI6ImNtMzF0eGliZTEyb2oybG9qM2phdGFxODYifQ.qbEM3FTUA_e68TWGAkDDlg';
  }

  ngAfterViewInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['origen'] && params['destino']) {
        this.origen = params['origen'];  // Directamente usamos la dirección sin JSON.parse
        this.destino = params['destino'];  // Directamente usamos la dirección sin JSON.parse
        this.origenDireccion = this.origen; // Asignamos la dirección a la variable
        this.destinoDireccion = this.destino; // Asignamos la dirección a la variable
        this.initializeMap();
        setTimeout(() => {
          this.showButton = true;
        }, 3500);
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
      center: [-70.6483, -33.4569],  // Centrado inicial (por ejemplo, Santiago, Chile)
      zoom: 10
    });

    this.map.on('load', () => {
      this.drawRoute();
    });
  }

  async drawRoute() {
    // Convertir direcciones a coordenadas usando la API de Mapbox Geocoding
    const origenCoordinates = await this.getCoordinates(this.origenDireccion);
    const destinoCoordinates = await this.getCoordinates(this.destinoDireccion);

    if (origenCoordinates && destinoCoordinates) {
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origenCoordinates.lng},${origenCoordinates.lat};${destinoCoordinates.lng},${destinoCoordinates.lat}?alternatives=false&geometries=geojson&steps=true&access_token=${(mapboxgl as any).accessToken}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          const geojson: GeoJSON.FeatureCollection = {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: route.geometry,
                properties: {}
              }
            ]
          };

          // Acceder a la distancia de la ruta en metros y convertirla a kilómetros
          this.distancia = route.distance / 1000; // Convertir a kilómetros

          // Añadir la capa de la ruta al mapa
          if (this.map) {
            this.map.addLayer({
              id: 'route',
              type: 'line',
              source: {
                type: 'geojson',
                data: geojson
              },
              paint: {
                'line-color': '#0074cc',
                'line-width': 5
              }
            });

            // Ajustar la vista del mapa para mostrar toda la ruta
            this.map.fitBounds([
              [origenCoordinates.lng, origenCoordinates.lat], // Esquina suroeste
              [destinoCoordinates.lng, destinoCoordinates.lat]  // Esquina noreste
            ], { padding: 20 });
          }
        } else {
          console.error('No se encontraron rutas en la respuesta de la API de Directions');
        }
      } catch (error) {
        console.error('Error al obtener la ruta de la API de Directions:', error);
      }
    }
  }

  async getCoordinates(direccion: string): Promise<{ lat: number, lng: number } | null> {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${direccion}.json?access_token=${(mapboxgl as any).accessToken}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const coordinates = data.features[0].geometry.coordinates;
        return { lat: coordinates[1], lng: coordinates[0] };  // Retorna lat y lng
      }
    } catch (error) {
      console.error('Error al obtener las coordenadas:', error);
    }

    return null;  // En caso de error, retorna null
  }

  // Método para publicar el viaje, asegúrate de enviar los valores correctos
  publicarViaje() {
    this.viajeService.setOrigen(this.origenDireccion);  // Guardar la dirección correctamente
    this.viajeService.setDestino(this.destinoDireccion);  // Guardar la dirección correctamente
    // Otros detalles del viaje, como la fecha, precio, etc.
  }


  navigateToFecha() {
    this.router.navigate(['/fecha']);
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
