import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
      if( state ) console.log("UserGuard# url="+state.url);

    if( !this.authService.isAuthenticated ){
        //console.error("UserGuard. cannot activate because not authenticated");
        return false; // deny access to the route
    }
    var profile = this.authService.profile;
    if( !profile ){
        console.error("UserGuard. cannot activate because no profile");
        return false; // deny access to the route
    }
    if( !profile.isUser && !profile.isAdmin ){
        console.error("UserGuard. cannot activate because invalid role",profile.isUser,profile.isAdmin);
        return false; // deny access to the route
    }
    return true;
  }
}