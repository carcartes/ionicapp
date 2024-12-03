import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-origen-modal',
  templateUrl: './origen-modal.component.html',
  styleUrls: ['./origen-modal.component.scss'],
})
export class OrigenModalComponent {
  @Input() origenActual: string = '';
  origenInput: string = '';
  origenSugerencias: any[] = [];

  constructor(private modalController: ModalController) {}

  buscarSugerencias() {
    if (this.origenInput.length > 2) {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.origenInput}.json?access_token=pk.eyJ1IjoiY2FybG9za2NzIiwiYSI6ImNtMzF0eGliZTEyb2oybG9qM2phdGFxODYifQ.qbEM3FTUA_e68TWGAkDDlg`)
        .then(res => res.json())
        .then(data => this.origenSugerencias = data.features)
        .catch(err => console.error(err));
    }
  }

  seleccionarLugar(lugar: any) {
    this.modalController.dismiss(lugar.place_name);
  }

  cerrarModal() {
    this.modalController.dismiss(null);
  }
}
