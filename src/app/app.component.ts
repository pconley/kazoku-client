import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseAuthState } from 'angularfire2';

import { AuthService } from './services/auth.service';

import { AuthGuard }  from './guards/auth.guard';
import { UserGuard }  from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';

import { trace, TraceLevel } from './utilities/trace';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //title = 'KazokuClient';
  //href = "";

  isDarkTheme: boolean = false;

  constructor( 
    private auth: AuthService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(){
    trace.set(environment.trace_level);
    trace.warn('AppComponent#init. environment...', environment);
    const start_url = location.pathname + location.search;
    trace.log("AppComponent#init start url = ",start_url);
    // watch the changing authentication state of the current user
    this.auth.action.subscribe((isAuthenticated: boolean) => {
        trace.log("AppComponent: firebase auth state changed to "+isAuthenticated);
        // redirect to the original URL or to the public home page
        var destination = isAuthenticated ? start_url : '/home' ;
        this.router.navigateByUrl(destination);
    });
  }

  login(){
    trace.log("AppComponent#login");
    this.auth.login();
  }

  logout(){
    trace.log("AppComponent#logout");
    this.auth.logout();
  }

  goto_user(){
    var id = this.auth.profile.id; // firebase id
    trace.log("AppComponent#goto_user id="+id);
    //trace.log("*** AppComponent#goto member id = "+id);
    // jump to the member page for the current user
    this.router.navigate(['/member', id]);
  }

  goto_home(){
    let destination = this.auth.isAuthenticated ? 'dashboard' : 'home';
    this.goto(destination);
  }

  goto(route){
    trace.log("AppComponent#goto route="+route);
    this.router.navigate([route]);
  }
}
