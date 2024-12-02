import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'buscar',
    loadChildren: () => import('./pages/buscar/buscar.module').then( m => m.BuscarPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'viajes',
    loadChildren: () => import('./pages/viajes/viajes.module').then( m => m.ViajesPageModule)
  },
  {
    path: 'buscar-viajes',
    loadChildren: () => import('./pages/buscar-viajes/buscar-viajes.module').then( m => m.BuscarViajesPageModule)
  },
  {
    path: 'mensajes-chat/:id',
    loadChildren: () => import('./pages/mensajes-chat/mensajes-chat.module').then( m => m.MensajesChatPageModule)
  },
  {
    path: 'perfil-edit',
    loadChildren: () => import('./pages/perfil-edit/perfil-edit.module').then( m => m.PerfilEditPageModule)
  },
  {
    path: 'detalles-mis-viajes/:id',
    loadChildren: () => import('./pages/detalles-mis-viajes/detalles-mis-viajes.module').then(m => m.DetallesMisViajesPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./pages/password/password.module').then( m => m.PasswordPageModule)
  },
  {
    path: 'destino',
    loadChildren: () => import('./pages/destino/destino.module').then( m => m.DestinoPageModule)
  },
  {
    path: 'origen',
    loadChildren: () => import('./pages/origen/origen.module').then( m => m.OrigenPageModule)
  },
  {
    path: 'ruta',
    loadChildren: () => import('./pages/ruta/ruta.module').then( m => m.RutaPageModule)
  },
  {
    path: 'fecha',
    loadChildren: () => import('./pages/fecha/fecha.module').then( m => m.FechaPageModule)
  },
  {
    path: 'pasajeros',
    loadChildren: () => import('./pages/pasajeros/pasajeros.module').then( m => m.PasajerosPageModule)
  },
  {
    path: 'precio',
    loadChildren: () => import('./pages/precio/precio.module').then( m => m.PrecioPageModule)
  },
  {
    path: 'descripcion',
    loadChildren: () => import('./pages/descripcion/descripcion.module').then( m => m.DescripcionPageModule)
  },
  {
    path: 'autos',
    loadChildren: () => import('./pages/autos/autos.module').then( m => m.AutosPageModule)
  },
  {
    path: 'detalle-viaje/:id',
    loadChildren: () => import('./pages/detalle-viaje/detalle-viaje.module').then( m => m.DetalleViajePageModule)
  },
  {
    path: 'mis-viajes',
    loadChildren: () => import('./pages/mis-viajes/mis-viajes.module').then( m => m.MisViajesPageModule)
  },
  {
    path: 'viaje-edit/:id',
    loadChildren: () => import('./pages/viaje-edit/viaje-edit.module').then( m => m.ViajeEditPageModule)
  },








];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
