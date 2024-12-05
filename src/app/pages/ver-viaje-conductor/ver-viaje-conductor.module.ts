import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerViajeConductorPageRoutingModule } from './ver-viaje-conductor-routing.module';

import { VerViajeConductorPage } from './ver-viaje-conductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerViajeConductorPageRoutingModule
  ],
  declarations: [VerViajeConductorPage]
})
export class VerViajeConductorPageModule {}
