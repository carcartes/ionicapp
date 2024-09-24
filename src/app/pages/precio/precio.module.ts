import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrecioPageRoutingModule } from './precio-routing.module';

import { PrecioPage } from './precio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrecioPageRoutingModule
  ],
  declarations: [PrecioPage]
})
export class PrecioPageModule {}
