import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ruta',
  templateUrl: 'ruta.page.html',
  styleUrls: ['ruta.page.scss'],
})
export class RutaPage {
  // Variable para manejar las opciones seleccionadas
  selectedOptions: string[] = [];

  constructor(private navCtrl: NavController) {}

  // Método para navegar a la siguiente página
  goToNextPage() {
    // Aquí puedes implementar lógica para manejar las opciones seleccionadas
    console.log('Opciones seleccionadas:', this.selectedOptions);
    
    // Navegar a la siguiente página
    this.navCtrl.navigateForward('/fecha'); // Cambia '/siguiente-pagina' por la ruta de tu página destino
  }

  // Método para manejar cambios en las opciones seleccionadas
  onOptionChange(option: string, event: any) {
    if (event.detail.checked) {
      this.selectedOptions.push(option);
    } else {
      const index = this.selectedOptions.indexOf(option);
      if (index > -1) {
        this.selectedOptions.splice(index, 1);
      }
    }
  }
}
