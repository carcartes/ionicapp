import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-precio',
  templateUrl: 'precio.page.html',
  styleUrls: ['precio.page.scss'],
})
export class PrecioPage {
  price: number = 500; // Precio inicial

  constructor(private navCtrl: NavController) {}

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

  // Método para navegar a la siguiente página
  goToNextPage() {
    // Navegar a la siguiente página
    this.navCtrl.navigateForward('/autos'); // Cambia '/siguiente-pagina' por la ruta de tu página destino
  }
}
