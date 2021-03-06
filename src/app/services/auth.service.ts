import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject }    from 'rxjs/ReplaySubject';
import { tokenNotExpired } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable, FirebaseAuthState } from 'angularfire2';
import { AuthProviders, AuthMethods, FirebaseObjectObservable } from 'angularfire2';

import { trace } from '../utilities/trace';

declare var Auth0: any;     // avoids "name not found" warnings
declare var Auth0Lock: any; // avoids "name not found" warnings
  
const AUTH0_DOMAIN = 'kazoku.auth0.com';
const AUTH0_CLIENT_ID = '6VtNWmSNXVxLDCxiDQaE6xGbBAbs4Nkk';

@Injectable()
export class AuthService {

  private auth0lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {});
  private auth0base = new Auth0({ domain : AUTH0_DOMAIN, clientID: AUTH0_CLIENT_ID})

  public isAuthenticated: boolean = false;

  public profile: any = {};

  // Note: we are using the replay subject because the other watchers
  // are constructed after the auth service and need to see the login
  private _subject = new ReplaySubject<boolean>();
  action = this._subject.asObservable();

  constructor(
    private router: Router,
    public af: AngularFire
  ) {
    //trace.log('*** AuthService#constructor location=',location.href);
    //trace.log("auth0 object...",this.auth0base);

    // subscribe to the firebase auth state so we can react as it changes
    // and get or set the profile from the associated firebase user record
    af.auth.subscribe((auth_state: FirebaseAuthState) => {
        this.isAuthenticated = !!auth_state;
        trace.log("firebase auth state changed to ",this.isAuthenticated);
        this.profile = { isAdmin: false }; // always clear to an empty profile
        if( this.isAuthenticated ){
          trace.log("firebase auth state id...",auth_state.auth.uid);
          let foo = af.database.object('/users/'+auth_state.auth.uid, { preserveSnapshot: true })
          foo.subscribe((snapshot) => {
              trace.log("firebase user key...",snapshot.key);
              let profile = snapshot.val() // may be null
              this.profile = profile || { isAdmin: false } ;
              trace.log("firebase user profile...",this.profile);
              // we wait until we have a valid profile mostly for the 
              // guards which seem to rely on a synch flag to be set
              this._subject.next(true); // notify subscribers of login
          });
        } else {
          trace.log("else not authenticated");
          this._subject.next(false); // notify subscribers of logout
        }
    });        
    
    // callback for auth0lock `authenticated` event on the the 
    // auth0 lock object fires after a user logs in to system
    this.auth0lock.on("authenticated", (authResult) => {
      //trace.log('*** AuthService#OnAuthenticated. authResult...',authResult);

      // use the auth0 results to authenticate with firebase
      this.authenticate_to_firebase(authResult.idToken);

      // retrieve the Auth0 profile information (not currently used)
      this.auth0lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) { 
          console.error("auth0 error retrieving the user profile");
          alert(error); 
        } else {
          trace.log("auth0 profile...",profile);
        }
      });

    });
  }

  private authenticate_to_firebase(id_token){
      var that = this;
      // first make a call to the Auth0 to get the "delegate token"
      var options = {
          id_token : id_token, api : 'firebase',
          scope : 'openid name email displayName',
          target: '6VtNWmSNXVxLDCxiDQaE6xGbBAbs4Nkk'
      };
      this.auth0base.getDelegationToken(options, function(err, result) {
            if( err ){
                console.error("auth0.getDelegationToken failed. err...",err);
                alert(err); 
                return;
            }     
            // trace.log("auth0.getDelegationToken result...",result);
            // then use the auth0 delegate token to login to firebase 
            that.af.auth.login(result.id_token, {
                provider: AuthProviders.Custom,
                method: AuthMethods.CustomToken,
            }).then(function(fb_auth_token){
                // FINALLY!!! logged into both auth0 and firebase; but any action
                // is taken in a subscription to the firebase authentication
                trace.log("af auth then: fb_auth_token...",fb_auth_token);
            }).catch(function(error) {
                console.error("login to firebase failed. error...",error);
                alert(error); 
            });
      });
  }
  
  public login() {
    trace.log("AuthService#login");
    //this.router.navigate(['home']);
    this.auth0lock.show(); // display login popup window
  };

  public logout() {
    trace.log("AuthService#logout");
    this.af.auth.logout();
    //this._login_subject.next("the logout!");
  };
}