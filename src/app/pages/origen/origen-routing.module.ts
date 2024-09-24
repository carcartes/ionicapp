import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrigenPage } from './origen.page';

const routes: Routes = [
  {
    path: '',
    component: OrigenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrigenPageRoutingModule {}
