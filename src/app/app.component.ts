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
    //private UserGuard: UserGuard, 
    //private AdminGuard: AdminGuard, 
    private auth: AuthService, 
    private router: Router,
    private af: AngularFire
  ) {
    console.log("AppComponent#constructor");
  }

  logout(){
    console.log("AppComponent#logout");
    this.goto('home'); // force to public
    this.auth.logout();
  }

  goto_user(){
    var id = this.auth.profile.id; // firebase id
    console.log("AppComponent#goto_user id="+id);
    //console.log("*** AppComponent#goto member id = "+id);
    // jump to the member page for the current user
    this.router.navigate(['/member', id]);
  }

  goto_home(){
    let home = this.af.auth ? 'dashboard' : 'home';
    this.goto(home);
  }

  goto(route){
    console.log("AppComponent#goto route="+route);
    this.router.navigate([route]);
  }

  ngOnInit(){ 
    console.log("AppComponent#init");
    // this is an EXAMPLE of how a component can watch the
    // the changing authentication state of the current user
    this.af.auth.subscribe((state: FirebaseAuthState) => {
        console.log("W: firebase auth state changed to...",state);
        this.goto('home'); // redirect to public home page
    });
  }
}
