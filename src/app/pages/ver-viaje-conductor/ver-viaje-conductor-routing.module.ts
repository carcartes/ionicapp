import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerViajeConductorPage } from './ver-viaje-conductor.page';

const routes: Routes = [
  {
    path: '',
    component: VerViajeConductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerViajeConductorPageRoutingModule {}
