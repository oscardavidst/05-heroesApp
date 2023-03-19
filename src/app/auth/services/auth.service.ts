import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/app/environments/environments';
import { Observable } from 'rxjs';
import { Auth } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = environment.apiEndPoint;

  constructor(private http: HttpClient) {}

  login(id: number): Observable<Auth> {
    return this.http.get<Auth>(`${this.apiUrl}/usuarios/${id}`);
  }
}
