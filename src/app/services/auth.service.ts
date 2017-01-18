import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject }    from 'rxjs/ReplaySubject';
import { tokenNotExpired } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { AuthProviders, AuthMethods } from 'angularfire2';

declare var Auth0: any;     // avoids "name not found" warnings
declare var Auth0Lock: any; // avoids "name not found" warnings
  
const AUTH0_DOMAIN = 'kazoku.auth0.com';
const AUTH0_CLIENT_ID = '6VtNWmSNXVxLDCxiDQaE6xGbBAbs4Nkk';

@Injectable()
export class AuthService {

  private auth0lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {});
  private auth0base = new Auth0({ domain : AUTH0_DOMAIN, clientID: AUTH0_CLIENT_ID})

  private _userProfileCache;

  private authState;
  public isAuthenticated: boolean = false;
  public profile: any = {};

  // Note: we are using the replay subject because the other watchers
  // are constructed after the auth service and need to see the login
  private _login_subject = new ReplaySubject<string>();
  login_observable = this._login_subject.asObservable();

  constructor(
    private router: Router,
    public af: AngularFire
  ) {
    console.log('*** AuthService#constructor location=',location.href);
    //console.log("auth0 object...",this.auth0base);

    // subscribe to the firebase auth state so we can react as it changes
    // and get or set the profile from the associated firebase user record
    af.auth.subscribe((state: FirebaseAuthState) => {
        console.log(">>> firebase auth state...",state);
        this.authState = state;
        this.isAuthenticated = !!state;
        this.profile = {}; // clear it 
        if( !!state ){
          console.log(">>> firebase getting user profile");
          af.database
            .object('/users/'+state.auth.uid, { preserveSnapshot: true })
            .first()
            .subscribe(user => {
              this.profile = user.val();
              console.log("<<< profile...",this.profile);
          });
        }
    });        
    
    // callback for auth0lock `authenticated` event on the the 
    // auth0 lock object fires after a user logs in to system
    this.auth0lock.on("authenticated", (authResult) => {
      console.log('*** AuthService#OnAuthenticated. authResult...',authResult);
      console.log('>>> token = '+authResult.idToken);
      // localStorage.setItem('id_token', authResult.idToken);
      // retrieve the profile information from server
      this.auth0lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) { 
          console.error("*** AuthService#OnAuthenticated: error retrieving the user profile");
          alert(error); 
          return; 
        }
        console.log("=====> PROFILE...",profile);
        //this._userProfileCache = this.save_user_profile(profile);
        // Set the options to retreive a firebase delegation token
        var options = {
          id_token : authResult.idToken,
          api : 'firebase',
          scope : 'openid name email displayName',
          target: '6VtNWmSNXVxLDCxiDQaE6xGbBAbs4Nkk'
        };
        // Make a call to the Auth0 '/delegate' to get the delegate token
        this.auth0base.getDelegationToken(options, function(err, result) {
            if( err ){
                console.error("auth0.getDelegationToken failed. err...",err);
                alert(err); 
                return;  // user not logged into firebase... hmmm
            }     
            console.log("auth0.getDelegationToken result...",result);
            // use the auth0 delegate token to login to firebase 
            // anf get back the firebase auth token    
            af.auth.login(result.id_token, {
                provider: AuthProviders.Custom,
                method: AuthMethods.CustomToken,
            }).then(function(fb_auth_token){
                // FINALLY!!! logged into both auth0 and firebase; but the 
                console.log("af auth then: fb_auth_token...",fb_auth_token);
            }).catch(function(error) {
              console.error("login to firebase failed. error...",error);
              alert(error); 
            });
        });
      });
    });
  }

  public login() {
    console.log("*** AuthService#login");
    this.router.navigate(['home']);
    this._login_subject.next("open login window");
    this.auth0lock.show(); // display login popup window
  };

  public logout() {
    console.log("*** AuthService#logout");
    // localStorage.removeItem('id_token');
    // localStorage.removeItem('profile');
    this.af.auth.logout();
    this._userProfileCache = null;
    this._login_subject.next("the logout!");
  };

  // get_user_profile(){

  //     //var user = this.af.auth.   //firebase.auth().currentUser;

  //     var user_profile = {};

  //     // if (user != null) {
  //     //   user.providerData.forEach(function (profile) {
  //     //     user_profile = profile;
  //     //     console.log("Sign-in provider: "+profile.providerId);
  //     //     console.log("  Provider-specific UID: "+profile.uid);
  //     //     console.log("  Name: "+profile.displayName);
  //     //     console.log("  Email: "+profile.email);
  //     //     console.log("  Photo URL: "+profile.photoURL);
  //     //   });
  //     // }

  //   //console.log("*** AuthService#get_user_profile");
  //   //this._userProfileCache = this._userProfileCache || this.fetch_user_profile();
  //   //return this._userProfileCache; // may still be null if no profile stored

  //   return user_profile;
  //  }

  // fetch_user_profile(){
  //   // the profile may have saved to local storage (along with 
  //   // the token_id) at the time the user logged into the system
  //   var json = localStorage.getItem('profile');
  //   if( !json ) return null; // no profile exists
  //   var profile = JSON.parse(json);
  //   // enhance the profile with the create year attribute
  //   var created_at = profile['created_at'];
  //   profile['create_year'] = created_at.substring(0, 4);
  //   console.log("AuthService#fetch_user_profile: profile...",profile); 
  //   return profile;
  // }

  // save_user_profile(profile){
  //   // the profile is saved to local storage (along with the
  //   // token_id) at the time the user logged into the system
  //   this._login_subject.next("saving profile to local storage");
  //   // localStorage.setItem('profile', JSON.stringify(profile));
  //   console.log("=== AuthService#get_user_profile: profile...",profile);
  //   return profile;
  // }
}