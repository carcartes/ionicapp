import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { IonSelect, NavController } from '@ionic/angular';

@Component({
  selector: 'app-origen',
  templateUrl: './origen.page.html',
  styleUrls: ['./origen.page.scss'],
})
export class OrigenPage implements AfterViewInit {
  @ViewChild('campusSelect', { static: false }) select: IonSelect | undefined;
  selectedCampus: string = ''; // Aquí se actualiza el campus en la barra de búsqueda
  showMap: boolean = false;

  constructor(private navCtrl: NavController) {}

  ngAfterViewInit() {}

  // Método para abrir el ion-select cuando se enfoca la barra de búsqueda
  openSelect() {
    if (this.select) {
      this.select.open();
    }
  }

  // Cuando se selecciona un campus, actualiza el nombre en la barra de búsqueda
  onCampusSelected(event: any) {
    this.selectedCampus = event.detail.value; // Actualiza el campo de búsqueda
    this.showMap = true; // Muestra la imagen del mapa
  }

  // Método para ir a la siguiente página
  goToNextPage() {
    this.navCtrl.navigateForward('/destino');
  }
}
