import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajeEditPage } from './viaje-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ViajeEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajeEditPageRoutingModule {}
