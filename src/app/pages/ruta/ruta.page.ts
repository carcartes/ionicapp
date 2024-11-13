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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private viajeService: ViajeService  // Inyectamos el servicio
  ) {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiY2FybG9za2NzIiwiYSI6ImNtMzF0eGliZTEyb2oybG9qM2phdGFxODYifQ.qbEM3FTUA_e68TWGAkDDlg';
  }

  ngAfterViewInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['origen'] && params['destino']) {
        this.origen = JSON.parse(params['origen']);
        this.destino = JSON.parse(params['destino']);
        this.viajeService.setOrigen(this.origen);  // Guardamos el origen en el servicio
        this.viajeService.setDestino(this.destino);  // Guardamos el destino en el servicio
        this.getDireccion(this.origen, 'origen'); // Obtener dirección de origen
        this.getDireccion(this.destino, 'destino'); // Obtener dirección de destino
        this.initializeMap();
        setTimeout(() => {
          if (this.map) {
            this.map.resize();
          }
        }, 100);
      }
    });
  }

  async getDireccion(coordinates: { lat: number, lng: number }, tipo: string) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${(mapboxgl as any).accessToken}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const direccion = data.features[0].place_name;
        
        if (tipo === 'origen') {
          this.origenDireccion = direccion;
        } else if (tipo === 'destino') {
          this.destinoDireccion = direccion;
        }
      }
    } catch (error) {
      console.error('Error al obtener la dirección:', error);
    }
  }

  initializeMap() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.origen.lng, this.origen.lat],
      zoom: 10
    });

    this.map.on('load', () => {
      this.drawRoute();
    });
  }

  async drawRoute() {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${this.origen.lng},${this.origen.lat};${this.destino.lng},${this.destino.lat}?alternatives=false&geometries=geojson&steps=true&access_token=${(mapboxgl as any).accessToken}`;

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
        }
      } else {
        console.error('No se encontraron rutas en la respuesta de la API de Directions');
      }
    } catch (error) {
      console.error('Error al obtener la ruta de la API de Directions:', error);
    }
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
