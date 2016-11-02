import { Component, OnInit, ViewChild } from "@angular/core";

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

  foods: any[] = [
    {name: 'Pizza', rating: 'Excellent'},
    {name: 'Burritos', rating: 'Great'},
    {name: 'French fries', rating: 'Pretty good'},
  ];

  progress: number = 0;

  constructor( private auth: AuthService, ) {
    console.log("AppComponent#constructor");
  }

  ngOnInit(){ 
    console.log("AppComponent#init");

    // set up a global watcher of the authentication actions
    this.auth.login_observable.subscribe( x => { console.log(">>> watcher#login "+x); } );

    // continuously update the value for the progress-bar on an interval.
    setInterval(() => {
      this.progress = (this.progress + Math.floor(Math.random() * 4) + 1) % 100;
    }, 200);
  }
}
