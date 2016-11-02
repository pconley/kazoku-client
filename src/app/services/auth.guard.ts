import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate() {
    var allowed = this.authService.authenticated();
    //console.log("can active? "+allowed);
    if( !allowed ) console.error("cannot activate authorized route!");
    return allowed;
  }
}