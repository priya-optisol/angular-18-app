import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { APP_CONFIG } from '../../app.config'

export interface User { id: string, email: string, firstName: string, image: string, username: string, lastName: string, gender: string, refreshToken: string, role: 'ADMIN' | 'USER', accessToken: string }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  private _user = signal<User | null>(null);
  private _token = signal<String | null>(localStorage.getItem('token'))

  user = this._user.asReadonly();
  token = this._token.asReadonly();
  isLoggedIn = computed(() => !!this._token());

  config = inject(APP_CONFIG);
  login(username: string, password: string) {
    console.log(`${this.config.apiPrefix}/auth/login`);
    return this.http.post<User>(`${this.config.apiPrefix}/auth/login`, { "username": username, "password": password }).pipe(
      tap((res) => {
        this._token.set(res.accessToken);
        this._user.set(res);
        localStorage.setItem("token", res.accessToken);
      })
    );
  }

  hasRole(role: string) {
    return this._user()?.role === role;
  }

  logout() {
    this._token.set(null);
    this._user.set(null);
    localStorage.removeItem("token");
  }
}
