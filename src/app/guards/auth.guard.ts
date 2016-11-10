import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private AuthService: AuthService) {}

  canActivate() {
    var allowed = this.AuthService.authenticated();
    //console.log("can active? "+allowed);
    if( !allowed ) console.error("cannot activate authorized route!");
    return allowed;
  }
}