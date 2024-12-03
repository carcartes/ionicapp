import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-destino-modal',
  templateUrl: './destino-modal.component.html',
  styleUrls: ['./destino-modal.component.scss'],
})
export class DestinoModalComponent {
  @Input() destinoActual: string = '';  // Variable para el destino actual
  destinoInput: string = '';  // Variable para la entrada del destino
  destinoSugerencias: any[] = [];  // Array para las sugerencias de destino

  constructor(private modalController: ModalController) {}

  // Función para buscar sugerencias de destino
  buscarSugerencias() {
    if (this.destinoInput.length > 2) {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.destinoInput}.json?access_token=pk.eyJ1IjoiY2FybG9za2NzIiwiYSI6ImNtMzF0eGliZTEyb2oybG9qM2phdGFxODYifQ.qbEM3FTUA_e68TWGAkDDlg`)
        .then(res => res.json())
        .then(data => this.destinoSugerencias = data.features)
        .catch(err => console.error(err));
    }
  }

  // Función para seleccionar un lugar y cerrar el modal
  seleccionarLugar(lugar: any) {
    this.modalController.dismiss(lugar.place_name);  // Devuelve el nombre del lugar seleccionado
  }

  // Función para cerrar el modal
  cerrarModal() {
    this.modalController.dismiss(null);  // Cierra el modal sin pasar datos
  }
}
