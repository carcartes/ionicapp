import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajeEditPageRoutingModule } from './viaje-edit-routing.module';

import { ViajeEditPage } from './viaje-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajeEditPageRoutingModule
  ],
  declarations: [ViajeEditPage]
})
export class ViajeEditPageModule {}
