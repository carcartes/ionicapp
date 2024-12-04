
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Importa el nuevo provideHttpClient
import { provideHttpClient } from '@angular/common/http';

// Importa los módulos de Firebase y AngularFire
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { OrigenModalComponent } from './modales/origen-modal/origen-modal.component'; 
import { DestinoModalComponent } from './modales/destino-modal/destino-modal.component';
import { PasajerosModalComponent } from './modales/pasajeros-modal/pasajeros-modal.component'; 
import { EditViajeModalComponent} from './modales/edit-viaje-modal/edit-viaje-modal.component'; 
import { FormsModule } from '@angular/forms';  


@NgModule({
  declarations: [AppComponent, OrigenModalComponent, DestinoModalComponent, PasajerosModalComponent, EditViajeModalComponent ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,  // Importa FormsModule aquí
    
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(), // Nueva forma de configurar HttpClient
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
