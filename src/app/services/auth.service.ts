import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject }    from 'rxjs/ReplaySubject';
import { tokenNotExpired } from 'angular2-jwt';

declare var Auth0Lock: any; // Avoids "name not found"" warnings

@Injectable()
export class AuthService {

  private lock = new Auth0Lock('6VtNWmSNXVxLDCxiDQaE6xGbBAbs4Nkk', 'kazoku.auth0.com', {});
  private _userProfileCache;
  // Note: we are using the replay subject because the other watchers
  // are constructed after the auth service and need to see the login
  private _login_subject = new ReplaySubject<string>();
  login_observable = this._login_subject.asObservable();

  constructor(private router: Router) {
    console.log('*** AuthService#constructor location=',location.href);
    // callback for lock `authenticated` event on the the 
    // auth0 lock object fires after a user logs in to system
    this.lock.on("authenticated", (authResult) => {
      console.log('*** AuthService#OnAuthenticated. authResult...',authResult);
      console.log('>>> token = '+authResult.idToken);
      localStorage.setItem('id_token', authResult.idToken);
      // retrieve the profile information from server
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) { 
          console.error("*** AuthService#OnAuthenticated: error retrieving the user profile");
          alert(error); 
          return; 
        }
        this._userProfileCache = this.save_user_profile(profile);
      });
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
    this._userProfileCache = null;
    this._login_subject.next("the logout!");
  };

  get_user_profile(){
    //console.log("*** AuthService#get_user_profile");
    this._userProfileCache = this._userProfileCache || this.fetch_user_profile();
    return this._userProfileCache; // may still be null if no profile stored
   }

  fetch_user_profile(){
    // the profile may have saved to local storage (along with 
    // the token_id) at the time the user logged into the system
    var json = localStorage.getItem('profile');
    if( !json ) return null; // no profile exists
    var profile = JSON.parse(json);
    // enhance the profile with the create year attribute
    var created_at = profile['created_at'];
    profile['create_year'] = created_at.substring(0, 4);
    console.log("AuthService#fetch_user_profile: profile...",profile); 
    return profile;
  }

  save_user_profile(profile){
    // the profile is saved to local storage (along with the
    // token_id) at the time the user logged into the system
    this._login_subject.next("saving profile to local storage");
    localStorage.setItem('profile', JSON.stringify(profile));
    console.log("AuthService#get_user_profile: profile...",profile);
    return profile;
  }
}