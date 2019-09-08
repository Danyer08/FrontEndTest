import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Login } from '../models/login';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class HttpServicesService {

  constructor(private http: HttpClient) { }

  login(registerForm) {
    return this.http.post<Login>(`${environment.baseUrl}/v1/auth`, registerForm).toPromise();
  }

  register(loginForm) {
    return this.http.post<Register>(`${environment.baseUrl}/v1/users`, loginForm).toPromise();
  }

  getUsers() {
    return this.http.get<[]>(`${environment.baseUrl}/v1/users`).toPromise();
  }
}
