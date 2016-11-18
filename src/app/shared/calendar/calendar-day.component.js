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
    var core_1, CalendarDayComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            CalendarDayComponent = (function () {
                function CalendarDayComponent() {
                }
                return CalendarDayComponent;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], CalendarDayComponent.prototype, "title", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], CalendarDayComponent.prototype, "body", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", Array)
            ], CalendarDayComponent.prototype, "lines", void 0);
            CalendarDayComponent = __decorate([
                core_1.Component({
                    selector: 'kz-cal-day',
                    template: "<div class=\"ui segments\">\n                <div class=\"ui red segment\">{{title}}</div>\n                <div class=\"ui yellow secondary segment\">\n                    <p *ngFor='let line of lines'>{{line}}&nbsp;</p>\n                </div>\n            </div>"
                }),
                __metadata("design:paramtypes", [])
            ], CalendarDayComponent);
            exports_1("CalendarDayComponent", CalendarDayComponent);
        }
    };
});
//# sourceMappingURL=calendar-day.component.js.map