import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MensajesChatPageRoutingModule } from './mensajes-chat-routing.module';

import { MensajesChatPage } from './mensajes-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MensajesChatPageRoutingModule
  ],
  declarations: [MensajesChatPage]
})
export class MensajesChatPageModule {}
