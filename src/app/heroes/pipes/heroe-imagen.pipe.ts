import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'heroeImagen',
})
export class HeroeImagenPipe implements PipeTransform {
  source: string = 'assets/heroes/[id].jpg';
  transform(value: Heroe): string {
    if (!value.id && !value.alt_img) {
      return 'assets/heroes/no-image.png';
    } else if (value.alt_img) {
      return value.alt_img;
    } else {
      return `assets/heroes/${value.id}.jpg`;
    }
  }
}
