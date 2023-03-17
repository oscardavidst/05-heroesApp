import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  creadores = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.heroesService.getHeroePorId(id)))
        .subscribe((resp) => (this.heroe = resp));
    }
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) return;
    else {
      if (this.heroe.id) {
        // Actualizar heroe
        this.heroesService.actualizarHeroe(this.heroe).subscribe((resp) => {
          this.mostrarSnackBar('Registro actualizado');
        });
      } else {
        // Crear heroe
        this.heroesService.agregarHeroe(this.heroe).subscribe((resp) => {
          this.mostrarSnackBar('Registro actualizado');
          this.router.navigate(['/heroes/editar', resp.id]);
        });
      }
    }
  }

  borrar() {
    this.heroesService.borrarHeroe(this.heroe.id!).subscribe((resp) => {
      this.router.navigate(['/heroes/listado']);
    });
  }

  mostrarSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Ok!', {
      duration: 2500,
    });
  }
}
