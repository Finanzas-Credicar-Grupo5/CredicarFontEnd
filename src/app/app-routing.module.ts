import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { AdquirirVehiculoComponent } from './pages/adquirir-vehiculo/adquirir-vehiculo.component';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';
import { CronogramaPagosComponent } from './pages/cronograma-pagos/cronograma-pagos.component';

const routes: Routes = [
  {path:'', component:InicioComponent},
  {path:'inicio',component:InicioComponent},
  {path:'registrarse',component:RegistrarseComponent},
  {path:'iniciar-sesion',component:IniciarSesionComponent},
  {path:'adquirir-vehiculo',component:AdquirirVehiculoComponent},
  {path:'sobre-nosotros',component:SobreNosotrosComponent},
  {path:'cronograma-pagos',component:CronogramaPagosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppRoutingModule { }
