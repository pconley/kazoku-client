System.register(["@angular/core", "@angular/http", "angular2-jwt", "rxjs/Rx", "rxjs/add/operator/do", "rxjs/add/observable/of", "rxjs/add/observable/from", "rxjs/add/operator/catch", "rxjs/add/operator/map"], function (exports_1, context_1) {
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
    var core_1, http_1, angular2_jwt_1, Rx_1, EventService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
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
            }
        ],
        execute: function () {
            EventService = (function () {
                function EventService(_http, _auth) {
                    this._http = _http;
                    this._auth = _auth;
                    this.baseUrl = 'https://kazoku-server-2016.herokuapp.com/api/v1/';
                    //private baseUrl = 'http://localhost:3333/api/v1/';
                    this.eventUrl = this.baseUrl + 'events/'; // add 1.json
                    this.eventsUrl = this.baseUrl + 'events.json';
                    this.eventsCache = null;
                }
                EventService.prototype.getEvents = function (force) {
                    // if we are not forcing a reload, and there are already
                    // events stored in the events cache... then use cache
                    if (!force && this.eventsCache) {
                        console.log("EventService#getEvents: using cache data!");
                        return Rx_1.Observable.of(this.eventsCache);
                    }
                    // otherwise do the load from the server
                    return this.loadEvents(10);
                };
                EventService.prototype.getEvent = function (id) {
                    var url = "" + this.eventUrl + id + ".json";
                    console.log("EventService#getEvent: url=" + url);
                    return this._auth.get(url)
                        .map(function (response) { return response.json(); })
                        .do(function (data) { console.log("EventService#getEvent: data...", data); })
                        .catch(this.handleError);
                };
                EventService.prototype.loadEvents = function (month) {
                    var url = this.eventsUrl + "?month=" + month;
                    console.log("EventService#loadEvents: url=" + url);
                    return this._auth.get(url)
                        .map(function (response) { return response.json(); })
                        .do(function (data) { console.log("EventService#loadEvents: count = " + data.length); })
                        .catch(this.handleError);
                };
                EventService.prototype.handleError = function (error) {
                    console.error("EventService#handleError: 3956...", error);
                    return Rx_1.Observable.throw('Server error: 3956');
                };
                return EventService;
            }());
            EventService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http, angular2_jwt_1.AuthHttp])
            ], EventService);
            exports_1("EventService", EventService);
        }
    };
});
//# sourceMappingURL=event.service.js.map