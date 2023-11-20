import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './sharepage/navbar/navbar.component';
import { NavbarUserComponent } from './sharepage/navbar-user/navbar-user.component';
import { FooterComponent } from './sharepage/footer/footer.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { AdquirirVehiculoComponent } from './pages/adquirir-vehiculo/adquirir-vehiculo.component';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';


//IMPORTS
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { CronogramaPagosComponent } from './pages/cronograma-pagos/cronograma-pagos.component';


@NgModule({
  declarations: [
    AppComponent,
    
    NavbarComponent,
    NavbarUserComponent,
    FooterComponent,
    InicioComponent,
    RegistrarseComponent,
    IniciarSesionComponent,
    AdquirirVehiculoComponent,
    SobreNosotrosComponent,
    CronogramaPagosComponent
    
  ],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 
}
