import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesMisViajesPageRoutingModule } from './detalles-mis-viajes-routing.module';

import { DetallesMisViajesPage } from './detalles-mis-viajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesMisViajesPageRoutingModule
  ],
  declarations: [DetallesMisViajesPage]
})
export class DetallesMisViajesPageModule {}
