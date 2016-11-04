System.register(["@angular/core", "@angular/common", "./dashboard.component", "./dashboard.routing", "./dash-panel1.component", "./dash-panel2.component", "./dash-panel3.component", "../components/calendar-hdr.component", "../components/calendar-day.component"], function (exports_1, context_1) {
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
    var core_1, common_1, dashboard_component_1, dashboard_routing_1, dash_panel1_component_1, dash_panel2_component_1, dash_panel3_component_1, calendar_hdr_component_1, calendar_day_component_1, DashboardModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (dashboard_routing_1_1) {
                dashboard_routing_1 = dashboard_routing_1_1;
            },
            function (dash_panel1_component_1_1) {
                dash_panel1_component_1 = dash_panel1_component_1_1;
            },
            function (dash_panel2_component_1_1) {
                dash_panel2_component_1 = dash_panel2_component_1_1;
            },
            function (dash_panel3_component_1_1) {
                dash_panel3_component_1 = dash_panel3_component_1_1;
            },
            function (calendar_hdr_component_1_1) {
                calendar_hdr_component_1 = calendar_hdr_component_1_1;
            },
            function (calendar_day_component_1_1) {
                calendar_day_component_1 = calendar_day_component_1_1;
            }
        ],
        execute: function () {
            DashboardModule = (function () {
                function DashboardModule() {
                }
                return DashboardModule;
            }());
            DashboardModule = __decorate([
                core_1.NgModule({
                    imports: [common_1.CommonModule, dashboard_routing_1.DashboardRouting],
                    declarations: [dashboard_component_1.DashboardComponent,
                        dash_panel1_component_1.DashPanelOneComponent, dash_panel2_component_1.DashPanelTwoComponent, dash_panel3_component_1.DashPanelThreeComponent,
                        calendar_day_component_1.CalendarDayComponent, calendar_hdr_component_1.CalendarHdrComponent
                    ],
                    bootstrap: [dashboard_component_1.DashboardComponent]
                }),
                __metadata("design:paramtypes", [])
            ], DashboardModule);
            exports_1("DashboardModule", DashboardModule);
        }
    };
});
//# sourceMappingURL=dashboard.module.js.map