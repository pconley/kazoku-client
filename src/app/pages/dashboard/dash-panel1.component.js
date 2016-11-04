System.register(["@angular/core", "./dashboard.service"], function (exports_1, context_1) {
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
    var core_1, dashboard_service_1, DashPanelOneComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (dashboard_service_1_1) {
                dashboard_service_1 = dashboard_service_1_1;
            }
        ],
        execute: function () {
            DashPanelOneComponent = (function () {
                function DashPanelOneComponent(dashboardService) {
                    this.dashboardService = dashboardService;
                    this.today = 'error';
                }
                DashPanelOneComponent.prototype.ngOnInit = function () {
                    console.log("DashPanelOneComponent#init");
                    this.today = this.getDateAsString(new Date());
                };
                DashPanelOneComponent.prototype.getDateAsString = function (date) {
                    var day = date.getDate();
                    var month = date.toLocaleString("en-us", { month: "long" });
                    var suffix = "th";
                    if (day % 10 === 1 && day !== 11)
                        suffix = "st";
                    if (day % 10 === 2 && day !== 12)
                        suffix = "nd";
                    if (day % 10 === 3 && day !== 13)
                        suffix = "rd";
                    // if( day === 11 ) suffix = "th";
                    // if( day === 12 ) suffix = "th";
                    // if( day === 13 ) suffix = "th";
                    return month + " " + day + suffix;
                };
                return DashPanelOneComponent;
            }());
            DashPanelOneComponent = __decorate([
                core_1.Component({
                    selector: 'kz-dash-panel1',
                    templateUrl: "client/dashboard/dash-panel1.component.html"
                }),
                __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
            ], DashPanelOneComponent);
            exports_1("DashPanelOneComponent", DashPanelOneComponent);
        }
    };
});
//# sourceMappingURL=dash-panel1.component.js.map