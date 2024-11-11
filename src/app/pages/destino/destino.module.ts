import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DestinoPageRoutingModule } from './destino-routing.module';
import { DestinoPage } from './destino.page';
import { RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DestinoPageRoutingModule,
    RouterModule // Asegúrate de incluir RouterModule
  ],
  declarations: [DestinoPage]
})
export class DestinoPageModule {}
