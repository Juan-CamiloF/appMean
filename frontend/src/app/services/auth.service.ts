import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registroUrl = 'http://localhost:3000/api/usuario/';
  private loginUrl = 'http://localhost:3000/api/auth';
  constructor(private http: HttpClient, private router:Router) {}

  registroUsuario(usuario) {
    return this.http.post<any>(this.registroUrl, usuario);
  }
  loginUsuario(usuario) {
    return this.http.post<any>(this.loginUrl, usuario);
  }
  loginOn() {
    return !!localStorage.getItem('Token');
  }
  obtenerToken() {
    return localStorage.getItem('Token');
  }
  cerrarSesion(){
    localStorage.removeItem('Token');
    this.router.navigate(['/login']);
  }
}
