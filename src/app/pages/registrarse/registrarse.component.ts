import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from 'src/app/service/usuario.service';
import { AuthenticatorService } from 'src/app/service/authenticator.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  mensaje: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private authenticatorService: AuthenticatorService,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      dni_usuario: new FormControl(),
      nombre_usuario: new FormControl('', [Validators.required]),
      apellido_usuario: new FormControl('', [Validators.required]),
      correo_usuario: new FormControl('', [Validators.required]),
      contraseña_usuario: new FormControl(),
    });
  }
  

  aceptar() {
    this.usuario.dni_usuario = this.form.value['dni_usuario'];
    this.usuario.nombre_usuario = this.form.value['nombre_usuario'];
    this.usuario.apellido_usuario = this.form.value['apellido_usuario'];
    this.usuario.correo_usuario = this.form.value['correo_usuario'];
    this.usuario.contraseña_usuario = this.form.value['contraseña_usuario'];

    if (this.form.valid) {
      this.usuarioService.insert(this.usuario).subscribe((data) => {
        // Manejar respuesta después de la inserción, si es necesario
        localStorage.setItem('dniGuardado', this.usuario.dni_usuario.toString());
        localStorage.setItem('contrasenaGuardada', this.usuario.contraseña_usuario);
        this.authenticatorService.login(this.usuario);
        this.router.navigate(['iniciar-sesion']);
      });
    } else {
      this.mensaje = "Agregue campos omitidos";
    }
  }
}
