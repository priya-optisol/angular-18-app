import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

export interface User { id: String, name: String, role: 'ADMIN' | 'USER' }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  private _user = signal<User | null>(null);
  private _token =  signal<String | null>(localStorage.getItem('token'))

  user =  this._user.asReadonly();
  token =  this._token.asReadonly();
  isLoggedIn = computed(()=>!!this._token());

  login(email:string,password:string){
    return this.http.post<{token:string,user:User}>('/auth/login',{email,password}).pipe(
      tap((res)=>{
        this._token.set(res.token);
        this._user.set(res.user);
        localStorage.setItem("token",res.token);
      })
    );
  }
  
  hasRole(role:string){
    return this._user()?.role===role;
  }

  logout(){
    this._token.set(null);
    this._user.set(null);
    localStorage.removeItem("token");
  }
}
