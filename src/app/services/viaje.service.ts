import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, doc, getDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { getApp, initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ViajeService {
  private viajeData: any = {}; // Almacena los datos del viaje
  private db = getFirestore(initializeApp(environment.firebaseConfig)); // Configurar Firestore

  constructor() {}

  // Métodos para guardar los datos del viaje
  setOrigen(origen: string) {
    this.viajeData.origen = origen;
    console.log('Origen establecido:', origen);
  }

  setDestino(destino: string) {
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

// Método para obtener un viaje por ID desde Firestore
  async getViajeById(id: string): Promise<any> {
    const viajeRef = doc(this.db, 'viajes', id); // Obtener referencia al documento por ID
    try {
      const docSnap = await getDoc(viajeRef); // Obtener el documento
      if (docSnap.exists()) {
        return docSnap.data(); // Si el documento existe, devolver los datos
      } else {
        console.log('No se encontró el viaje con el ID:', id);
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el viaje por ID:', error);
      throw new Error('No se pudo obtener el viaje');
    }
  }

  // Método para obtener un viaje reservado por ID desde la colección 'mis-viajes'
  async getViajeReservadoById(id: string): Promise<any> {
    const viajeRef = doc(this.db, 'mis-viajes', id); // Obtener referencia al documento en 'mis-viajes'
    
    try {
      const docSnap = await getDoc(viajeRef); // Obtener el documento
      if (docSnap.exists()) {
        return docSnap.data(); // Si el documento existe, devolver los datos
      } else {
        console.log('No se encontró el viaje con el ID:', id);
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el viaje reservado por ID:', error);
      throw new Error('No se pudo obtener el viaje reservado');
    }
  }

 // Método para guardar un viaje reservado en la colección "mis-viajes"
async reservarViaje(usuarioId: string, viajeData: any): Promise<void> {
  const misViajesCollection = collection(this.db, 'mis-viajes');

  // Verificar que usuarioId y viajeData sean válidos
  if (!usuarioId || !viajeData) {
    throw new Error('No se pudo reservar el viaje: datos inválidos');
  }

  try {
    // Guardar los datos del viaje en la colección "mis-viajes" y obtener el ID del documento
    const docRef = await addDoc(misViajesCollection, {
      usuario_id: usuarioId,
      viaje: viajeData,
      fecha_reserva: new Date(),
    });

    // Agregar el campo `id` al objeto de reserva
    console.log('Reserva realizada con éxito con ID:', docRef.id);

    // Aquí puedes retornar el id o hacer alguna otra acción si es necesario
  } catch (error) {
    console.error('Error al reservar el viaje:', error);
    throw new Error('No se pudo reservar el viaje');
  }
}


  // Método para obtener los viajes reservados de un usuario
  async obtenerMisViajes(usuarioId: string): Promise<any[]> {
    const misViajesCollection = collection(this.db, 'mis-viajes');
    const q = query(misViajesCollection, where('usuario_id', '==', usuarioId)); // Filtrar por usuario_id

    try {
      const querySnapshot = await getDocs(q);
      const misViajes = querySnapshot.docs.map(doc => {
        // Incluir el ID del documento en cada objeto de viaje
        return { ...doc.data(), id: doc.id };
      });
      console.log('Viajes reservados obtenidos:', misViajes);
      return misViajes;
    } catch (error) {
      console.error('Error al obtener los viajes reservados:', error);
      throw new Error('No se pudieron obtener los viajes reservados');
    }
  }

  // Método para cancelar una reserva (eliminar de la colección "mis-viajes")
  async cancelarReserva(viajeId: string): Promise<void> {
    try {
      // Crear referencia al documento de viaje en la colección "mis-viajes"
      const viajeRef = doc(this.db, 'mis-viajes', viajeId);
      
      // Eliminar el documento
      await deleteDoc(viajeRef);
      console.log(`Viaje con ID ${viajeId} cancelado con éxito`);
    } catch (error) {
      console.error('Error al cancelar el viaje:', error);
      throw new Error('No se pudo cancelar el viaje');
    }
  }
  async obtenerIdsDeViajesComoConductor(usuarioId: string): Promise<string[]> {
    const viajesCollection = collection(this.db, 'viajes');
    const q = query(viajesCollection, where('usuario_id', '==', usuarioId)); // Filtrar por usuario_id
  
    try {
      const querySnapshot = await getDocs(q);
      const ids = querySnapshot.docs.map(doc => doc.id); // Solo obtener los IDs de los documentos
      console.log('IDs de viajes como conductor obtenidos:', ids);
      return ids;
    } catch (error) {
      console.error('Error al obtener los IDs de los viajes como conductor:', error);
      throw new Error('No se pudieron obtener los IDs de los viajes como conductor');
    }
  }
  async eliminarViaje(viajeId: string): Promise<void> {
    try {
      const viajeRef = doc(this.db, 'viajes', viajeId); // Referencia al documento en Firestore
      await deleteDoc(viajeRef); // Eliminar el documento
      console.log(`Viaje con ID ${viajeId} eliminado con éxito`);
    } catch (error) {
      console.error(`Error al eliminar el viaje con ID ${viajeId}:`, error);
      throw new Error('No se pudo eliminar el viaje');
    }
  }
  async obtenerReservasPorIdViaje(viajeId: string) {
    const misViajesCollection = collection(this.db, 'mis-viajes'); // Accedemos a la colección de mis-viajes (reservas)
    const q = query(misViajesCollection, where('viaje.id', '==', viajeId)); // Filtramos por el ID del viaje
  
    const querySnapshot = await getDocs(q);
    const reservas = querySnapshot.docs.map(doc => ({
      id: doc.id,  // Aquí agregamos el ID del documento en Firestore
      ...doc.data()
    }));
  
    return reservas;
  }
  

  async eliminarReservaPorId(reservaId: string): Promise<void> {
    const reservaRef = doc(this.db, 'mis-viajes', reservaId); // Referencia al documento
  
    try {
      await deleteDoc(reservaRef); // Eliminar el documento
      console.log(`Reserva con ID ${reservaId} eliminada con éxito`);
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
      throw new Error('No se pudo eliminar la reserva');
    }
  }
async actualizarViaje(viajeId: string, cambios: any): Promise<void> {
  const viajeRef = doc(this.db, 'viajes', viajeId); // Referencia al documento del viaje

  try {
    // Solo actualiza los campos de fecha y pasajeros
    await updateDoc(viajeRef, cambios);
    console.log('Viaje actualizado con éxito');
  } catch (error) {
    console.error('Error al actualizar el viaje:', error);
    throw new Error('No se pudo actualizar el viaje');
  }
}

}
