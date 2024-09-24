import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilEditPage } from './perfil-edit.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilEditPageRoutingModule {}
