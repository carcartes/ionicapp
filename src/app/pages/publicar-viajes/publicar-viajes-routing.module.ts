import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicarViajesPage } from './publicar-viajes.page';

const routes: Routes = [
  {
    path: '',
    component: PublicarViajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicarViajesPageRoutingModule {}
