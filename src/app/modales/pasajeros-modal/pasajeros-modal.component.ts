import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pasajeros-modal',
  templateUrl: './pasajeros-modal.component.html',
  styleUrls: ['./pasajeros-modal.component.scss'],
})
export class PasajerosModalComponent {
  cantidadAsientos: number = 1;  // Valor inicial de asientos

  constructor(private modalController: ModalController) {}

  // Función para cambiar la cantidad de asientos (aumentar o disminuir)
  cambiarCantidad(cambio: number) {
    const nuevaCantidad = this.cantidadAsientos + cambio;
    if (nuevaCantidad >= 1 && nuevaCantidad <= 4) {
      this.cantidadAsientos = nuevaCantidad;
    }
  }

  // Función para guardar y salir del modal
  guardarYSalir() {
    this.modalController.dismiss(this.cantidadAsientos);
  }

  // Función para cerrar el modal sin guardar
  cerrarModal() {
    this.modalController.dismiss(null);
  }
}
