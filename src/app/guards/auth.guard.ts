import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private AuthService: AuthService) {}

  canActivate() {
    return this.AuthService.isAuthenticated;
  }
}