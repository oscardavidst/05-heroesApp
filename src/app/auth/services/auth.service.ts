import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/app/environments/environments';
import { Observable, tap } from 'rxjs';
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

  login(id: number): Observable<Auth> {
    return this.http
      .get<Auth>(`${this.apiUrl}/usuarios/${id}`)
      .pipe(tap((resp) => (this._auth = resp)));
  }
}
