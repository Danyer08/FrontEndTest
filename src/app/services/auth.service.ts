import { Injectable } from '@angular/core';
import { UserProfile } from '../models/user-profile';
import { JwtHelperService } from '@auth0/angular-jwt/src/jwthelper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenKey = 'MCTekk_Token';

  constructor(private jwtHelperService: JwtHelperService) { }

  setToken(data): void {
    localStorage.setItem(this.tokenKey, JSON.stringify(data));
  }

  tokenExists() {
    if (this.getUserProfile() === null || undefined) {
      return false;
    }
    return true;
  }

  isTokenExpired(): boolean {
    if (this.getUserProfile() === null || undefined) {
      return false;
    }
    return this.jwtHelperService.isTokenExpired(this.getUserProfile().token);
  }

  getUserProfile(): UserProfile {
    return JSON.parse(localStorage.getItem(this.tokenKey)) as UserProfile;
  }
}
