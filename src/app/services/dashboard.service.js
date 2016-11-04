System.register(["@angular/core"], function (exports_1, context_1) {
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
    var core_1, DashboardService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            DashboardService = (function () {
                function DashboardService() {
                }
                DashboardService.prototype.getBirthdays = function (month) {
                    return [
                        { name: "mj", month: month - 1, day: 29, date: new Date(2016, 10, 1) },
                        { name: "pat", month: month, day: 1, date: new Date(2016, 10, 1) },
                        { name: "mike", month: month, day: 3, date: new Date(2016, 10, 3) },
                        { name: "tim", month: month, day: 5, date: new Date(2016, 10, 5) },
                        { name: "claire", month: month, day: 3, date: new Date(2016, 10, 3) },
                        { name: "elaine", month: month, day: 20, date: new Date(2016, 10, 13) },
                        { name: "ted", month: month + 1, day: 1, date: new Date(2016, 10, 13) }
                    ];
                };
                return DashboardService;
            }());
            DashboardService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [])
            ], DashboardService);
            exports_1("DashboardService", DashboardService);
        }
    };
});
//# sourceMappingURL=dashboard.service.js.map