import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate() {
    var authenticated = this.authService.authenticated();
    if( !authenticated ){
        //console.log("AdminGuard. cannot activate because not authenticated");
        return false; // deny access to the route
    }
    var profile = this.authService.get_user_profile();
    if( !profile ){
        //console.log("AdminGuard. cannot activate because no profile");
        return false; // deny access to the route
    }
    var currentRole = profile['role']
    var isAdmin = currentRole == 'admin';
    if( !isAdmin ){
        //console.log("AdminGuard. cannot activate because invalid role = "+currentRole);
        return false; // deny access to the route
    }
    //console.log("UserGuard: can active? "+isAdmin);
    return isAdmin;
  }
}