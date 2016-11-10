import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate() {
    var authenticated = this.authService.authenticated();
    if( !authenticated ){
        console.log("UserGuard. cannot activate because not authorized");
        return false; // deny access to the route
    }
    var profile = this.authService.userProfile;
    if( !profile ){
        console.log("UserGuard. cannot activate because no profile");
        return false; // deny access to the route
    }
    var currentRole = profile['role']
    var index = ['admin','user'].indexOf(currentRole);
    var isUserOrAdmin = (index != -1);
    if( !isUserOrAdmin ){
        console.log("UserGuard. cannot activate because invalid role = "+currentRole);
        return false; // deny access to the route
    }
    console.log("UserGuard: can active? "+isUserOrAdmin);
    return isUserOrAdmin;
  }
}