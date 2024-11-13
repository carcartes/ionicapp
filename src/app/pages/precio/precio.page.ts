import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ViajeService } from '../../services/viaje.service';  // Asegúrate de que la ruta del servicio sea correcta

@Component({
  selector: 'app-precio',
  templateUrl: 'precio.page.html',
  styleUrls: ['precio.page.scss'],
})
export class PrecioPage {
  price: number = 500; // Precio inicial

  constructor(
    private navCtrl: NavController,
    private viajeService: ViajeService  // Inyectamos el servicio
  ) {}

  ngOnInit() {
    // Si ya se ha establecido un precio en el servicio, usarlo como valor inicial
    const viajeData = this.viajeService.getViajeData();
    if (viajeData.precio) {
      this.price = viajeData.precio;
    }
  }

  // Método para aumentar el precio
  increasePrice() {
    this.price += 500; // Incrementa el precio en 500 CLP
  }

  // Método para disminuir el precio
  decreasePrice() {
    if (this.price > 500) { // Asegura que el precio no baje de 500 CLP
      this.price -= 500; // Decrementa el precio en 500 CLP
    }
  }

  // Método para navegar a la siguiente página y guardar el precio
  goToNextPage() {
    // Guardar el precio en el servicio
    this.viajeService.setPrecio(this.price);

    // Navegar a la siguiente página
    this.navCtrl.navigateForward('/autos'); // Cambia '/autos' por la ruta de tu página destino
  }
}
