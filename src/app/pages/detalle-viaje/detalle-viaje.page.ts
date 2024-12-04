import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViajeService } from '../../services/viaje.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage implements OnInit {
  viaje: any;  // Datos del viaje
  usuario: any;  // Datos del usuario (conductor)
  isAuthenticated: boolean = false;  // Estado de autenticación del usuario

  fechaViaje: string = ''; // Fecha formateada
  horaViaje: string = '';  // Hora formateada
  horaLlegada: string = '';

  constructor(
    private route: ActivatedRoute,
    private viajeService: ViajeService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.authService.authenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
      console.log(this.isAuthenticated ? 'Usuario autenticado' : 'Usuario no autenticado');
    });

    const viajeId = this.route.snapshot.paramMap.get('id');
    if (viajeId) {
      this.cargarViaje(viajeId);
    }
  }
  
  async calcularHoraLlegada() {
    if (!this.viaje.origenLat || !this.viaje.origenLong) {
      // Si las coordenadas de origen no están presentes, obtenerlas mediante geocodificación
      console.log('Coordenadas de origen no encontradas, obteniendo de Mapbox...');
      try {
        const geocodingUrlOrigen = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(this.viaje.origen)}.json?access_token=pk.eyJ1IjoiY2FybG9za2NzIiwiYSI6ImNtMzF0eGliZTEyb2oybG9qM2phdGFxODYifQ.qbEM3FTUA_e68TWGAkDDlg`;
        const geocodingResponseOrigen = await fetch(geocodingUrlOrigen);
        const geocodingDataOrigen = await geocodingResponseOrigen.json();
  
        if (!geocodingDataOrigen.features || geocodingDataOrigen.features.length === 0) {
          console.error('No se encontraron coordenadas para el origen:', geocodingDataOrigen);
          return;
        }
  
        const origenCoords = geocodingDataOrigen.features[0].geometry.coordinates;
        this.viaje.origenLong = origenCoords[0];
        this.viaje.origenLat = origenCoords[1];
  
        // Imprimir las coordenadas de origen
        console.log('Coordenadas de origen obtenidas:', this.viaje.origenLat, this.viaje.origenLong);
      } catch (error) {
        console.error('Error al obtener coordenadas de origen:', error);
        return;
      }
    }
  
    try {
      // Paso 1: Obtener las coordenadas del destino
      const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(this.viaje.destino)}.json?access_token=pk.eyJ1IjoiY2FybG9za2NzIiwiYSI6ImNtMzF0eGliZTEyb2oybG9qM2phdGFxODYifQ.qbEM3FTUA_e68TWGAkDDlg`;
      const geocodingResponse = await fetch(geocodingUrl);
      const geocodingData = await geocodingResponse.json();
  
      if (!geocodingData.features || geocodingData.features.length === 0) {
        console.error('No se encontraron coordenadas para el destino:', geocodingData);
        return;
      }
  
      const destinoCoords = geocodingData.features[0].geometry.coordinates;
      this.viaje.destinoLong = destinoCoords[0];
      this.viaje.destinoLat = destinoCoords[1];
  
      // Imprimir las coordenadas de destino
      console.log('Coordenadas de destino:', this.viaje.destinoLat, this.viaje.destinoLong);
  
      // Paso 2: Llamar a la API de direcciones para calcular la distancia y duración
      const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${this.viaje.origenLong},${this.viaje.origenLat};${this.viaje.destinoLong},${this.viaje.destinoLat}?access_token=pk.eyJ1IjoiY2FybG9za2NzIiwiYSI6ImNtMzF0eGliZTEyb2oybG9qM2phdGFxODYifQ.qbEM3FTUA_e68TWGAkDDlg`;
      const directionsResponse = await fetch(directionsUrl);
      const directionsData = await directionsResponse.json();
  
      if (!directionsData.routes || directionsData.routes.length === 0) {
        console.error('No se encontraron rutas en la respuesta de Mapbox:', directionsData);
        return;
      }
  
      const distanciaKm = directionsData.routes[0].distance / 1000; // Convertir a kilómetros
      const velocidadPromedio = 80; // Km/h
      const tiempoHoras = distanciaKm / velocidadPromedio; // Tiempo en horas
  
      // Imprimir la distancia en km
      console.log('Distancia en km:', distanciaKm);
  
      // Paso 3: Calcular la hora de llegada
  
      // Primero, usar la hora formateada (horaViaje) como base para calcular la hora de salida
      const horaSalida = new Date(this.viaje.fecha); // Crear un objeto Date con la fecha original
  
      // Convertimos la hora de salida procesada (horaViaje) a horas y minutos
      const [hora, minutos] = this.horaViaje.split(':').map(Number); // Esto descompone la horaViaje (ej. "15:30") en horas y minutos
      horaSalida.setHours(hora);
      horaSalida.setMinutes(minutos);
  
      // Luego calculamos la hora de llegada
      horaSalida.setHours(horaSalida.getHours() + Math.floor(tiempoHoras));
      horaSalida.setMinutes(horaSalida.getMinutes() + Math.round((tiempoHoras % 1) * 60));
  
      // Formatear la hora de llegada
      this.horaLlegada = horaSalida.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
  
      console.log('Hora de llegada calculada:', this.horaLlegada);
    } catch (error) {
      console.error('Error al calcular la hora de llegada:', error);
    }
  }
  
  

  goBack() {
    this.router.navigate(['/buscar-viajes']) ;
  }

  async cargarViaje(viajeId: string) {
    try {
      this.viaje = await this.viajeService.getViajeById(viajeId);
      console.log('Datos del viaje:', this.viaje);
  
      if (this.viaje && this.viaje.fecha) {
        this.procesarFecha(this.viaje.fecha);
      }
  
      if (this.viaje && this.viaje.usuario_id) {
        this.usuario = await this.authService.getUserData(this.viaje.usuario_id);
        console.log('Datos del usuario:', this.usuario);
      }
  
      // Calcular la hora de llegada si hay un destino
      if (this.viaje.destino) {
        this.calcularHoraLlegada();
      } else {
        console.error('No hay destino especificado en los datos del viaje');
      }
    } catch (error) {
      console.error('Error al cargar los detalles del viaje:', error);
    }
  }
  

  procesarFecha(fechaCompleta: string) {
    const fecha = new Date(fechaCompleta);
    const opcionesFecha: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const opcionesHora: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };

    this.fechaViaje = fecha.toLocaleDateString('es-ES', opcionesFecha); // "3 de diciembre de 2024"
    this.horaViaje = fecha.toLocaleTimeString('es-ES', opcionesHora);  // "15:30"
  }

  async reservarViaje() {
    if (this.viaje && this.isAuthenticated) {
      const usuarioId = await this.authService.getUsuarioId();
      if (this.viaje.usuario_id === usuarioId) {
        const alert = await this.alertController.create({
          header: 'Acción no permitida',
          message: 'No puedes reservar tu propio viaje.',
          buttons: ['OK']
        });
        await alert.present();
        return;
      }

      if (!usuarioId || !this.viaje || !this.viaje.id) {
        console.log('Datos inválidos para la reserva');
        return;
      }

      try {
        if (this.viaje.pasajeros > 0) {
          await this.viajeService.reservarViaje(usuarioId, this.viaje);
          const nuevosPasajeros = this.viaje.pasajeros - 1;
          await this.viajeService.actualizarPasajeros(this.viaje.id, nuevosPasajeros);
          this.presentAlert('Reserva exitosa', 'El viaje ha sido reservado con éxito.');
          this.router.navigate(['/mis-viajes']);
        } else {
          this.presentAlert('Error', 'No hay más asientos disponibles en este viaje.');
        }
      } catch (error) {
        console.error('Error al reservar el viaje:', error);
      }
    } else {
      console.log('Faltan datos para reservar el viaje o el usuario no está autenticado');
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log('Sesión cerrada');
  }
}
