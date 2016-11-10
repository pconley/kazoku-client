import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Note: we are using the replay subject because the other watchers
// are constructed after the auth service and need to see the login
import {ReplaySubject}    from 'rxjs/ReplaySubject';

import { tokenNotExpired } from 'angular2-jwt';

declare var Auth0Lock: any; // Avoids "name not found"" warnings

@Injectable()
export class AuthService {

  // Configure Auth0 
  lock = new Auth0Lock('6VtNWmSNXVxLDCxiDQaE6xGbBAbs4Nkk', 'kazoku.auth0.com', {});

  // to store profile object in auth class
  userProfile: Object;

  private _login_subject = new ReplaySubject<string>();
  login_observable = this._login_subject.asObservable();

  constructor(private router: Router) {

    console.log('*** AuthService#constructor location=',location.href);

    var parser = document.createElement('a');
    parser.href = location.href;
    // IF this is a new login start, then the parser.hash will look like this...
    // #access_token=SG90NTdx8UsxQqW9&id_token=QF1objpQm6E&token_type=Bearer
    var regex = new RegExp("#access_token=(.*)&id_token=(.*)&token_type=Bearer", "g");
    var parts = regex.exec(parser.hash);

    if( parts == null ){
      // then this is a normal page load, *not* one triggered
      // by the login process from the user via Auth0 calllback
      console.log("*** page load from scratch");
      if( this.authenticated() ){
        // we are already logged into the application on the page restart
        // so send the message to anyone that has on-login actions to take
        this._login_subject.next("the auto login");
        this.userProfile = this.get_local_profile();
      }
      return;
    }

    console.log("*** page load from login. parts...",parts);

    // here is the crux of the situation, the authentication call back (below)
    // is never called (as described in the auth0 documentation), so we perform
    // THE ACTION THAT WAS MEANT TO HAPPEN IN THE AUTHENTICATED in the constructor

    // store the id to indicate the login state
    localStorage.setItem('id_token', parts[2]);
    this._login_subject.next("the actual login");

    // Fetch profile information
    this.lock.getProfile(parts[2], (error, profile) => {
      if (error) { 
        console.log("*** error loading the profile");
        alert(error); 
        return; 
      }
      this.userProfile = this.set_local_profile(profile);
    });
  
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      // THIS CALLBACK IS NOT GETTING FIRED FOR SOME REASON, SO 
      // WE ARE GENERATING AN ERROR MESSAGE IN CASE IT EVER DOES
      console.error('*** AuthService#OnAuthenticated. authResult...',authResult);
      console.log('>>> token = '+authResult.idToken);
      localStorage.setItem('id_token', authResult.idToken);
    });
  }

  public login() {
    console.log("*** AuthService#login");
    this.router.navigate(['home']);
    this._login_subject.next("open login window");
    this.lock.show(); // display login popup window
  };

  public authenticated() {
    // we are currently authenthicated if there
    // is an unexpired JWT in local storage
    var hasValidToken = tokenNotExpired();
    //console.log('authenticated? '+hasValidToken);
    return hasValidToken;
  };

  public logout() {
    console.log("*** AuthService#logout");
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this._login_subject.next("the logout!");
  };

  get_local_profile(){
        // the profile was saved to local storage (along with the
        // token_id) at the time the user logged into the system
        var json = localStorage.getItem('profile');
        var profile = JSON.parse(json);
        profile.create_year = profile.created_at.substring(0, 4);
        console.log("AuthService#get_local_profile: profile...",profile); 
        return profile;
    }

    set_local_profile(profile){
        // the profile is saved to local storage (along with the
        // token_id) at the time the user logged into the system
        this._login_subject.next("found the profile... save it");
        localStorage.setItem('profile', JSON.stringify(profile));
        console.log("set local profile...",profile);
        return profile;
    }
}