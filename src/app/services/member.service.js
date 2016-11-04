System.register(["@angular/core", "rxjs/Rx", "rxjs/add/operator/do", "rxjs/add/observable/of", "rxjs/add/observable/from", "rxjs/add/operator/catch", "rxjs/add/operator/map", "../service/api.service", "../service/auth.service"], function (exports_1, context_1) {
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
    var core_1, Rx_1, api_service_1, auth_service_1, MemberService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (_1) {
            },
            function (_2) {
            },
            function (_3) {
            },
            function (_4) {
            },
            function (_5) {
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }
        ],
        execute: function () {
            MemberService = (function () {
                function MemberService(apiService, authService) {
                    this.apiService = apiService;
                    this.authService = authService;
                    this.membersCache = null;
                    console.log("*** MemberService#constructor");
                }
                MemberService.prototype.getMembers = function (force) {
                    if (!this.authService.authenticated())
                        return this.authError();
                    // if we are not forcing a reload, and there are already
                    // members stored in the members cache... then use cache
                    if (!force && this.membersCache) {
                        console.log("MemberService#getMembers: using cache data!");
                        return Rx_1.Observable.of(this.membersCache);
                    }
                    // otherwise do the load from the server
                    return this.loadPages();
                };
                MemberService.prototype.getMember = function (id) {
                    if (!this.authService.authenticated())
                        return this.authError();
                    console.log("MemberService#getMember: id=" + id);
                    var action = "members/" + id;
                    return this.apiService.get(action)
                        .map(function (obj) { return obj; })
                        .catch(this.handleError);
                };
                MemberService.prototype.loadPages = function () {
                    var page = 0;
                    var that = this;
                    that.membersCache = [];
                    console.log("MemberService#loadPages:");
                    return Rx_1.Observable.create(function (observer) {
                        function recursiveFunction() {
                            that.loadPage(++page)
                                .subscribe(function (members) {
                                console.log("loadPages: page " + page + " loaded " + members.length);
                                // observers are shown loaded members
                                observer.next(members);
                                // and we also accumulate a full copy in the cache
                                Array.prototype.push.apply(that.membersCache, members);
                                // stop with empty page or failsafe
                                if (members.length == 0 || page > 3)
                                    observer.complete();
                                else
                                    recursiveFunction();
                            }, function (error) {
                                // pass on the error message and stop the recusion at first error
                                console.log("MemberService#loadPages: load error = " + error);
                                observer.error(error);
                            });
                        }
                        recursiveFunction();
                    });
                };
                MemberService.prototype.loadPage = function (page) {
                    console.log("MemberService#loadPage. page=" + page);
                    return this.apiService.get("members", { page: page })
                        .map(function (obj) { return obj; })
                        .catch(this.handleError);
                };
                MemberService.prototype.handleError = function (error) {
                    console.error("MemberService#handleError: 3956...", error);
                    return Rx_1.Observable.throw('Server error in MemberService: 3956');
                };
                MemberService.prototype.authError = function () {
                    console.error("MemberService#authError");
                    return Rx_1.Observable.throw('Authentication Error in MemberService');
                };
                return MemberService;
            }());
            MemberService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [api_service_1.ApiService,
                    auth_service_1.AuthService])
            ], MemberService);
            exports_1("MemberService", MemberService);
        }
    };
});
//# sourceMappingURL=member.service.js.map