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
    var core_1, dashboard_service_1, DashPanelTwoComponent;
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
            DashPanelTwoComponent = (function () {
                function DashPanelTwoComponent(dashboardService) {
                    this.dashboardService = dashboardService;
                    this.month = "error";
                    this.birthdays = [];
                }
                DashPanelTwoComponent.prototype.ngOnInit = function () {
                    console.log("DashPanelTwoComponent#init");
                    var today = new Date();
                    this.month = today.toLocaleString("en-us", { month: "long" });
                    this.birthdays = this.dashboardService.getBirthdays(today.getMonth());
                };
                return DashPanelTwoComponent;
            }());
            DashPanelTwoComponent = __decorate([
                core_1.Component({
                    selector: 'kz-dash-panel2',
                    templateUrl: "client/dashboard/dash-panel2.component.html"
                }),
                __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
            ], DashPanelTwoComponent);
            exports_1("DashPanelTwoComponent", DashPanelTwoComponent);
        }
    };
});
//# sourceMappingURL=dash-panel2.component.js.map