import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { AuthenticatorService } from 'src/app/service/authenticator.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {
  loginForm: FormGroup;
  mensaje: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private authenticatorService: AuthenticatorService,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = new FormGroup({
      dni_usuario: new FormControl(),
      contraseña_usuario: new FormControl()
    });
  }

  ngOnInit() {
    const usuarioAutenticado = this.authenticatorService.getAuthenticatedUser();
    if (usuarioAutenticado) {
      this.router.navigate(['adquirir-vehiculo']);
    } else {
      // Verifica si hay credenciales guardadas
      const dniGuardado = localStorage.getItem('dniGuardado');
      const contrasenaGuardada = localStorage.getItem('contrasenaGuardada');
         
      if (dniGuardado && contrasenaGuardada) {
        // Rellena el formulario con las credenciales guardadas
        this.loginForm.setValue({
          dni_usuario: dniGuardado,
          contraseña_usuario: contrasenaGuardada,
        });
      }
    }
  }

  iniciarSesion() {
    if (this.loginForm.valid) {
      const dni = this.loginForm.value.dni_usuario;
      const contrasena = this.loginForm.value.contraseña_usuario;

      // Lógica para verificar las credenciales en el servidor (cambia esto por tu propia lógica)
      const apiUrl = 'https://credicarapi-xctq.onrender.com/api/usuario';
      const credentials = { dni_usuario: dni, contraseña_usuario: contrasena };

      this.http.post<Usuario>(apiUrl, credentials).subscribe(
        (usuario) => {
          if (usuario) {
            // Las credenciales son válidas, autenticar al usuario
            this.authenticatorService.login(usuario);
            this.router.navigate(['adquirir-vehiculo']);
          } else {
            // Las credenciales son inválidas, muestra un mensaje de error
            this.mensaje = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
          }
        },
        () => {
          // Ocurrió un error durante la autenticación, muestra un mensaje de error
          this.mensaje = 'Se produjo un error durante la autenticación. Por favor, inténtalo de nuevo.';
        }
      );
    }
  }
}
