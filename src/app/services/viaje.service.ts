import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getApp, initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ViajeService {
  private viajeData: any = {}; // Almacena los datos del viaje
  private db = getFirestore(initializeApp(environment.firebaseConfig)); // Configurar Firestore

  constructor() {}

  // Métodos para guardar los datos del viaje
  setOrigen(origen: { lat: number, lng: number }) {
    this.viajeData.origen = origen;
    console.log('Origen establecido:', origen);
  }

  setDestino(destino: { lat: number, lng: number }) {
    this.viajeData.destino = destino;
    console.log('Destino establecido:', destino);
  }

  setRuta(ruta: string) {
    this.viajeData.ruta = ruta;
    console.log('Ruta establecida:', ruta);
  }

  setFecha(fecha: string) {
    this.viajeData.fecha = fecha;
    console.log('Fecha establecida:', fecha);
  }

  setPasajeros(pasajeros: number) {
    this.viajeData.pasajeros = pasajeros;
    console.log('Número de pasajeros establecido:', pasajeros);
  }

  setPrecio(precio: number) {
    this.viajeData.precio = precio;
    console.log('Precio establecido:', precio);
  }

  setAuto(auto: string) {
    // Si no se establece un auto, asignamos un valor por defecto de "Nissan"
    this.viajeData.auto = auto || 'Nissan';
    console.log('Auto establecido:', this.viajeData.auto);
  }

  setDescripcion(descripcion: string) {
    this.viajeData.descripcion = descripcion;
    console.log('Descripción establecida:', descripcion);
  }

  // Método para publicar el viaje con los datos almacenados en Firestore
  async publicarViaje(usuarioId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      // Verificar si faltan datos esenciales
      console.log('Verificando datos del viaje para publicar...');
      
      // Mostrar los datos en la consola para verificar qué campos están definidos
      console.log('Origen:', this.viajeData.origen);
      console.log('Destino:', this.viajeData.destino);
      console.log('Fecha:', this.viajeData.fecha);
      console.log('Precio:', this.viajeData.precio);
      console.log('Auto:', this.viajeData.auto);
      console.log('Descripción:', this.viajeData.descripcion);

      if (
        !this.viajeData.origen ||
        !this.viajeData.destino ||
        !this.viajeData.fecha ||
        !this.viajeData.precio ||
        !this.viajeData.auto ||
        !this.viajeData.descripcion
      ) {
        console.error('Faltan datos esenciales para publicar el viaje');
        reject('Faltan datos esenciales para publicar el viaje');
        return;
      }

      // Establecer el usuario ID en los datos del viaje
      this.viajeData.usuario_id = usuarioId;
      console.log('Usuario ID añadido:', usuarioId);

      // Crear la referencia a la colección 'viajes' en Firestore
      const viajesCollection = collection(this.db, 'viajes');
      console.log('Referencia a la colección "viajes" creada');

      try {
        // Agregar los datos del viaje a la colección
        const docRef = await addDoc(viajesCollection, this.viajeData);
        console.log('Viaje publicado con éxito con ID:', docRef.id);

        // Resolver la promesa con los datos del viaje
        resolve(this.viajeData);
      } catch (error) {
        console.error('Error al publicar el viaje:', error);
        reject('Error al publicar el viaje');
      }
    });
  }

  // Obtener los datos del viaje
  getViajeData() {
    console.log('Datos del viaje obtenidos:', this.viajeData);
    return this.viajeData;
  }
}
