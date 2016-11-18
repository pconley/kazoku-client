import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    let url: string = state.url;
    if( !this.authService.authenticated() ){
        console.error("AdminGuard. Not authenticated for "+url);
        return false; // deny access to the route
    }
    var profile = this.authService.get_user_profile();
    if( !profile ){
        console.error("AdminGuard. No profile for "+url);
        return false; // deny access to the route
    }
    let role: string = profile['role']
    let isAdmin: boolean = role == 'admin';
    if( !isAdmin ){
        console.error("AdminGuard. Invalid role ("+role+") for "+url);
        return false; // deny access to the route
    }
    //console.log("UserGuard: can active? "+isAdmin);
    return true;  // allow access to the rotue
  }
}