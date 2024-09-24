import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicarViajesPageRoutingModule } from './publicar-viajes-routing.module';

import { PublicarViajesPage } from './publicar-viajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicarViajesPageRoutingModule
  ],
  declarations: [PublicarViajesPage]
})
export class PublicarViajesPageModule {}
