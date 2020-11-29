import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  loguear = {
    correo: '',
    pass: '',
  };

  ngOnInit(): void {}

  login() {
    this.auth.loginUsuario(this.loguear).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('Token',res.jwtToken);
        this.router.navigate(['/listarActividad']);
      },
      (err) => console.log(err)
    );
  }
}
