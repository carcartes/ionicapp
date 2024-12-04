import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { OrigenModalComponent } from '../origen-modal/origen-modal.component';
import { DestinoModalComponent } from '../destino-modal/destino-modal.component';
import { PasajerosModalComponent } from '../pasajeros-modal/pasajeros-modal.component';

@Component({
  selector: 'app-edit-viaje-modal',
  templateUrl: './edit-viaje-modal.component.html',
  styleUrls: ['./edit-viaje-modal.component.scss'],
})
export class EditViajeModalComponent  implements OnInit {
  origenInput: string = ''; // Entrada para el origen
  destinoInput: string = ''; // Entrada para el destino
  origenSugerencias: any[] = []; // Sugerencias para el origen
  destinoSugerencias: any[] = []; // Sugerencias para el destino
  fecha: string = ''; // Fecha seleccionada
  pasajeros: number = 1; // Número de pasajeros seleccionado
  isAuthenticated: boolean = false;
  

  constructor(private router: Router, public authService: AuthService, private modalController: ModalController) { }

  ngOnInit() {
    this.authService.authenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
      console.log(this.isAuthenticated ? 'Usuario autenticado' : 'Usuario no autenticado');
    });
    
  }
  logout() {
    this.authService.logout();
    console.log('Sesión cerrada');
  }

  

  

  /**
   * Busca sugerencias de lugares usando Mapbox
   * @param tipo - 'origen' o 'destino'
   */
  buscarSugerencias(tipo: 'origen' | 'destino') {
    const query = tipo === 'origen' ? this.origenInput : this.destinoInput;

    if (query.length > 2) {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1IjoiY2FybG9za2NzIiwiYSI6ImNtMzF0eGliZTEyb2oybG9qM2phdGFxODYifQ.qbEM3FTUA_e68TWGAkDDlg`)
        .then((res) => res.json())
        .then((data) => {
          if (tipo === 'origen') {
            this.origenSugerencias = data.features;
          } else {
            this.destinoSugerencias = data.features;
          }
        })
        .catch((err) => console.error('Error fetching Mapbox data:', err));
    }
  }

  /**
   * Selecciona un lugar y guarda su dirección
   * @param tipo - 'origen' o 'destino'
   * @param lugar - Lugar seleccionado
   */
  seleccionarLugar(tipo: 'origen' | 'destino', lugar: any) {
    if (tipo === 'origen') {
      this.origenInput = lugar.place_name;
      this.origenSugerencias = [];
    } else {
      this.destinoInput = lugar.place_name;
      this.destinoSugerencias = [];
    }
  }

  async abrirOrigenModal() {
    const modal = await this.modalController.create({
      component: OrigenModalComponent,
      componentProps: { origenActual: this.origenInput },
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) this.origenInput = data.data;
    });

    return await modal.present();
  }

  async abrirDestinoModal() {
    const modal = await this.modalController.create({
      component: DestinoModalComponent,
      componentProps: { destinoActual: this.destinoInput },
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) this.destinoInput = data.data;
    });

    return await modal.present();
  }

  async abrirPasajerosModal() {
    const modal = await this.modalController.create({
      component: PasajerosModalComponent,
      componentProps: { pasajerosActual: this.pasajeros },
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) this.pasajeros = data.data;
    });

    return await modal.present();
  }

  async onBuscarClick() {
    
    await this.modalController.dismiss();
  
  }

  // Método para cerrar el modal
  async cerrarModal() {
    await this.modalController.dismiss();
  }
  

}
