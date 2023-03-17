import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../interfaces/heroes.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private apiUrl: string = environment.apiEndPoint;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.apiUrl}/heroes`);
  }

  getHeroePorId(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.apiUrl}/heroes/${id}`);
  }

  getHeroePorCaracter(caracter: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(
      `${this.apiUrl}/heroes?q=${caracter}&_limit=6`
    );
  }

  agregarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${this.apiUrl}/heroes`, heroe);
  }

  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`${this.apiUrl}/heroes/${heroe.id}`, heroe);
  }
}
