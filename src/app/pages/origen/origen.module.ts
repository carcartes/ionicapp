import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrigenPageRoutingModule } from './origen-routing.module';

import { OrigenPage } from './origen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrigenPageRoutingModule
  ],
  declarations: [OrigenPage]
})
export class OrigenPageModule {}
