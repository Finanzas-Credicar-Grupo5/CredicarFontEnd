import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
const base_url = enviroment.base

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = `${base_url}` 

  constructor(private http: HttpClient) { }

  insert(usuario: Usuario) {
    return this.http.post(this.url + 'usuario', usuario);
  }
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url + "usuarios");
  }
}
