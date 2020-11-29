import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TableroService } from '../../services/tablero.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
})
export class CrearComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private tablero: TableroService
  ) {}

  crearActividad = {
    nombre: '',
    estado: '',
    descripcion: '',
  };
  ngOnInit(): void {}

  crear() {
    this.tablero.crearActividad(this.crearActividad).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/listarActividad']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
