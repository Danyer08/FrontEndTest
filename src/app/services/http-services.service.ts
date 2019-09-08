import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { User } from '../models/user';
import { UserProfile } from '../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class HttpServicesService {

  constructor(private http: HttpClient) { }

  login(registerForm) {
    return this.http.post<UserProfile>(`${environment.baseUrl}/v1/auth`, registerForm).toPromise();
  }

  register(loginForm) {
    return this.http.post<User>(`${environment.baseUrl}/v1/users`, loginForm).toPromise();
  }

  getUsers() {
    return this.http.get<User[]>(`${environment.baseUrl}/v1/users`).toPromise();
  }
}
