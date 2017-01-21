import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';

import { AuthGuard }  from './guards/auth.guard';
import { UserGuard }  from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';

import { AngularFire, FirebaseAuthState } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'KazokuClient';

  isDarkTheme: boolean = false;

  constructor( 
    private auth: AuthService, 
    private router: Router,
    //private af: AngularFire
  ) {
    console.log("AppComponent#constructor");
  }

  ngOnInit(){ 
    console.log("AppComponent#init location="+location.href);

    var parser = document.createElement('a');
    parser.href = location.href;
    var start_path = parser.pathname;
    
    // this is an EXAMPLE of how a component can watch the
    // the changing authentication state of the current user
    this.auth.action.subscribe((isAuthenticated: boolean) => {
        console.log("AppComponent: firebase auth state changed to "+isAuthenticated);
        // whenever the authentication state changes redirect 
        var destination = isAuthenticated ? start_path : 'home' ;
        this.router.navigate([destination]);
    });
  }

  login(){
    console.log("AppComponent#login");
    this.auth.login();
    //this.goto('dashboard');
  }

  logout(){
    console.log("AppComponent#logout");
    this.auth.logout();
    //this.goto('home'); // force to public
  }

  goto_user(){
    var id = this.auth.profile.id; // firebase id
    console.log("AppComponent#goto_user id="+id);
    //console.log("*** AppComponent#goto member id = "+id);
    // jump to the member page for the current user
    this.router.navigate(['/member', id]);
  }

  goto_home(){
    let destination = this.auth.isAuthenticated ? 'dashboard' : 'home';
    this.goto(destination);
  }

  goto(route){
    console.log("AppComponent#goto route="+route);
    this.router.navigate([route]);
  }
}
