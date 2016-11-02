System.register(["@angular/core", "angular2-jwt", "@angular/http"], function (exports_1, context_1) {
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
    var core_1, angular2_jwt_1, http_1, ApiService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }
        ],
        execute: function () {
            ApiService = (function () {
                //private baseUrl = 'http://localhost:3333/api/v1/';
                function ApiService(authHttp) {
                    this.authHttp = authHttp;
                    this.baseUrl = 'https://kazoku-server-2016.herokuapp.com/api/v1/';
                }
                ApiService.prototype.get = function (action, data) {
                    var url = this.baseUrl + action + ".json";
                    var params = this.toParams(data);
                    console.log("ApiService#get url=" + url + "  params...", data);
                    return this.authHttp
                        .get(url, { search: params })
                        .map(function (response) { return response.json(); });
                };
                ApiService.prototype.toParams = function (data) {
                    var result = new http_1.URLSearchParams();
                    for (var key in data)
                        result.set(key, data[key]);
                    return result;
                };
                return ApiService;
            }());
            ApiService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [angular2_jwt_1.AuthHttp])
            ], ApiService);
            exports_1("ApiService", ApiService);
        }
    };
});
//# sourceMappingURL=api.service.js.map