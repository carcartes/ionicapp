import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesMisViajesPage } from './detalles-mis-viajes.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesMisViajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesMisViajesPageRoutingModule {}
