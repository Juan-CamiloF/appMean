import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  registrarUsuario = {
    nombre: '',
    cedula: '',
    edad: '',
    correo: '',
    pass: '',
  }
  ngOnInit(): void {
  }

  registrar(){
    this.auth.registroUsuario(this.registrarUsuario).subscribe(
      (res)=>{
        console.log(res);
      },
      (err) => console.log(err)
    );
  }
}
