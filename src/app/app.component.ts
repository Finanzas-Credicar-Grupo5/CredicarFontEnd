import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TFfinanzas';
  constructor(private router: Router) {}

  //para el navbar
  mostrarNavbar(): boolean {
    // Obtener la ruta actual
    const rutaActual = this.router.url;

    // Determinar si mostrar el navbar basado en la ruta actual
    // Por ejemplo, mostrar el navbar en las rutas '/inicio' y '/otra-pagina'
    return rutaActual === '/' ||  rutaActual === '/inicio'|| rutaActual === '/registrarse'|| rutaActual === '/iniciar-sesion';
    

  }

  //para el footer
  showFooter(): boolean {
    // Obtener la ruta actual
    const currentRoute = this.router.url;
    
    // Verificar si la ruta actual corresponde a las páginas deseadas
    return currentRoute === '/inicio' || currentRoute === '/';
  }
}
