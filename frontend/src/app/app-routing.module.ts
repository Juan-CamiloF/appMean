import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { CrearComponent } from './tablero/crear/crear.component';
import { ListarComponent } from './tablero/listar/listar.component';

const routes: Routes = [
  { path:'',component:InicioComponent, pathMatch:'full'},
  { path:'listarActividad',component:ListarComponent},
  { path:'crearActividad',component:CrearComponent},
  { path:'login',component:InicioComponent},
  { path:'registro',component:RegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
