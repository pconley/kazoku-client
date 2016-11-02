System.register(["@angular/core", "@angular/router", "rxjs/ReplaySubject", "angular2-jwt"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, ReplaySubject_1, angular2_jwt_1, AuthService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (ReplaySubject_1_1) {
                ReplaySubject_1 = ReplaySubject_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            }
        ],
        execute: function () {
            AuthService = (function () {
                function AuthService(router) {
                    var _this = this;
                    this.router = router;
                    // Configure Auth0 
                    this.lock = new Auth0Lock('6VtNWmSNXVxLDCxiDQaE6xGbBAbs4Nkk', 'kazoku.auth0.com', {});
                    this._login_subject = new ReplaySubject_1.ReplaySubject();
                    this.login_observable = this._login_subject.asObservable();
                    console.log('*** AuthService#constructor location=', location.href);
                    var parser = document.createElement('a');
                    parser.href = location.href;
                    // IF this is a new login start, then the parser.hash will look like this...
                    // #access_token=SG90NTdx8UsxQqW9&id_token=QF1objpQm6E&token_type=Bearer
                    var regex = new RegExp("#access_token=(.*)&id_token=(.*)&token_type=Bearer", "g");
                    var parts = regex.exec(parser.hash);
                    if (parts == null) {
                        // then this is a normal page load, *not* one triggered
                        // by the login process from the user via Auth0 calllback
                        console.log("*** page load from scratch");
                        if (this.authenticated) {
                            // we are already logged into the application on the page restart
                            // so send the message to anyone that has on-login actions to take
                            this._login_subject.next("the auto login");
                        }
                        return;
                    }
                    console.log("*** page load from login. parts...", parts);
                    // here is the crux of the situation, the authentication call back (below)
                    // is never called (as described in the auth0 documentation), so we perform
                    // THE ACTION THAT WAS MEANT TO HAPPEN IN THE AUTHENTICATED in the constructor
                    // store the id to indicate the login state
                    localStorage.setItem('id_token', parts[2]);
                    this._login_subject.next("the actual login");
                    // Fetch profile information
                    this.lock.getProfile(parts[2], function (error, profile) {
                        if (error) {
                            console.log("*** error loading the profile");
                            alert(error);
                            return;
                        }
                        _this._login_subject.next("found the profile... save it");
                        localStorage.setItem('profile', JSON.stringify(profile));
                        console.log("auth profile...", profile);
                        _this.userProfile = profile;
                    });
                    // Add callback for lock `authenticated` event
                    this.lock.on("authenticated", function (authResult) {
                        // THIS CALLBACK IS NOT GETTING FIRED FOR SOME REASON
                        console.log('authenticated event. authResult...', authResult);
                        localStorage.setItem('id_token', authResult.idToken);
                    });
                }
                AuthService.prototype.login = function () {
                    this._login_subject.next("open login window");
                    this.lock.show(); // display login popup window
                };
                ;
                AuthService.prototype.authenticated = function () {
                    // we are currently authenthicated if there
                    // is an unexpired JWT in local storage
                    var hasValidToken = angular2_jwt_1.tokenNotExpired();
                    //console.log('authenticated? '+hasValidToken);
                    return hasValidToken;
                };
                ;
                AuthService.prototype.logout = function () {
                    console.log("*** AuthService#logout");
                    localStorage.removeItem('id_token');
                    this._login_subject.next("the logout!");
                    this.router.navigate(['']);
                };
                ;
                return AuthService;
            }());
            AuthService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [router_1.Router])
            ], AuthService);
            exports_1("AuthService", AuthService);
        }
    };
});
//# sourceMappingURL=auth.service.js.map