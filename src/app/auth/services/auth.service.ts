import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/app/environments/environments';
import { map, Observable, tap, of } from 'rxjs';

import { Auth } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth: Auth | undefined;
  private apiUrl: string = environment.apiEndPoint;

  constructor(private http: HttpClient) {}

  get auth() {
    return { ...this._auth };
  }

  verificarAutenticacion(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);

    return this.http.get<Auth>(`${this.apiUrl}/usuarios/1`).pipe(
      map((resp) => {
        this._auth = resp;
        return true;
      })
    );
  }

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${this.apiUrl}/usuarios/1`).pipe(
      tap((resp) => {
        this._auth = resp;
        localStorage.setItem('token', resp.id);
      })
    );
  }

  logout() {
    this._auth = undefined;
  }
}
