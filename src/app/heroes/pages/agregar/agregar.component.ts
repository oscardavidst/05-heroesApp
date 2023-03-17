import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroePorId(id)))
      .subscribe((resp) => (this.heroe = resp));
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) return;
    else {
      if (this.heroe.id) {
        // Actualizar heroe
        this.heroesService.actualizarHeroe(this.heroe).subscribe(console.log);
      } else {
        // Crear heroe
        this.heroesService.agregarHeroe(this.heroe).subscribe((resp) => {
          this.router.navigate(['/heroes/editar', resp.id]);
        });
      }
    }
  }
}
