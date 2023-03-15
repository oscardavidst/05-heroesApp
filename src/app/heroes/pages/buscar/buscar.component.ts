import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent {
  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe;

  constructor(private heroesService: HeroesService) {}

  buscando() {
    this.heroesService
      .getHeroePorCaracter(this.termino.trim())
      .subscribe((resp) => (this.heroes = resp));
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (event.option.value) {
      const heroe: Heroe = event.option.value;

      this.termino = heroe.superhero;

      this.heroesService
        .getHeroePorId(heroe.id!)
        .subscribe((resp) => (this.heroeSeleccionado = resp));
    }
  }
}
