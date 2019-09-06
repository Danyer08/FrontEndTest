import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.authService.tokenExists() || this.authService.isTokenExpired()) {
      this.router.navigate(['login']);
      localStorage.clear();
      return false;
    } else {
      return true;
    }
  }
}
