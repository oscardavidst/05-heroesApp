import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'heroeImagen',
})
export class HeroeImagenPipe implements PipeTransform {
  source: string = 'assets/heroes/[id].jpg';
  transform(value: Heroe): string {
    if (value.id != null) {
      return `assets/heroes/${value.id}.jpg`;
    } else {
      return 'assets/heroes/no-image.jpg';
    }
  }
}
