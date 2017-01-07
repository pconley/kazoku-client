import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';

import { AuthGuard }  from './guards/auth.guard';
import { UserGuard }  from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';

import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'KazokuClient';

  isDarkTheme: boolean = false;

  constructor( 
    private UserGuard: UserGuard, 
    private AdminGuard: AdminGuard, 
    private auth: AuthService, 
    private router: Router,
    private af: AngularFire
  ) {
    console.log("AppComponent#constructor");
  }


  logout(){
    console.log("*** AppComponent#logout");
    this.goto('home'); // force to public
    this.auth.logout();
  }

  fire_login(){
    this.af.auth
      .login()
      //.login({email: 'email@example.com',password: 'password'})
      .catch(function(error) {console.log(error);});
  }

  goto_user(){
    var id = this.auth.get_user_profile()['member_id'];
    console.log("*** AppComponent#goto member id = "+id);
    // jump to the member page for the current user
    this.router.navigate(['/member', id]);
  }

  goto_home(){
    let home = this.UserGuard.canActivate() ? 'dashboard' : 'home';
    this.goto(home);
  }
  goto(route){
    console.log("*** AppComponent#goto route="+route);
    this.router.navigate([route]);
  }

  ngOnInit(){ 
    console.log("AppComponent#init");
    // set up a global watcher of the authentication
    // actions to redirect to the home page on logout
    this.auth.login_observable.subscribe( x => { 
      console.log(">>> watcher#login "+x); 
    });
  }
}
