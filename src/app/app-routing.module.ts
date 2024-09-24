import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
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
    path: 'publicar',
    loadChildren: () => import('./pages/publicar/publicar.module').then( m => m.PublicarPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'mensajes',
    loadChildren: () => import('./pages/mensajes/mensajes.module').then( m => m.MensajesPageModule)
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
    path: 'publicar-viajes',
    loadChildren: () => import('./pages/publicar-viajes/publicar-viajes.module').then( m => m.PublicarViajesPageModule)
  },
  {
    path: 'mensajes-chat/:id',
    loadChildren: () => import('./pages/mensajes-chat/mensajes-chat.module').then( m => m.MensajesChatPageModule)
  },  {
    path: 'perfil-edit',
    loadChildren: () => import('./pages/perfil-edit/perfil-edit.module').then( m => m.PerfilEditPageModule)
  },
  {
    path: 'detalles-viaje',
    loadChildren: () => import('./pages/detalles-viaje/detalles-viaje.module').then( m => m.DetallesViajePageModule)
  },
  {
    path: 'detalles-mis-viajes',
    loadChildren: () => import('./pages/detalles-mis-viajes/detalles-mis-viajes.module').then( m => m.DetallesMisViajesPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./pages/password/password.module').then( m => m.PasswordPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
