import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { CanActivateViaAuthGuard } from './services/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AuthService, CanActivateViaAuthGuard ]
})
export class AppComponent implements OnInit {
  title = 'material1';

  isDarkTheme: boolean = false;

  constructor( private auth: AuthService, private router: Router ) {
    console.log("AppComponent#constructor");
  }

  goto(route){
    console.log("*** AppComponent#goto route="+route);
    this.router.navigate([route]);
  }

  ngOnInit(){ 
    console.log("AppComponent#init");

    // set up a global watcher of the authentication actions
    this.auth.login_observable.subscribe( x => { console.log(">>> watcher#login "+x); } );

 
  }
}
