import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MensajesChatPage } from './mensajes-chat.page';

const routes: Routes = [
  {
    path: '',
    component: MensajesChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MensajesChatPageRoutingModule {}
