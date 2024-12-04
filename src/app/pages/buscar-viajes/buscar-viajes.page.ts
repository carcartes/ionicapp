import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Asegúrate de importar Router para navegar sin parámetros
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc 
} from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { EditViajeModalComponent } from '../../modales/edit-viaje-modal/edit-viaje-modal.component';

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
  fechaViaje: string = ''; // Fecha formateada
  horaViaje: string = '';  // Hora formateada
  horaLlegada: string = '';

  constructor(
    private route: ActivatedRoute, 
    public authService: AuthService, 
    private router: Router,  // Agregamos Router
    private modalController: ModalController
  ) {
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
    this.authService.authenticated$.subscribe((auth) => {
      this.isAuthenticated = auth;
      console.log(this.isAuthenticated ? 'Usuario autenticado' : 'Usuario no autenticado');
    });
  }

  logout() {
    this.authService.logout();
    console.log('Sesión cerrada');
  }

  async buscarViajes() {
    const origenBusqueda = this.origenInput.trim();
    const destinoBusqueda = this.destinoInput.trim();
    const viajesRef = collection(this.db, 'viajes');
    
    let q;
    
    if (origenBusqueda && destinoBusqueda) {
      q = query(
        viajesRef, 
        where('origen', '==', origenBusqueda), 
        where('destino', '==', destinoBusqueda)
      );
    } else if (origenBusqueda) {
      q = query(viajesRef, where('origen', '==', origenBusqueda));
    } else if (destinoBusqueda) {
      q = query(viajesRef, where('destino', '==', destinoBusqueda));
    } else {
      q = query(viajesRef);
    }
  
    try {
      console.log('Ejecutando consulta con parámetros:', {
        origen: origenBusqueda,
        destino: destinoBusqueda,
      });
  
      const querySnapshot = await getDocs(q);
      console.log('Documentos encontrados:', querySnapshot.size);
  
      if (querySnapshot.empty) {
        console.log('No se encontraron viajes que coincidan con los criterios.');
        this.viajes = [];
        return;
      }
  
      const viajesPromises = querySnapshot.docs.map(async (documento) => {
        const data = documento.data();
        console.log('Datos del viaje:', data);
  
        const viajeFecha = new Date(data['fecha']);
        const fechaActualUTC = new Date(new Date().toISOString().split('T')[0]);
  
        console.log('Fecha del viaje:', viajeFecha, 'Fecha actual:', fechaActualUTC);
  
        if (viajeFecha.getTime() > fechaActualUTC.getTime()) {
          console.log('El viaje es válido, buscando datos del conductor...');
          const conductorRef = doc(this.db, 'users', data['usuario_id']);
          const conductorDoc = await getDoc(conductorRef);
          
          if (conductorDoc.exists()) {
            const conductorData = conductorDoc.data();
            console.log('Datos del conductor:', conductorData);
  
            // Procesar la fecha y la hora
            this.procesarFecha(data['fecha']); // Llamada al método procesarFecha
  
            return { 
              id: documento.id, 
              ...data, 
              conductor: {
                name: conductorData['name'],
                surname: conductorData['surname'],
              },
            };
          } else {
            console.warn('No se encontraron datos del conductor para el usuario_id:', data['usuario_id']);
          }
        } else {
          console.log('El viaje está en el pasado y no se incluye.');
        }
        return null;
      });
  
      const resolvedViajes = await Promise.all(viajesPromises);
      this.viajes = resolvedViajes.filter((viaje) => viaje !== null);
  
      console.log('Viajes finales:', this.viajes);
  
    } catch (error) {
      console.error('Error al buscar viajes:', error);
    }
  }
  
  

  mostrarTodosLosViajes() {
    // Limpiar los parámetros de origen y destino
    this.origen = null;
    this.destino = null;

    // Limpiar los campos de entrada
    this.origenInput = '';
    this.destinoInput = '';

    // Navegar sin parámetros
    this.router.navigate(['/buscar-viajes'], { queryParams: {} });

    // Realizar la búsqueda sin filtros
    this.buscarViajes();
  }

  procesarFecha(fechaCompleta: string) {
    const fecha = new Date(fechaCompleta);
    const opcionesFecha: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const opcionesHora: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };

    this.fechaViaje = fecha.toLocaleDateString('es-ES', opcionesFecha); // "3 de diciembre de 2024"
    this.horaViaje = fecha.toLocaleTimeString('es-ES', opcionesHora);  // "15:30"
  }

  async AbrirEditViajeModal() {
    const modal = await this.modalController.create({
      component: EditViajeModalComponent,
      componentProps: { 
        origenActual: this.origenInput,
        destinoActual: this.destinoInput
      },
    });
  
    await modal.present();
  }
}
