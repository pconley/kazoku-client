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
    var core_1, dashboard_service_1, DashPanelThreeComponent;
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
            DashPanelThreeComponent = (function () {
                function DashPanelThreeComponent(dashboardService) {
                    this.dashboardService = dashboardService;
                    this.month = "error";
                    this.days = [];
                    this.weeks = [];
                    this.hdrs = ["Sunday", "Montag", "Tue", "Weds", "Thor's Day", "Frietag", "Saturn"];
                    this.birthdays = [];
                }
                DashPanelThreeComponent.prototype.ngOnInit = function () {
                    console.log("DashPanelTwoComponent#init");
                    var today = new Date();
                    this.month = today.toLocaleString("en-us", { month: "long" });
                    this.birthdays = this.dashboardService.getBirthdays(today.getMonth());
                    this.days = [];
                    this.weeks = [];
                    var week = [];
                    var view_days = this.getMonthViewDays(today);
                    //console.log("view days...",view_days);
                    var count = 1;
                    for (var _i = 0, _a = this.getMonthViewDays(today); _i < _a.length; _i++) {
                        var day = _a[_i];
                        var names = this.getNames(this.birthdays, day);
                        var text = names.join("; ");
                        var obj = { day: day.getDate(), name: text, names: names };
                        this.days.push(obj);
                        week.push(obj);
                        if (count == 7) {
                            this.weeks.push(week);
                            week = [];
                            count = 0;
                        }
                        count++;
                    }
                };
                DashPanelThreeComponent.prototype.getNames = function (events, day) {
                    var names = [];
                    //console.log("day ... "+day);
                    for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
                        var event_1 = events_1[_i];
                        if (event_1["day"] == day.getDate() && event_1["month"] == day.getMonth())
                            names.push(event_1["name"]);
                    }
                    return names;
                };
                DashPanelThreeComponent.prototype.getMonthViewDays = function (date) {
                    var days = []; // returned
                    var year = date.getFullYear();
                    var month = date.getMonth();
                    var the_first = new Date(year, month, 1);
                    // the month starts on a week day where
                    // weekday >> 0 == Sunday; 1 == Monday, etc.
                    var weekday = the_first.getDay();
                    // so, the first week starts on this number
                    var index = 1 - weekday; // 0 >> 1; 1 >> 0
                    var ended = false;
                    // build up the weeks until month ends
                    // with a failsafe of no more than N weeks
                    for (var w = 0; w < 7 && !ended; w++) {
                        for (var i = 0; i < 7; i++) {
                            var current = new Date(year, month, index++);
                            //console.log(index+" >> "+current);
                            days.push(current);
                            // month has ended if we see a one as day
                            var curr_day = current.getDate();
                            ended = ended || w > 0 && curr_day == 1;
                        }
                    }
                    return days;
                };
                return DashPanelThreeComponent;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], DashPanelThreeComponent.prototype, "title", void 0);
            DashPanelThreeComponent = __decorate([
                core_1.Component({
                    selector: 'kz-dash-panel3',
                    templateUrl: "client/dashboard/dash-panel3.component.html",
                }),
                __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
            ], DashPanelThreeComponent);
            exports_1("DashPanelThreeComponent", DashPanelThreeComponent);
        }
    };
});
//# sourceMappingURL=dash-panel3.component.js.map