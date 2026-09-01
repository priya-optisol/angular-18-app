import { inject, Injectable } from '@angular/core';
import { User, UserResponse } from './employee-model';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../../app.config'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  http = inject(HttpClient);
  config = inject(APP_CONFIG);
  constructor() { }
  getUsers(limit: number = 20, skip: number = 0): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.config.apiPrefix}/users?limit=${limit}&skip=${skip}`);
  }
}
