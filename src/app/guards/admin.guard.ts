import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    //let url: string = state.url;
    //console.log("AdminGuard. url="+url);
    if( !this.authService.isAuthenticated ){
        //console.error("AdminGuard. cannot activate because not authenticated");
        return false; // deny access to the route
    }
    var profile = this.authService.profile;
    if( !profile ){
        console.error("AdminGuard. cannot activate because no profile");
        return false; // deny access to the route
    }
    if( !profile.isUser && !profile.isAdmin ){
        console.error("AdminGuard. cannot activate because invalid role",profile.isUser,profile.isAdmin);
        return false; // deny access to the route
    }
    return true;
  }
}