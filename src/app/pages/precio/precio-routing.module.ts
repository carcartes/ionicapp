import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrecioPage } from './precio.page';

const routes: Routes = [
  {
    path: '',
    component: PrecioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrecioPageRoutingModule {}
